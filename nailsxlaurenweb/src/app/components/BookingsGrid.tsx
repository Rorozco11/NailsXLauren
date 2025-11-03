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
  const [selectedRow, setSelectedRow] = useState<Booking | null>(null);
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
      width: 130,
      valueFormatter: (params: { value: string }) => {
        if (!params.value) return '';
        // Convert 24-hour time to 12-hour format with AM/PM
        try {
          const [hours, minutes] = params.value.split(':');
          const hour24 = parseInt(hours, 10);
          if (isNaN(hour24)) return params.value; // Return original if parsing fails
          
          const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
          const ampm = hour24 < 12 ? 'AM' : 'PM';
          const mins = minutes || '00';
          
          return `${hour12}:${mins} ${ampm}`;
        } catch {
          return params.value; // Return original if conversion fails
        }
      }
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
      hide: true,
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
      hide: true,
      valueFormatter: (params: { value: number }) => {
        return params.value ? `$${params.value}` : '';
      }
    }
  ], []);

  // Format time helper
  const formatTime = (time: string | null): string => {
    if (!time) return 'Not specified';
    try {
      const [hours, minutes] = time.split(':');
      const hour24 = parseInt(hours, 10);
      if (isNaN(hour24)) return time;
      
      const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
      const ampm = hour24 < 12 ? 'AM' : 'PM';
      const mins = minutes || '00';
      
      return `${hour12}:${mins} ${ampm}`;
    } catch {
      return time;
    }
  };

  // Format date helper
  const formatDate = (date: string | null): string => {
    if (!date) return 'Not specified';
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return date;
    }
  };

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
    getRowStyle: (params: { data?: Booking }) => {
      if (selectedRow && params.data && params.data.id === selectedRow.id) {
        return { backgroundColor: '#f0e6f0', borderLeft: '4px solid #A56C82' };
      }
      return undefined;
    },
    onRowClicked: (params: { data?: Booking }) => {
      if (params.data) {
        setSelectedRow(params.data);
      }
    },
    onGridReady: (params: GridReadyEvent) => {
      setGridApi(params.api);
      // No initial data fetch - wait for search button click
    },
    onPaginationChanged: () => {
      // This will be handled by the gridApi reference
    }
  }), [columnDefs, rows, selectedRow]);

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

      <div style={{ display: 'flex', gap: '16px', flexDirection: isMobile ? 'column' : 'row' }}>
        <div 
          className="ag-theme-alpine" 
          style={{ 
            height: isMobile ? '400px' : '600px', 
            width: isMobile ? '100%' : selectedRow ? '60%' : '100%',
            minHeight: '300px',
            transition: 'width 0.3s ease'
          }}
        >
          <AgGridReact
            {...gridOptions}
            loading={loading}
          />
        </div>

        {/* Mobile Backdrop */}
        {selectedRow && isMobile && (
          <div
            onClick={() => setSelectedRow(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
              animation: 'fadeIn 0.3s ease'
            }}
          />
        )}

        {/* Detail Panel/Drawer */}
        {selectedRow && (
          <div style={{
            width: isMobile ? '100%' : '40%',
            background: 'white',
            borderRadius: isMobile ? '16px 16px 0 0' : '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '20px',
            maxHeight: isMobile ? '80vh' : '600px',
            overflowY: 'auto',
            position: isMobile ? 'fixed' : 'relative',
            top: isMobile ? '20%' : 'auto',
            left: isMobile ? 0 : 'auto',
            right: isMobile ? 0 : 'auto',
            bottom: isMobile ? 0 : 'auto',
            zIndex: isMobile ? 1000 : 'auto',
            animation: isMobile ? 'slideUp 0.3s ease' : 'slideIn 0.3s ease'
          }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              paddingBottom: '16px',
              borderBottom: '2px solid #f0f0f0'
            }}>
              <h2 style={{
                margin: 0,
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '24px',
                color: '#2C2C2C',
                fontWeight: 'normal'
              }}>
                Booking Details
              </h2>
              <button
                onClick={() => setSelectedRow(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                ×
              </button>
            </div>

            {/* Detail Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <DetailField label="Full Name" value={selectedRow.full_name} />
              <DetailField label="Phone" value={selectedRow.phone_number || 'Not provided'} />
              <DetailField label="Email" value={selectedRow.email || 'Not provided'} />
              <DetailField label="Preferred Date" value={formatDate(selectedRow.preferred_date)} />
              <DetailField label="Preferred Time" value={formatTime(selectedRow.preferred_time)} />
              <DetailField label="Price" value={selectedRow.init_price ? `$${selectedRow.init_price}` : 'Not specified'} />
              <DetailField label="Created On" value={new Date(selectedRow.created_on).toLocaleString()} />
              {selectedRow.message && (
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'Work Sans, sans-serif',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#666',
                    marginBottom: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Message
                  </label>
                  <div style={{
                    fontFamily: 'Work Sans, sans-serif',
                    fontSize: '14px',
                    color: '#2C2C2C',
                    padding: '12px',
                    background: '#FAF4F2',
                    borderRadius: '8px',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {selectedRow.message}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

// Detail Field Component
function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label style={{
        display: 'block',
        fontFamily: 'Work Sans, sans-serif',
        fontSize: '12px',
        fontWeight: '600',
        color: '#666',
        marginBottom: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {label}
      </label>
      <div style={{
        fontFamily: 'Work Sans, sans-serif',
        fontSize: '16px',
        color: '#2C2C2C',
        padding: '10px 12px',
        background: '#FAF4F2',
        borderRadius: '6px'
      }}>
        {value}
      </div>
    </div>
  );
}
