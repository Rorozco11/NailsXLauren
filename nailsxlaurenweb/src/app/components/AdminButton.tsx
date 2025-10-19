'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminButton() {
  const [open, setOpen] = useState(false);
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pass }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data?.message || 'Login failed');
        return;
      }
      // successful — router.refresh or redirect to /admin
      router.push('/adminpage');
    } catch {
      setErr('Network error');
    }
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-admin">Admin</button>

      {open && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Admin Login</h3>
            <form onSubmit={submit}>
              <input
                type="password"
                placeholder="Password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="input"
                autoFocus
              />
              {err && <div className="err">{err}</div>}
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button type="submit" className="btn-primary">Enter</button>
                <button type="button" className="btn-secondary" onClick={() => setOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .btn-admin { padding: .5rem 1rem; border-radius: 8px; background:#A56C82; color: #fff; }
        .modal-overlay { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; background: rgba(0,0,0,0.4); }
        .modal { background:#fff; padding:20px; border-radius:12px; width:320px; box-shadow:0 8px 30px rgba(0,0,0,0.12); }
        .input { width:100%; padding:8px; border:1px solid #ddd; border-radius:8px; }
        .err { color: red; margin-top:8px; font-size: 0.9rem; }
        .btn-primary{ background:#A56C82; color:#fff; padding:.5rem 1rem; border-radius:8px; border:none; }
        .btn-secondary{ background:#eee; padding:.5rem 1rem; border-radius:8px; border:none; }
      `}</style>
    </>
  );
}
