// app/admin/page.tsx
import React from 'react';
import BookingsGrid from '../components/BookingsGrid';

export const dynamic = 'force-dynamic'; // in case you do server checks

export default function AdminPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Admin Dashboard</h1>
      <p>Only accessible after login.</p>
      <form method="post" action="/api/admin/logout">
        <button type="submit" className="btn-logout">Logout</button>
      </form>
      <BookingsGrid />
    </main>
  );
}
