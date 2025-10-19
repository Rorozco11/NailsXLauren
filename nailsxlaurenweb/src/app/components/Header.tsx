'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#FAF4F2]/95 backdrop-blur-sm border-b border-[#E7E2E0] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="w-20 h-20 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-24 lg:h-24 rounded-full bg-[#AA538A] overflow-hidden">
              <Image 
                src="/Images/nailxlaurenlogo.png" 
                alt="Nails X Lauren"
                width={80}
                height={80}
                className="w-full h-full object-cover shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
              />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link 
              href="/" 
              className="text-[#2C2C2C] hover:text-[#A56C82] font-medium transition-colors duration-200 relative group"
              style={{ fontFamily: 'Work Sans, sans-serif' }}
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A56C82] transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/services" 
              className="text-[#2C2C2C] hover:text-[#A56C82] font-medium transition-colors duration-200 relative group"
              style={{ fontFamily: 'Work Sans, sans-serif' }}
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A56C82] transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/gallery" 
              className="text-[#2C2C2C] hover:text-[#A56C82] font-medium transition-colors duration-200 relative group"
              style={{ fontFamily: 'Work Sans, sans-serif' }}
            >
              Gallery
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A56C82] transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/about" 
              className="text-[#2C2C2C] hover:text-[#A56C82] font-medium transition-colors duration-200 relative group"
              style={{ fontFamily: 'Work Sans, sans-serif' }}
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A56C82] transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </nav>
          
          {/* Desktop CTA Button */}
          <Link 
            href="/booknow" 
            className="hidden md:block bg-[#D8A5B4] text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-medium hover:bg-[#A56C82] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm md:text-base"
            style={{ fontFamily: 'Work Sans, sans-serif' }}
          >
            Book Now
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 group touch-manipulation"
            aria-label="Toggle menu"
          >
            <span 
              className={`w-6 h-0.5 bg-[#2C2C2C] transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span 
              className={`w-6 h-0.5 bg-[#2C2C2C] transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span 
              className={`w-6 h-0.5 bg-[#2C2C2C] transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
        
        {/* Backdrop Overlay */}
        <div 
          className={`md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={toggleMenu}
        />

        {/* Side Drawer */}
        <div 
          className={`md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white border-l border-[#E7E2E0]/30 shadow-2xl z-50 transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
        >
          {/* Drawer Content */}
          <div className="flex flex-col h-full ">
            {/* Header */}
            <div className="flex items-center bg-white justify-between p-6 border-b border-[#E7E2E0]/20">
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-[#2C2C2C]" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                  Menu
                </span>
              </div>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-full hover:bg-[#F5F0ED] transition-colors duration-200"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5 text-[#2C2C2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-6 py-6 bg-white">
              <div className="space-y-2">
                <Link 
                  href="/" 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    pathname === '/' 
                      ? 'bg-[#A56C82] text-white' 
                      : 'text-[#2C2C2C] hover:bg-[#F5F0ED] hover:text-[#A56C82]'
                  }`}
                  style={{ fontFamily: 'Work Sans, sans-serif' }}
                  onClick={toggleMenu}
                >
                  <span className="text-lg">🏠</span>
                  <span className="font-medium">Home</span>
                </Link>
                <Link 
                  href="/services" 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    pathname === '/services' 
                      ? 'bg-[#A56C82] text-white' 
                      : 'text-[#2C2C2C] hover:bg-[#F5F0ED] hover:text-[#A56C82]'
                  }`}
                  style={{ fontFamily: 'Work Sans, sans-serif' }}
                  onClick={toggleMenu}
                >
                  <span className="text-lg">💅</span>
                  <span className="font-medium">Services</span>
                </Link>
                <Link 
                  href="/gallery" 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    pathname === '/gallery' 
                      ? 'bg-[#A56C82] text-white' 
                      : 'text-[#2C2C2C] hover:bg-[#F5F0ED] hover:text-[#A56C82]'
                  }`}
                  style={{ fontFamily: 'Work Sans, sans-serif' }}
                  onClick={toggleMenu}
                >
                  <span className="text-lg">✨</span>
                  <span className="font-medium">Gallery</span>
                </Link>
                <Link 
                  href="/about" 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    pathname === '/about' 
                      ? 'bg-[#A56C82] text-white' 
                      : 'text-[#2C2C2C] hover:bg-[#F5F0ED] hover:text-[#A56C82]'
                  }`}
                  style={{ fontFamily: 'Work Sans, sans-serif' }}
                  onClick={toggleMenu}
                >
                  <span className="text-lg">👋</span>
                  <span className="font-medium">About</span>
                </Link>
              </div>
            </nav>

            {/* Sticky Book Now Section */}
            <div className="p-6 border-t border-[#E7E2E0]/20 bg-white">
              <Link 
                href="/booknow" 
                className="block w-full bg-gradient-to-r from-[#D8A5B4] to-[#A56C82] text-white text-center py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#A56C82]/25 transition-all duration-200 transform hover:scale-[1.02]"
                style={{ fontFamily: 'Work Sans, sans-serif' }}
                onClick={toggleMenu}
              >
                📅 Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
