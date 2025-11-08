import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      

      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#FAF4F2] via-white to-[#F5E8E3]">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
            
            {/* Left Side - Content */}
            <div className="relative z-10 order-2 lg:order-1">
              <div className="space-y-8">
                {/* Decorative Element */}
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-[#D8A5B4]/10 rounded-full blur-3xl"></div>
                
                {/* Heading */}
                <div className="relative">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-[#2C2C2C] mb-6 leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    Modern, mindful
                    <span className="block text-[#D8A5B4]">nail care.</span>
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-[#D8A5B4] to-transparent mb-8"></div>
                </div>
                
                {/* Description */}
                <p className="text-xl md:text-2xl text-[#5A5A5A] leading-relaxed max-w-xl" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Clean, long-lasting manicures and nail art that reflect your unique style.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link 
                    href="/booknow"
                    className="inline-flex items-center justify-center px-8 py-4 bg-[#D8A5B4] text-white font-medium rounded-full hover:bg-[#A56C82] transition-all duration-300 text-lg shadow-lg hover:shadow-xl hover:scale-105 min-h-[56px]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Book Now
                  </Link>
                  <Link 
                    href="/services"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#D8A5B4] text-[#D8A5B4] font-medium rounded-full hover:bg-[#D8A5B4] hover:text-white transition-all duration-300 text-lg min-h-[56px] shadow-md hover:shadow-lg hover:scale-105"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    View Services
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side - Featured Image */}
            <div className="relative order-1 lg:order-2">
              {/* Decorative Background Elements */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#D8A5B4]/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#D8A5B4]/10 rounded-full blur-2xl"></div>
              
              {/* Image Container with Creative Frame */}
              <div className="relative">
                {/* Outer decorative border */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[#D8A5B4]/20 to-[#A56C82]/20 rounded-3xl blur-xl"></div>
                
                {/* Main image container */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                  <div className="aspect-[4/5] relative">
                    <Image
                      src="/Images/IMG_9845.jpg"
                      alt="Beautiful manicured hands with elegant nail art"
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Subtle gradient overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                  </div>
                  
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24">
                    <div className="absolute top-4 right-4 w-16 h-16 border-2 border-[#D8A5B4]/30 rounded-lg transform rotate-12"></div>
                  </div>
                </div>
                
                {/* Floating accent element */}
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-[#D8A5B4] rounded-full opacity-20 blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom decorative wave */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAF4F2] to-transparent"></div>
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
                src="/Images/posts/202511/17867825208229173.jpg"
                alt="Nail art design"
                width={200}
                height={200}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <Image
                src="/Images/posts/202511/18037103918184064.jpg"
                alt="Nail art design"
                width={200}
                height={200}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <Image
                src="/Images/posts/202511/17901097451983396.jpg"
                alt="Nail art design"
                width={200}
                height={200}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <Image
                src="/Images/posts/202511/17918189954901783.jpg"
                alt="Nail art design"
                width={200}
                height={200}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <Image
                src="/Images/posts/202511/17946028022857400.jpg"
                alt="Nail art design"
                width={200}
                height={200}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
        <Image 
                src="/Images/posts/202511/17984819468751793.jpg"
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
