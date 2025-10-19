import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#FAF4F2] border-t border-[#E7E2E0]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Logo Section */}
          <div className="flex justify-center lg:justify-start">
            <Link href="/" className="flex-shrink-0">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[#AA538A] overflow-hidden">
                <Image 
                  src="/Images/nailxlaurenlogo.png" 
                  alt="Nails X Lauren"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
                />
              </div>
            </Link>
          </div>

          {/* Contact Information */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-normal text-[#2C2C2C] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Get In Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-8 h-8 bg-[#D8A5B4] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <a 
                  href="tel:203-213-9575" 
                  className="text-[#2C2C2C] hover:text-[#A56C82] transition-colors duration-200"
                  style={{ fontFamily: 'Work Sans, sans-serif' }}
                >
                  203-213-9575
                </a>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-8 h-8 bg-[#D8A5B4] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <a 
                  href="mailto:lorozco@gmail.com" 
                  className="text-[#2C2C2C] hover:text-[#A56C82] transition-colors duration-200"
                  style={{ fontFamily: 'Work Sans, sans-serif' }}
                >
                  lorozco@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Social Media & Quick Links */}
          <div className="text-center lg:text-right">
            <h3 className="text-lg font-normal text-[#2C2C2C] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Follow Me</h3>
            <div className="flex justify-center lg:justify-end gap-4 mb-4">
              <a 
                href="https://www.instagram.com/nailxlauren?igsh=OTcxOXZ2Mmg4ZWFs" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#D8A5B4] rounded-full flex items-center justify-center hover:bg-[#A56C82] transition-colors duration-200 group"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-8 pt-6 border-t border-[#E7E2E0]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#2C2C2C] text-sm" style={{ fontFamily: 'Work Sans, sans-serif' }}>
              © 2025 Nails X Lauren. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/services" className="text-[#2C2C2C] hover:text-[#A56C82] transition-colors duration-200" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                Services
              </Link>
              <Link href="/gallery" className="text-[#2C2C2C] hover:text-[#A56C82] transition-colors duration-200" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                Gallery
              </Link>
              <Link href="/about" className="text-[#2C2C2C] hover:text-[#A56C82] transition-colors duration-200" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
