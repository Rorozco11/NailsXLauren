'use client';

import { useState, useEffect } from 'react';

export default function LogsView() {
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // This is a placeholder - you can connect this to your actual logging system
  useEffect(() => {
    setLoading(true);
    // Simulate fetching logs - replace with actual API call
    setTimeout(() => {
      setLogs([
        `${new Date().toLocaleString()} - System initialized`,
        `${new Date().toLocaleString()} - Admin session started`,
        `${new Date().toLocaleString()} - Bookings grid loaded`,
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <h2 
        className="text-2xl sm:text-3xl font-normal text-[#2C2C2C] mb-4 sm:mb-6"
        style={{ fontFamily: 'Cormorant Garamond, serif' }}
      >
        System Logs
      </h2>
      
      {loading ? (
        <div className="text-center py-8 text-[#666]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
          Loading logs...
        </div>
      ) : (
        <div className="bg-[#FAF4F2] rounded-lg p-4 overflow-x-auto">
          <div className="space-y-2">
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <div
                  key={index}
                  className="text-sm sm:text-base text-[#2C2C2C] font-mono py-2 px-3 bg-white rounded border-l-4 border-[#A56C82]"
                  style={{ fontFamily: 'Work Sans, sans-serif' }}
                >
                  {log}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-[#666]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                No logs available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

