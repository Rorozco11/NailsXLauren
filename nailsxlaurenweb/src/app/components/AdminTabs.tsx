'use client';

import { useState, ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface AdminTabsProps {
  tabs: Tab[];
}

export default function AdminTabs({ tabs }: AdminTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-4 sm:mb-6 overflow-x-auto">
        <nav className="flex -mb-px min-w-max sm:min-w-0" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap px-3 sm:px-5 md:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-base font-medium transition-all duration-200 relative
                ${
                  activeTab === tab.id
                    ? 'text-[#A56C82] border-b-2 border-[#A56C82]'
                    : 'text-[#2C2C2C] hover:text-[#A56C82] hover:border-gray-300 border-b-2 border-transparent'
                }
              `}
              style={{ fontFamily: 'Work Sans, sans-serif' }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-2 sm:mt-4">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}

