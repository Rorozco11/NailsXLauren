import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF4F2]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="text-center mb-16">
            <h1 className="text-6xl lg:text-8xl font-normal text-[#2C2C2C] mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Nails × Lauren
            </h1>
      </div>

          {/* Featured Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Image
                src="/Images/posts/202501/18480780841007542.jpg"
                alt="Beautiful nail art design"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Image
                src="/Images/posts/202501/18366583615191214.jpg"
                alt="Elegant nail design"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <Image
                src="/Images/posts/202501/17921029193995963.jpg"
                alt="Creative nail art"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <Image 
                src="/Images/posts/202501/17880726426220137.jpg"
                alt="Stunning nail design"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-normal text-[#2C2C2C] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Our Services</h2>
            <p className="text-xl text-[#2C2C2C] max-w-2xl mx-auto" style={{ fontFamily: 'Work Sans, sans-serif' }}>
              From classic manicures to intricate nail art, we offer a full range of professional nail services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-[#FAF4F2] hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#D8A5B4] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-normal text-[#2C2C2C] mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Gel X Sets</h3>
              <p className="text-[#2C2C2C] mb-4" style={{ fontFamily: 'Work Sans, sans-serif' }}>Full sets with Gel X extensions for long-lasting, beautiful nails.</p>
              <span className="text-[#A56C82] font-medium" style={{ fontFamily: 'Work Sans, sans-serif' }}>Starting at $35</span>
            </div>

            <div className="text-center p-8 rounded-2xl bg-[#FAF4F2] hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#D8A5B4] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-normal text-[#2C2C2C] mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Nail Art</h3>
              <p className="text-[#2C2C2C] mb-4" style={{ fontFamily: 'Work Sans, sans-serif' }}>Custom designs and artistic nail art to express your unique style.</p>
              <span className="text-[#A56C82] font-medium" style={{ fontFamily: 'Work Sans, sans-serif' }}>Starting at $15</span>
            </div>

            <div className="text-center p-8 rounded-2xl bg-[#FAF4F2] hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#D8A5B4] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
              </div>
              <h3 className="text-xl font-normal text-[#2C2C2C] mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Gel Manicures</h3>
              <p className="text-[#2C2C2C] mb-4" style={{ fontFamily: 'Work Sans, sans-serif' }}>Long-lasting gel polish with UV curing for beautiful, durable nails.</p>
              <span className="text-[#A56C82] font-medium" style={{ fontFamily: 'Work Sans, sans-serif' }}>Starting at $20</span>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/services"
              className="inline-flex items-center px-8 py-4 border-2 border-[#A56C82] text-[#A56C82] font-medium rounded-full hover:bg-[#A56C82] hover:text-white transition-all duration-200"
              style={{ fontFamily: 'Work Sans, sans-serif' }}
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram Gallery Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-normal text-[#2C2C2C] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Latest Work</h2>
            <p className="text-xl text-[#2C2C2C] max-w-2xl mx-auto" style={{ fontFamily: 'Work Sans, sans-serif' }}>
              Follow our journey and get inspired by our latest nail art creations.
            </p>
        </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <Image
                src="/Images/posts/18026630468409675.jpg"
                alt="Nail art design"
                width={200}
                height={200}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <Image
                src="/Images/posts/18037103918184064.jpg"
                alt="Nail art design"
                width={200}
                height={200}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <Image
                src="/Images/posts/17867825208229173.jpg"
                alt="Nail art design"
                width={200}
                height={200}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <Image
                src="/Images/posts/17901097451983396.jpg"
                alt="Nail art design"
                width={200}
                height={200}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <Image
                src="/Images/posts/17918189954901783.jpg"
                alt="Nail art design"
                width={200}
                height={200}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
        <Image 
                src="/Images/posts/17946028022857400.jpg"
                alt="Nail art design"
                width={200}
                height={200}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/gallery"
              className="inline-flex items-center px-8 py-4 bg-[#D8A5B4] text-white font-medium rounded-full hover:bg-[#A56C82] transition-all duration-200 shadow-lg"
              style={{ fontFamily: 'Work Sans, sans-serif' }}
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
