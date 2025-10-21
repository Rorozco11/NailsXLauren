// app/admin/BookingsGrid.tsx
'use client';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridReadyEvent, GridApi, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
// AG Grid styles are imported via CSS imports

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

type Booking = {
  id: string;
  full_name: string;
  phone_number: string | null;
  email: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  message: string | null;
  created_on: string;
  init_price: number | null;
};

export default function BookingsGrid() {
  const [q, setQ] = useState('');
  const [rows, setRows] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);
  const debounceRef = useRef<number | null>(null);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchData = useCallback(async (search: string, startRow: number) => {
    setLoading(true);
    try {
      const page = Math.floor(startRow / 20) + 1;
      const res = await fetch(`/api/admin/bookings?search=${encodeURIComponent(search)}&page=${page}&limit=20`);
      if (!res.ok) throw new Error('Fetch failed');
      const json = await res.json();
      
      setRows(json.data || []);
      if (gridApi) {
        gridApi.setGridOption('rowData', json.data || []);
      }
    } catch (err) {
      console.error(err);
      setRows([]);
      if (gridApi) {
        gridApi.setGridOption('rowData', []);
      }
    } finally {
      setLoading(false);
    }
  }, [gridApi]);

  // Column definitions for AG Grid
  const columnDefs = useMemo<ColDef[]>(() => [
    { 
      field: 'full_name', 
      headerName: 'Full Name', 
      sortable: true, 
      filter: true,
      width: 150,
      pinned: 'left'
    },
    { 
      field: 'phone_number', 
      headerName: 'Phone', 
      sortable: true, 
      filter: true,
      width: 130
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      sortable: true, 
      filter: true,
      width: 200
    },
    { 
      field: 'preferred_date', 
      headerName: 'Preferred Date', 
      sortable: true, 
      filter: 'agDateColumnFilter',
      width: 130
    },
    { 
      field: 'preferred_time', 
      headerName: 'Preferred Time', 
      sortable: true, 
      filter: true,
      width: 130
    },
    { 
      field: 'message', 
      headerName: 'Message', 
      sortable: true, 
      filter: true,
      width: 200,
      cellRenderer: (params: { value: string }) => {
        return params.value ? (params.value.length > 50 ? params.value.substring(0, 50) + '...' : params.value) : '';
      }
    },
    { 
      field: 'created_on', 
      headerName: 'Created On', 
      sortable: true, 
      filter: 'agDateColumnFilter',
      width: 150,
      valueFormatter: (params: { value: string }) => {
        return params.value ? new Date(params.value).toLocaleString() : '';
      }
    },
    { 
      field: 'init_price', 
      headerName: 'Price', 
      sortable: true, 
      filter: 'agNumberColumnFilter',
      width: 100,
      valueFormatter: (params: { value: number }) => {
        return params.value ? `$${params.value}` : '';
      }
    },
    { 
      field: 'price_range_min', 
      headerName: 'Price Min', 
      sortable: true, 
      filter: 'agNumberColumnFilter',
      width: 100,
      valueFormatter: (params: { value: number }) => {
        return params.value ? `$${params.value}` : '';
      }
    },
    { 
      field: 'price_range_max', 
      headerName: 'Price Max', 
      sortable: true, 
      filter: 'agNumberColumnFilter',
      width: 100,
      valueFormatter: (params: { value: number }) => {
        return params.value ? `$${params.value}` : '';
      }
    }
  ], []);

  // Grid options
  const gridOptions = useMemo(() => ({
    theme: 'legacy' as const,
    columnDefs,
    rowData: rows,
    rowCount: undefined,
    pagination: true,
    paginationPageSize: 20,
    paginationPageSizeSelector: [10, 20, 50, 100],
    suppressPaginationPanel: false,
    animateRows: true,
    rowSelection: 'multiple' as const,
    enableClickSelection: true,
    onGridReady: (params: GridReadyEvent) => {
      setGridApi(params.api);
      // No initial data fetch - wait for search button click
    },
    onPaginationChanged: () => {
      // This will be handled by the gridApi reference
    }
  }), [columnDefs, rows]);

  // Load initial data on mount
  useEffect(() => {
    if (gridApi) {
      fetchData('', 0);
    }
  }, [gridApi, fetchData]);

  // Type-ahead search with debouncing
  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      if (gridApi) {
        gridApi.paginationGoToFirstPage();
        fetchData(q, 0);
      }
    }, 300);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [q, gridApi, fetchData]);

  function exportCSV() {
    if (gridApi) {
      gridApi.exportDataAsCsv({
        fileName: `bookings-${new Date().toISOString().split('T')[0]}.csv`,
        columnKeys: ['full_name', 'phone_number', 'email', 'preferred_date', 'preferred_time', 'message', 'created_on', 'init_price']
      });
    }
  }

  // Initialize column visibility state
  useEffect(() => {
    if (gridApi && Object.keys(columnVisibility).length === 0) {
      const initialVisibility: Record<string, boolean> = {};
      columnDefs.forEach(col => {
        if (col.field) {
          const column = gridApi.getColumn(col.field);
          initialVisibility[col.field] = column ? column.isVisible() : true;
        }
      });
      setColumnVisibility(initialVisibility);
    }
  }, [gridApi, columnDefs, columnVisibility]);

  // Column visibility functions
  const toggleColumnVisibility = (field: string) => {
    if (gridApi) {
      const column = gridApi.getColumn(field);
      if (column) {
        const newVisibility = !column.isVisible();
        gridApi.setColumnsVisible([field], newVisibility);
        setColumnVisibility(prev => ({
          ...prev,
          [field]: newVisibility
        }));
      }
    }
  };

  const isColumnVisible = (field: string) => {
    return columnVisibility[field] ?? true;
  };

  const showAllColumns = () => {
    if (gridApi) {
      const fields = columnDefs.map(col => col.field).filter(Boolean) as string[];
      gridApi.setColumnsVisible(fields, true);
      const newVisibility: Record<string, boolean> = {};
      fields.forEach(field => {
        newVisibility[field] = true;
      });
      setColumnVisibility(newVisibility);
    }
  };

  const hideAllColumns = () => {
    if (gridApi) {
      const fields = columnDefs.map(col => col.field).filter(Boolean) as string[];
      gridApi.setColumnsVisible(fields, false);
      const newVisibility: Record<string, boolean> = {};
      fields.forEach(field => {
        newVisibility[field] = false;
      });
      setColumnVisibility(newVisibility);
    }
  };

  // Close column menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showColumnMenu) {
        const target = event.target as Element;
        if (!target.closest('[data-column-menu]') && !target.closest('[data-column-button]')) {
          setShowColumnMenu(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColumnMenu]);

  return (
    <div style={{ padding: '16px', width: '100%', boxSizing: 'border-box' }}>
      {/* Responsive top controls */}
      <div style={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: isMobile ? 'stretch' : 'flex-end', 
        alignItems: isMobile ? 'stretch' : 'center', 
        gap: 12, 
        marginBottom: 16,
        flexWrap: 'wrap'
      }}>
        {/* Search and menu container */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 8,
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: 8,
          padding: '4px 8px',
          minWidth: isMobile ? '100%' : 'auto',
          flex: isMobile ? '1' : '0 0 auto'
        }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search bookings..."
            style={{ 
              padding: '6px 8px', 
              border: 'none', 
              outline: 'none',
              fontFamily: 'Work Sans, sans-serif',
              fontSize: '14px',
              minWidth: isMobile ? '150px' : '200px',
              flex: '1'
            }}
          />
          <button 
            onClick={() => setShowColumnMenu(!showColumnMenu)}
            data-column-button
            style={{ 
              background: 'none', 
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
            title="Show/Hide Columns"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* Action buttons container */}
        <div style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={exportCSV} 
            className="btn"
            style={{ 
              background: '#A56C82', 
              color: 'white', 
              padding: '8px 12px', 
              borderRadius: '8px', 
              border: 'none',
              fontFamily: 'Work Sans, sans-serif',
              cursor: 'pointer',
              fontSize: '14px',
              whiteSpace: 'nowrap'
            }}
          >
            Export CSV
          </button>
          
          <div style={{ 
            fontFamily: 'Work Sans, sans-serif',
            fontSize: '14px',
            color: '#666',
            whiteSpace: 'nowrap'
          }}>
            {loading ? 'Loading…' : `${rows.length} bookings`}
          </div>
        </div>
      </div>

      {/* Column Visibility Menu */}
      {showColumnMenu && (
        <div 
          data-column-menu
          style={{
            position: 'absolute',
            top: isMobile ? '140px' : '100px',
            right: isMobile ? '16px' : '24px',
            left: isMobile ? '16px' : 'auto',
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            minWidth: isMobile ? 'auto' : '250px',
            maxWidth: isMobile ? 'calc(100vw - 32px)' : '400px'
          }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '12px',
            borderBottom: '1px solid #eee',
            paddingBottom: '8px'
          }}>
            <h4 style={{ 
              margin: 0, 
              fontFamily: 'Work Sans, sans-serif',
              color: '#2C2C2C'
            }}>
              Show/Hide Columns
            </h4>
            <button
              onClick={() => setShowColumnMenu(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ×
            </button>
          </div>
          
          <div style={{ marginBottom: '12px' }}>
            <button
              onClick={showAllColumns}
              style={{
                background: '#A56C82',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                marginRight: '8px',
                cursor: 'pointer',
                fontSize: '12px',
                fontFamily: 'Work Sans, sans-serif'
              }}
            >
              Show All
            </button>
            <button
              onClick={hideAllColumns}
              style={{
                background: '#666',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontFamily: 'Work Sans, sans-serif'
              }}
            >
              Hide All
            </button>
          </div>

          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {columnDefs.map((col) => (
              <div key={col.field} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '6px 0',
                borderBottom: '1px solid #f0f0f0'
              }}>
                <input
                  type="checkbox"
                  checked={isColumnVisible(col.field || '')}
                  onChange={() => toggleColumnVisibility(col.field || '')}
                  style={{ marginRight: '8px' }}
                />
                <label style={{
                  fontFamily: 'Work Sans, sans-serif',
                  fontSize: '14px',
                  color: '#2C2C2C',
                  cursor: 'pointer',
                  flex: 1
                }}>
                  {col.headerName}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      <div 
        className="ag-theme-alpine" 
        style={{ 
          height: isMobile ? '400px' : '600px', 
          width: '100%',
          minHeight: '300px'
        }}
      >
        <AgGridReact
          {...gridOptions}
          loading={loading}
        />
      </div>
    </div>
  );
}
