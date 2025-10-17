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
    <div className="flex justify-between m-[1rem] items-center">
      <Image 
        src="/Images/actualLogo.jpeg" 
        alt="Logo"
        width={112}
        height={112}
        className="md:w-28 w-[3.5rem] rounded-full object-cover aspect-square"
      />
      
      <div className="hidden md:flex gap-8 absolute md:left-1/2 md:transform md:-translate-x-1/2">
        <Link href="/" className="hover:text-pink-600 hover:underline">Home</Link>
        <Link href="/services" className="hover:text-pink-600 hover:underline">Services</Link>
        <Link href="/about" className="hover:text-pink-600 hover:underline">About</Link>
      </div>
      
      <div className="md:hidden">
        <input 
          type="checkbox" 
          id="menu-toggle" 
          className="hidden"
          checked={isMenuOpen}
          onChange={toggleMenu}
        />
        <label 
          htmlFor="menu-toggle" 
          className="flex flex-col gap-2 cursor-pointer w-10 h-10"
        >
          <div 
            className={`w-full h-1 bg-black rounded transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <div 
            className={`w-full h-1 bg-black rounded transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <div 
            className={`w-full h-1 bg-black rounded transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </label>
        
        {/* Mobile Menu */}
        <div 
          className={`fixed top-0 left-0 w-full bg-white overflow-hidden transition-all duration-300 z-50 ${
            isMenuOpen ? 'h-screen' : 'h-0'
          }`}
        >
          <div className="flex flex-col items-center gap-8 pt-20">
            <Link href="/" className="text-xl hover:text-gray-600" onClick={toggleMenu}>Home</Link>
            <Link href="/services" className="text-xl hover:text-gray-600" onClick={toggleMenu}>Services</Link>
            <Link href="/about" className="text-xl hover:text-gray-600" onClick={toggleMenu}>About</Link>
            <Link href="/booknow" className="btn-bookNow" onClick={toggleMenu}>BOOK NOW</Link>
          </div>
        </div>
      </div>
      
      <Link href="/booknow" className="btn-bookNow hidden md:block">BOOK NOW</Link>
    </div>
  );
}
