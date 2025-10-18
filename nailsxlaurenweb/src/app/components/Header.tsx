'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#FAF4F2]/95 backdrop-blur-sm border-b border-[#E7E2E0] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image 
              src="/Images/actualLogo.jpeg" 
              alt="Nails X Lauren"
              width={80}
              height={80}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shadow-sm hover:shadow-md transition-shadow duration-300"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
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
            className="hidden lg:block bg-[#D8A5B4] text-white px-6 py-3 rounded-full font-medium hover:bg-[#A56C82] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            style={{ fontFamily: 'Work Sans, sans-serif' }}
          >
            Book Now
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 group"
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
        
        {/* Mobile Menu Overlay */}
        <div 
          className={`lg:hidden fixed inset-0 bg-[#FAF4F2] z-40 transition-all duration-300 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <Link 
              href="/" 
              className="text-2xl font-medium text-[#2C2C2C] hover:text-[#A56C82] transition-colors duration-200"
              style={{ fontFamily: 'Work Sans, sans-serif' }}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              href="/services" 
              className="text-2xl font-medium text-[#2C2C2C] hover:text-[#A56C82] transition-colors duration-200"
              style={{ fontFamily: 'Work Sans, sans-serif' }}
              onClick={toggleMenu}
            >
              Services
            </Link>
            <Link 
              href="/gallery" 
              className="text-2xl font-medium text-[#2C2C2C] hover:text-[#A56C82] transition-colors duration-200"
              style={{ fontFamily: 'Work Sans, sans-serif' }}
              onClick={toggleMenu}
            >
              Gallery
            </Link>
            <Link 
              href="/about" 
              className="text-2xl font-medium text-[#2C2C2C] hover:text-[#A56C82] transition-colors duration-200"
              style={{ fontFamily: 'Work Sans, sans-serif' }}
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link 
              href="/booknow" 
              className="bg-[#D8A5B4] text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-[#A56C82] transition-all duration-200 shadow-lg"
              style={{ fontFamily: 'Work Sans, sans-serif' }}
              onClick={toggleMenu}
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
