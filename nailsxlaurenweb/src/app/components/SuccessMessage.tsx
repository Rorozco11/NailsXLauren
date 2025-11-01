'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SuccessMessage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const loginSuccess = searchParams.get('login');
    if (loginSuccess === 'success') {
      setShow(true);
      // Remove the query parameter from URL without reload
      const url = new URL(window.location.href);
      url.searchParams.delete('login');
      router.replace(url.pathname + url.search, { scroll: false });
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);

  if (!show) return null;

  return (
    <div className="success-message">
      <div className="success-content">
        <svg
          className="success-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Login successful! Welcome to the admin dashboard.</span>
        <button
          onClick={() => setShow(false)}
          className="success-close"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <style jsx>{`
        .success-message {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .success-content {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #10b981;
          color: white;
          padding: 16px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          font-family: 'Work Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          max-width: 400px;
        }
        .success-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }
        .success-content span {
          flex: 1;
        }
        .success-close {
          background: transparent;
          border: none;
          color: white;
          font-size: 24px;
          line-height: 1;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background-color 0.2s;
        }
        .success-close:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}

