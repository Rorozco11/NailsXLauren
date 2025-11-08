'use client';
import { useState } from 'react';

export default function AdminButton() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('username', username);
      
      // Close popup and clear username immediately for better UX
      setOpen(false);
      setUsername('');
      
      // Use route handler for proper cookie handling
      console.log('[AdminButton] Sending login request with username:', username);
      
      // Use form submission approach or let browser handle redirect to process cookies
      // Create a temporary form to submit
      const tempForm = document.createElement('form');
      tempForm.method = 'POST';
      tempForm.action = '/api/auth/login';
      tempForm.style.display = 'none';
      
      // Add username field
      const usernameInput = document.createElement('input');
      usernameInput.type = 'hidden';
      usernameInput.name = 'username'; // Form field name
      usernameInput.value = username;
      tempForm.appendChild(usernameInput);
      
      document.body.appendChild(tempForm);
      
      // Submit form - browser will follow redirect and process Set-Cookie header
      tempForm.submit();
      
      // Form submission will navigate away, so we don't need to handle response
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
      setOpen(true); // Reopen popup on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-admin">Admin</button>

      {open && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Admin Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input"
                  required
                  autoFocus
                  placeholder="Enter username"
                />
              </div>
              {error && <div className="error">{error}</div>}
              <div className="button-group">
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => setOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .btn-admin { 
          padding: .25rem .5rem; 
          border-radius: 6px; 
          background: #ffffff; 
          color: #9ca3af; 
          border: 1px solid #e5e7eb;
          cursor: pointer;
          font-size: 0.75rem;
          transition: all 0.2s;
          opacity: 0.7;
        }
        .btn-admin:hover {
          opacity: 1;
          color: #6b7280;
          border-color: #d1d5db;
          background: #f9fafb;
        }
        .modal-overlay { 
          position: fixed; 
          inset: 0; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          background: rgba(0,0,0,0.4); 
          z-index: 1000;
        }
        .modal { 
          background: #fff; 
          padding: 24px; 
          border-radius: 12px; 
          width: 400px; 
          max-width: 90vw;
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        }
        .modal h3 {
          margin: 0 0 20px 0;
          color: #2C2C2C;
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          text-align: center;
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-group label {
          display: block;
          margin-bottom: 6px;
          color: #2C2C2C;
          font-family: 'Work Sans', sans-serif;
          font-weight: 500;
        }
        .input { 
          width: 100%; 
          padding: 12px; 
          border: 1px solid #ddd; 
          border-radius: 8px; 
          font-size: 14px;
          font-family: 'Work Sans', sans-serif;
          box-sizing: border-box;
        }
        .input:focus {
          outline: none;
          border-color: #A56C82;
          box-shadow: 0 0 0 2px rgba(165, 108, 130, 0.1);
        }
        .error { 
          color: #dc2626; 
          margin: 12px 0; 
          font-size: 14px;
          font-family: 'Work Sans', sans-serif;
          text-align: center;
        }
        .button-group {
          display: flex; 
          gap: 12px; 
          margin-top: 20px;
        }
        .btn-primary { 
          flex: 1;
          background: #A56C82; 
          color: #fff; 
          padding: 12px 16px; 
          border-radius: 8px; 
          border: none;
          font-family: 'Work Sans', sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .btn-primary:hover:not(:disabled) {
          background: #8B5A6B;
        }
        .btn-primary:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        .btn-secondary { 
          flex: 1;
          background: #f3f4f6; 
          color: #374151;
          padding: 12px 16px; 
          border-radius: 8px; 
          border: none;
          font-family: 'Work Sans', sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .btn-secondary:hover:not(:disabled) {
          background: #e5e7eb;
        }
        .btn-secondary:disabled {
          background: #f9fafb;
          color: #9ca3af;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
}
