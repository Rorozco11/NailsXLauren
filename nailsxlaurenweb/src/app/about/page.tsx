import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-[#FAF4F2]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-normal text-[#2C2C2C] mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              About Lauren
            </h1>
            <div className="w-24 h-1 bg-[#D8A5B4] mx-auto rounded-full"></div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Lauren's Photo */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="w-80 h-80 mx-auto rounded-2xl overflow-hidden shadow-2xl">
                  <Image 
                    src="/Images/laurenphoto.jpeg" 
                    alt="Lauren - Nail Artist" 
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#D8A5B4] rounded-full opacity-60"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-[#A56C82] rounded-full opacity-40"></div>
              </div>
            </div>

            {/* About Text */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-normal text-[#2C2C2C] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Passionate Nail Artist
                </h2>
                <p className="text-lg text-[#2C2C2C] leading-relaxed" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                  Hi, I&apos;m Lauren! I&apos;m a passionate nail artist dedicated to creating beautiful, 
                  long-lasting nail art that makes you feel confident and elegant. With years of 
                  experience in the beauty industry, I specialize in Gel X extensions, custom 
                  nail art, and creating unique designs that reflect your personal style.
                </p>
                <p className="text-lg text-[#2C2C2C] leading-relaxed" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                  My goal is to provide a relaxing, professional experience where you can unwind 
                  while I transform your nails into works of art. Every client is unique, and I 
                  love collaborating to bring your vision to life.
                </p>
              </div>

              {/* Specialties */}
              <div className="pt-6">
                <h3 className="text-xl font-normal text-[#2C2C2C] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  My Specialties
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#D8A5B4] rounded-full"></div>
                    <span className="text-[#2C2C2C]" style={{ fontFamily: 'Work Sans, sans-serif' }}>Gel X Extensions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#D8A5B4] rounded-full"></div>
                    <span className="text-[#2C2C2C]" style={{ fontFamily: 'Work Sans, sans-serif' }}>Custom Nail Art</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#D8A5B4] rounded-full"></div>
                    <span className="text-[#2C2C2C]" style={{ fontFamily: 'Work Sans, sans-serif' }}>French Tips</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#D8A5B4] rounded-full"></div>
                    <span className="text-[#2C2C2C]" style={{ fontFamily: 'Work Sans, sans-serif' }}>Chrome & 3D Designs</span>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="pt-8">
                <a 
                  href="/booknow"
                  className="inline-flex items-center px-8 py-4 bg-[#D8A5B4] text-white font-medium rounded-full hover:bg-[#A56C82] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  style={{ fontFamily: 'Work Sans, sans-serif' }}
                >
                  Book Your Appointment
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
