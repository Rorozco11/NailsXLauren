import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/Images/homepic5.jpg"
            alt="Beautiful manicured hands with elegant nail art"
            fill
            className="object-cover"
            style={{ objectPosition: 'center 45%' }}
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal text-white mb-8 leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Modern, mindful nail care.
              </h1>
              <p className="text-xl md:text-2xl text-white mb-12 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Clean, long-lasting manicures and nail art
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/booknow"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#D8A5B4] text-white font-medium rounded-full hover:bg-[#A56C82] transition-all duration-200 text-lg shadow-lg min-h-[56px]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Book Now
                </Link>
                <Link 
                  href="/services"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-[#2C2C2C] transition-all duration-200 text-lg min-h-[56px]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Instagram Gallery Preview */}
      <section className="bg-[#FAF4F2] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-normal text-[#2C2C2C] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Latest Work</h2>
            <p className="text-xl text-[#2C2C2C] max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
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
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
