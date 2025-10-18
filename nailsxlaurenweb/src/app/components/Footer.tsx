import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#FAF4F2] border-t border-[#E7E2E0] mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Logo Section */}
          <div className="flex justify-center lg:justify-start">
            <Link href="/" className="flex-shrink-0">
              <Image 
                src="/Images/actualLogo.jpeg" 
                alt="Nails X Lauren"
                width={80}
                height={80}
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover shadow-sm hover:shadow-md transition-shadow duration-300"
              />
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
            <h3 className="text-lg font-normal text-[#2C2C2C] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Follow Us</h3>
            <div className="flex justify-center lg:justify-end gap-4 mb-4">
              <a 
                href="https://www.instagram.com/nailxlauren?igsh=OTcxOXZ2Mmg4ZWFs" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#D8A5B4] rounded-full flex items-center justify-center hover:bg-[#A56C82] transition-colors duration-200 group"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281H7.721c-.49 0-.875.385-.875.875s.385.875.875.875h8.558c.49 0 .875-.385.875-.875s-.385-.875-.875-.875z"/>
                </svg>
              </a>
              <Link 
                href="/booknow"
                className="w-10 h-10 bg-[#A56C82] rounded-full flex items-center justify-center hover:bg-[#D8A5B4] transition-colors duration-200 group"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
              </Link>
            </div>
            <Link 
              href="/booknow"
              className="inline-flex items-center px-6 py-2 bg-[#D8A5B4] text-white font-medium rounded-full hover:bg-[#A56C82] transition-colors duration-200 text-sm"
              style={{ fontFamily: 'Work Sans, sans-serif' }}
            >
              Book Appointment
            </Link>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-8 pt-6 border-t border-[#E7E2E0]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#2C2C2C] text-sm" style={{ fontFamily: 'Work Sans, sans-serif' }}>
              © 2024 Nails X Lauren. All rights reserved.
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
