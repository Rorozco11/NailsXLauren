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
  const [rows] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const debounceRef = useRef<number | null>(null);

  const fetchData = useCallback(async (search: string, startRow: number) => {
    setLoading(true);
    try {
      const page = Math.floor(startRow / 20) + 1;
      const res = await fetch(`/api/admin/bookings?search=${encodeURIComponent(search)}&page=${page}&limit=20`);
      if (!res.ok) throw new Error('Fetch failed');
      const json = await res.json();
      
      if (gridApi) {
        gridApi.setGridOption('rowData', json.data || []);
        // Note: rowCount is handled by server-side row model in AG Grid
      }
    } catch (err) {
      console.error(err);
      if (gridApi) {
        gridApi.setGridOption('rowData', []);
      }
    } finally {
      setLoading(false);
    }
  }, []);

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
    }
  ], []);

  // Grid options
  const gridOptions = useMemo(() => ({
    columnDefs,
    rowData: rows,
    rowCount: undefined,
    pagination: true,
    paginationPageSize: 20,
    paginationPageSizeSelector: [10, 20, 50, 100],
    suppressPaginationPanel: false,
    animateRows: true,
    rowSelection: 'multiple' as const,
    suppressRowClickSelection: true,
    onGridReady: (params: GridReadyEvent) => {
      setGridApi(params.api);
      // Initial data fetch
      fetchData('', 0);
    },
    onPaginationChanged: () => {
      // This will be handled by the gridApi reference
    }
  }), [columnDefs, rows, fetchData]);

  // Handle pagination changes
  useEffect(() => {
    if (!gridApi) return;
    
    const handlePaginationChanged = () => {
      const currentPage = gridApi.paginationGetCurrentPage();
      const pageSize = gridApi.paginationGetPageSize();
      const startRow = currentPage * pageSize;
      fetchData(q, startRow);
    };

    gridApi.addEventListener('paginationChanged', handlePaginationChanged);
    
    return () => {
      gridApi.removeEventListener('paginationChanged', handlePaginationChanged);
    };
  }, [gridApi, q, fetchData]);

  // debounce search
  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      if (gridApi) {
        gridApi.paginationGoToFirstPage();
        fetchData(q, 0);
      }
    }, 350);
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

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, phone, email, message, date..."
          style={{ 
            padding: '8px 12px', 
            borderRadius: 8, 
            border: '1px solid #ddd', 
            minWidth: 320,
            fontFamily: 'Work Sans, sans-serif'
          }}
        />
        <button 
          onClick={() => gridApi && fetchData(q, 0)} 
          className="btn"
          style={{ 
            background: '#A56C82', 
            color: 'white', 
            padding: '8px 12px', 
            borderRadius: '8px', 
            border: 'none',
            fontFamily: 'Work Sans, sans-serif',
            cursor: 'pointer'
          }}
        >
          Search
        </button>
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
            cursor: 'pointer'
          }}
        >
          Export CSV
        </button>
        <div style={{ marginLeft: 'auto', fontFamily: 'Work Sans, sans-serif' }}>
          {loading ? 'Loading…' : `${rows.length} bookings`}
        </div>
      </div>

      <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
        <AgGridReact
          {...gridOptions}
          columnDefs={columnDefs}
          rowData={rows}
          loading={loading}
        />
      </div>
    </div>
  );
}
