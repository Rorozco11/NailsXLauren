// app/admin/BookingsGrid.tsx
'use client';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridReadyEvent, GridApi, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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

type DateFilter = 'all' | '3months' | '6months' | '1year';

export default function BookingsGrid() {
  const [q, setQ] = useState('');
  const [rows, setRows] = useState<Booking[]>([]);
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Booking | null>(null);
  const debounceRef = useRef<number | null>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Apply date filter to bookings
  const applyDateFilter = useCallback((filter: DateFilter, data: Booking[]): Booking[] => {
    if (filter === 'all') return data;
    
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (filter) {
      case '3months':
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      case '6months':
        cutoffDate.setMonth(now.getMonth() - 6);
        break;
      case '1year':
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
    }
    
    return data.filter(booking => {
      const createdDate = new Date(booking.created_on);
      return createdDate >= cutoffDate;
    });
  }, []);

  const fetchData = useCallback(async (search: string, startRow: number) => {
    setLoading(true);
    try {
      const page = Math.floor(startRow / 20) + 1;
      const res = await fetch(`/api/admin/bookings?search=${encodeURIComponent(search)}&page=${page}&limit=1000`);
      if (!res.ok) throw new Error('Fetch failed');
      const json = await res.json();
      
      const allData = json.data || [];
      
      // If no search, update allBookings for totals calculation
      if (!search.trim()) {
        setAllBookings(allData);
      }
      
      // Apply date filter to search results
      const filtered = applyDateFilter(dateFilter, allData);
      setRows(filtered);
      if (gridApi) {
        gridApi.setGridOption('rowData', filtered);
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
  }, [gridApi, dateFilter, applyDateFilter]);

  // Fetch all bookings for totals calculation
  const fetchAllBookings = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/bookings?search=&page=1&limit=1000`);
      if (res.ok) {
        const json = await res.json();
        setAllBookings(json.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch all bookings:', err);
    }
  }, []);

  // Calculate total estimated price for selected filter
  const calculateTotalEstimated = useCallback((filter: DateFilter): number => {
    const filtered = applyDateFilter(filter, allBookings);
    return filtered.reduce((sum, booking) => sum + (booking.init_price || 0), 0);
  }, [allBookings, applyDateFilter]);

  // Delete booking function
  const handleDeleteBooking = useCallback(async () => {
    if (!selectedRow) return;
    
    if (!window.confirm(`Are you sure you want to delete the booking for "${selectedRow.full_name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedRow.id }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete booking');
      }

      // Clear selection
      setSelectedRow(null);
      if (gridApi) {
        gridApi.deselectAll();
      }

      // Refresh the grid data
      await fetchData(q, 0);
      await fetchAllBookings();
      
      // Show success message
      alert('Booking deleted successfully');
    } catch (err) {
      console.error('Error deleting booking:', err);
      alert(`Failed to delete booking: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }, [selectedRow, q, fetchData, fetchAllBookings, gridApi]);


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
    rowSelection: 'single' as const,
    enableClickSelection: true,
    getRowStyle: (params: { data?: Booking }) => {
      if (selectedRow && params.data && params.data.id === selectedRow.id) {
        return { backgroundColor: '#f0e6f0', borderLeft: '4px solid #A56C82' };
      }
      return undefined;
    },
    onSelectionChanged: (params: { api: GridApi }) => {
      const selectedRows = params.api.getSelectedRows();
      if (selectedRows.length > 0) {
        setSelectedRow(selectedRows[0]);
      } else {
        setSelectedRow(null);
      }
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
      fetchAllBookings();
    }
  }, [gridApi, fetchData, fetchAllBookings]);

  // Apply date filter when it changes - re-fetch to apply filter
  useEffect(() => {
    if (gridApi) {
      fetchData(q, 0);
    }
  }, [dateFilter, gridApi, q, fetchData]); // Re-fetch when date filter changes

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
  }, [q, gridApi, fetchData, dateFilter]);


  function exportCSV() {
    if (gridApi) {
      gridApi.exportDataAsCsv({
        fileName: `bookings-${new Date().toISOString().split('T')[0]}.csv`,
        columnKeys: ['full_name', 'phone_number', 'email', 'preferred_date', 'preferred_time', 'message', 'created_on', 'init_price']
      });
      setShowExportMenu(false);
    }
  }

  function exportXLSX() {
    if (!gridApi || rows.length === 0) return;
    
    // Get column headers
    const headers = ['Full Name', 'Phone', 'Email', 'Preferred Date', 'Preferred Time', 'Message', 'Created On', 'Price'];
    
    // Prepare data
    const data = rows.map(row => [
      row.full_name || '',
      row.phone_number || '',
      row.email || '',
      row.preferred_date ? new Date(row.preferred_date).toLocaleDateString() : '',
      row.preferred_time || '',
      row.message || '',
      row.created_on ? new Date(row.created_on).toLocaleString() : '',
      row.init_price ? `$${row.init_price}` : ''
    ]);
    
    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    
    // Set column widths
    ws['!cols'] = [
      { wch: 20 }, // Full Name
      { wch: 15 }, // Phone
      { wch: 25 }, // Email
      { wch: 15 }, // Preferred Date
      { wch: 15 }, // Preferred Time
      { wch: 40 }, // Message
      { wch: 20 }, // Created On
      { wch: 10 }  // Price
    ];
    
    XLSX.utils.book_append_sheet(wb, ws, 'Bookings');
    XLSX.writeFile(wb, `bookings-${new Date().toISOString().split('T')[0]}.xlsx`);
    setShowExportMenu(false);
  }

  function exportPDF() {
    if (!gridApi || rows.length === 0) return;
    
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text('Bookings Report', 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 22);
    
    // Prepare data for table
    const columns = [
      { header: 'Full Name', dataKey: 'full_name' },
      { header: 'Phone', dataKey: 'phone_number' },
      { header: 'Email', dataKey: 'email' },
      { header: 'Preferred Date', dataKey: 'preferred_date' },
      { header: 'Preferred Time', dataKey: 'preferred_time' },
      { header: 'Price', dataKey: 'init_price' }
    ];
    
    const tableData = rows.map(row => ({
      full_name: row.full_name || '',
      phone_number: row.phone_number || '',
      email: row.email || '',
      preferred_date: row.preferred_date ? new Date(row.preferred_date).toLocaleDateString() : '',
      preferred_time: row.preferred_time || '',
      init_price: row.init_price ? `$${row.init_price}` : ''
    }));
    
    // Add table
    autoTable(doc, {
      head: [columns.map(col => col.header)],
      body: tableData.map(row => [
        row.full_name,
        row.phone_number,
        row.email,
        row.preferred_date,
        row.preferred_time,
        row.init_price
      ]),
      startY: 30,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [165, 108, 130] },
      margin: { top: 30 }
    });
    
    doc.save(`bookings-${new Date().toISOString().split('T')[0]}.pdf`);
    setShowExportMenu(false);
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

  // Close column menu and export menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      if (showColumnMenu) {
        if (!target.closest('[data-column-menu]') && !target.closest('[data-column-button]')) {
          setShowColumnMenu(false);
        }
      }
      
      if (showExportMenu) {
        if (!target.closest('[data-export-menu]') && !target.closest('[data-export-button]')) {
          setShowExportMenu(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColumnMenu, showExportMenu]);

  const totalEstimated = calculateTotalEstimated(dateFilter);

  return (
    <div style={{ padding: '16px', width: '100%', boxSizing: 'border-box' }}>
      {/* Date Filters Section */}
      <div style={{
        marginBottom: '20px',
        padding: isMobile ? '12px' : '16px',
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '12px' : '16px',
          alignItems: isMobile ? 'stretch' : 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}>
          {/* Filter Buttons */}
          <div style={{
            display: 'flex',
            gap: isMobile ? '8px' : '12px',
            flexWrap: 'wrap',
            flex: isMobile ? '1' : '0 0 auto'
          }}>
            <button
              onClick={() => setDateFilter('all')}
              style={{
                padding: isMobile ? '8px 12px' : '10px 16px',
                borderRadius: '8px',
                border: dateFilter === 'all' ? '2px solid #475569' : '2px solid #e2e8f0',
                background: dateFilter === 'all' ? '#475569' : 'white',
                color: dateFilter === 'all' ? 'white' : '#475569',
                fontFamily: 'Work Sans, sans-serif',
                fontSize: isMobile ? '12px' : '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                boxShadow: dateFilter === 'all' ? '0 2px 4px rgba(71, 85, 105, 0.2)' : 'none'
              }}
            >
              All Bookings
            </button>
            <button
              onClick={() => setDateFilter('3months')}
              style={{
                padding: isMobile ? '8px 12px' : '10px 16px',
                borderRadius: '8px',
                border: dateFilter === '3months' ? '2px solid #475569' : '2px solid #e2e8f0',
                background: dateFilter === '3months' ? '#475569' : 'white',
                color: dateFilter === '3months' ? 'white' : '#475569',
                fontFamily: 'Work Sans, sans-serif',
                fontSize: isMobile ? '12px' : '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                boxShadow: dateFilter === '3months' ? '0 2px 4px rgba(71, 85, 105, 0.2)' : 'none'
              }}
            >
              Last 3 Months
            </button>
            <button
              onClick={() => setDateFilter('6months')}
              style={{
                padding: isMobile ? '8px 12px' : '10px 16px',
                borderRadius: '8px',
                border: dateFilter === '6months' ? '2px solid #475569' : '2px solid #e2e8f0',
                background: dateFilter === '6months' ? '#475569' : 'white',
                color: dateFilter === '6months' ? 'white' : '#475569',
                fontFamily: 'Work Sans, sans-serif',
                fontSize: isMobile ? '12px' : '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                boxShadow: dateFilter === '6months' ? '0 2px 4px rgba(71, 85, 105, 0.2)' : 'none'
              }}
            >
              Last 6 Months
            </button>
            <button
              onClick={() => setDateFilter('1year')}
              style={{
                padding: isMobile ? '8px 12px' : '10px 16px',
                borderRadius: '8px',
                border: dateFilter === '1year' ? '2px solid #475569' : '2px solid #e2e8f0',
                background: dateFilter === '1year' ? '#475569' : 'white',
                color: dateFilter === '1year' ? 'white' : '#475569',
                fontFamily: 'Work Sans, sans-serif',
                fontSize: isMobile ? '12px' : '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                boxShadow: dateFilter === '1year' ? '0 2px 4px rgba(71, 85, 105, 0.2)' : 'none'
              }}
            >
              Last Year
            </button>
          </div>

          {/* Total Estimated Display */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            gap: '4px',
            padding: isMobile ? '10px 14px' : '14px 20px',
            background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            minWidth: isMobile ? '100%' : 'auto',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              fontFamily: 'Work Sans, sans-serif',
              fontSize: isMobile ? '10px' : '11px',
              color: '#64748b',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontWeight: '600'
            }}>
              Total Estimated
            </div>
            <div style={{
              fontFamily: 'Work Sans, sans-serif',
              fontSize: isMobile ? '22px' : '26px',
              color: '#1e293b',
              fontWeight: '700',
              letterSpacing: '-0.5px'
            }}>
              ${totalEstimated.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive top controls */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        gap: isMobile ? 8 : 12, 
        marginBottom: 16,
        flexWrap: 'nowrap'
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
          width: 'auto',
          flexShrink: 0
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
              fontSize: isMobile ? '12px' : '14px',
              width: isMobile ? '120px' : '200px',
              minWidth: isMobile ? '120px' : '200px'
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
          flexWrap: 'nowrap',
          position: 'relative',
          flexShrink: 0
        }}>
          {/* Export Dropdown Button */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowExportMenu(!showExportMenu)}
              data-export-button
              className="btn"
              style={{ 
                background: '#A56C82', 
                color: 'white', 
                padding: isMobile ? '6px 10px' : '8px 12px', 
                borderRadius: '8px', 
                border: 'none',
                fontFamily: 'Work Sans, sans-serif',
                cursor: 'pointer',
                fontSize: isMobile ? '12px' : '14px',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '4px' : '6px'
              }}
            >
              Export
              <svg width={isMobile ? "10" : "12"} height={isMobile ? "10" : "12"} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {/* Export Dropdown Menu */}
            {showExportMenu && (
              <div
                data-export-menu
                ref={exportMenuRef}
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '4px',
                  background: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 1000,
                  minWidth: isMobile ? '130px' : '150px',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={exportCSV}
                  style={{
                    width: '100%',
                    padding: isMobile ? '8px 12px' : '10px 16px',
                    border: 'none',
                    background: 'white',
                    textAlign: 'left',
                    fontFamily: 'Work Sans, sans-serif',
                    fontSize: isMobile ? '12px' : '14px',
                    color: '#2C2C2C',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    borderBottom: '1px solid #f0f0f0'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FAF4F2'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  Export CSV
                </button>
                <button
                  onClick={exportXLSX}
                  style={{
                    width: '100%',
                    padding: isMobile ? '8px 12px' : '10px 16px',
                    border: 'none',
                    background: 'white',
                    textAlign: 'left',
                    fontFamily: 'Work Sans, sans-serif',
                    fontSize: isMobile ? '12px' : '14px',
                    color: '#2C2C2C',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    borderBottom: '1px solid #f0f0f0'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FAF4F2'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  Export XLSX
                </button>
                <button
                  onClick={exportPDF}
                  style={{
                    width: '100%',
                    padding: isMobile ? '8px 12px' : '10px 16px',
                    border: 'none',
                    background: 'white',
                    textAlign: 'left',
                    fontFamily: 'Work Sans, sans-serif',
                    fontSize: isMobile ? '12px' : '14px',
                    color: '#2C2C2C',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FAF4F2'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  Save PDF
                </button>
              </div>
            )}
          </div>
          
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

            {/* Delete Button */}
            <div style={{
              marginTop: '24px',
              paddingTop: '20px',
              borderTop: '2px solid #f0f0f0'
            }}>
              <button
                onClick={handleDeleteBooking}
                style={{
                  width: '100%',
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontFamily: 'Work Sans, sans-serif',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#b91c1c';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#dc2626';
                }}
                title="Delete this booking"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Delete Booking
              </button>
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
