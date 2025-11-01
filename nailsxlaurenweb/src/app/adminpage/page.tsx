// app/admin/page.tsx
import React, { Suspense } from 'react';
import BookingsGrid from '../components/BookingsGrid';
import SuccessMessage from '../components/SuccessMessage';

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { logout } from '../login/actions'


export const dynamic = 'force-dynamic'; // in case you do server checks

export default async function AdminPage() {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get('admin_session')?.value
  
  if (!adminSession) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-[#FAF4F2]">
      <Suspense fallback={null}>
        <SuccessMessage />
      </Suspense>
      {/* Header Section */}
      <div className="bg-[#FAF4F2] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2C2C2C] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Admin Dashboard
              </h1>
              <p className="text-[#2C2C2C] text-sm sm:text-base" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                Manage bookings and appointments
              </p>
            </div>
            <form action={logout} className="w-full sm:w-auto">
              <button 
                type="submit" 
                className="w-full sm:w-auto px-6 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-[#8B5A6B] transition-all duration-200 shadow-lg text-sm sm:text-base"
                style={{ fontFamily: 'Work Sans, sans-serif' }}
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <BookingsGrid />
      </div>
    </div>
  );
}
