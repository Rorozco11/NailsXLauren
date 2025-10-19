// app/admin/BookingsGrid.tsx
'use client';
import { useEffect, useState, useRef, useCallback } from 'react';

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
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<Booking[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [limit] = useState(20);
  const debounceRef = useRef<number | null>(null);

  const fetchData = useCallback(async (search: string, pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/bookings?search=${encodeURIComponent(search)}&page=${pageNum}&limit=${limit}`);
      if (!res.ok) throw new Error('Fetch failed');
      const json = await res.json();
      setRows(json.data || []);
      setTotalPages(json.totalPages || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  // initial load
  useEffect(() => {
    fetchData('', 1);
  }, [fetchData]);

  // debounce search
  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      setPage(1); // reset page on new search
      fetchData(q, 1);
    }, 350);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [q, fetchData]);

  // pagination
  useEffect(() => {
    fetchData(q, page);
  }, [page, q, fetchData]);

  function exportCSV() {
    const header = ['Full Name','Phone Number','Email','Preferred Date','Preferred Time','Message','Created On','Init Price'];
    const lines = [header.join(',')].concat(rows.map(r => [
      `"${r.full_name?.replace(/"/g,'""') ?? ''}"`,
      `"${r.phone_number ?? ''}"`,
      `"${r.email ?? ''}"`,
      `"${r.preferred_date ?? ''}"`,
      `"${r.preferred_time ?? ''}"`,
      `"${(r.message ?? '').replace(/"/g,'""')}"`,
      `"${r.created_on}"`,
      `"${r.init_price ?? ''}"`
    ].join(',')));
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings-page${page}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, phone, email, message, date..."
          style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd', minWidth: 320 }}
        />
        <button onClick={() => fetchData(q, 1)} className="btn">Search</button>
        <button onClick={exportCSV} className="btn">Export CSV</button>
        <div style={{ marginLeft: 'auto' }}>{loading ? 'Loading…' : `${rows.length} results`}</div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Full Name</th>
              <th style={th}>Phone</th>
              <th style={th}>Email</th>
              <th style={th}>Preferred Date</th>
              <th style={th}>Preferred Time</th>
              <th style={th}>Message</th>
              <th style={th}>Created On</th>
              <th style={th}>Init Price</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={td}>{row.full_name}</td>
                <td style={td}>{row.phone_number}</td>
                <td style={td}>{row.email}</td>
                <td style={td}>{row.preferred_date ?? ''}</td>
                <td style={td}>{row.preferred_time ?? ''}</td>
                <td style={td}>{row.message ?? ''}</td>
                <td style={td}>{new Date(row.created_on).toLocaleString()}</td>
                <td style={td}>{row.init_price ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12, alignItems: 'center' }}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
        <div>Page {page} / {totalPages || 1}</div>
        <button onClick={() => setPage(p => (p < (totalPages || 1) ? p + 1 : p))} disabled={page >= (totalPages || 1)}>Next</button>
      </div>

      <style jsx>{`
        th { text-align:left; padding: 12px 8px; color: #555; font-weight: 600; }
        td { padding: 12px 8px; color: #222; }
        .btn { background:#A56C82;color:white;padding:8px 12px;border-radius:8px;border:none; }
      `}</style>
    </div>
  );
}

const th = { padding: '12px 8px', textAlign: 'left' } as const;
const td = { padding: '12px 8px' } as const;
