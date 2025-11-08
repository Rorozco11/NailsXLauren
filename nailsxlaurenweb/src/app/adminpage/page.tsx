// app/admin/page.tsx
import React, { Suspense } from 'react';
import BookingsGrid from '../components/BookingsGrid';
import AdminTabs from '../components/AdminTabs';
import LogsView from '../components/LogsView';
import CalendarView from '../components/CalendarView';
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

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      content: <BookingsGrid />
    },
    {
      id: 'calendar',
      label: 'Calendar',
      content: <CalendarView />
    },
    {
      id: 'logs',
      label: 'Logs',
      content: <LogsView />
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF4F2]">
      <Suspense fallback={null}>
        <SuccessMessage />
      </Suspense>
      
      {/* Header Section */}
      <div className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 relative">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex-1 pr-12 sm:pr-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#2C2C2C] mb-1 sm:mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Admin Dashboard
              </h1>
              <p className="text-[#2C2C2C] text-xs sm:text-sm" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                Manage bookings and appointments
              </p>
            </div>
            <form action={logout} className="absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto flex-shrink-0">
              <button 
                type="submit" 
                className="px-3 py-1.5 sm:px-4 md:px-6 bg-red-500 text-white font-medium rounded-full hover:bg-[#8B5A6B] transition-all duration-200 shadow-md text-xs sm:text-sm"
                style={{ fontFamily: 'Work Sans, sans-serif' }}
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AdminTabs tabs={tabs} />
      </div>
    </div>
  );
}
