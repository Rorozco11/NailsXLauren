
'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showSlideIndicator, setShowSlideIndicator] = useState(true);

  useEffect(() => {
    // Hide the indicator after 3 seconds
    const timer = setTimeout(() => {
      setShowSlideIndicator(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Define the images to include in the gallery with categories
  const galleryImages = [
  
    
    
    
    // Images from 202505 folder
    { src: '/Images/posts/202505/17853247764395667.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/17861287320400486.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/17875655463331100.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/17898299370090187.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/17900586834194459.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/17963469815775659.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/18028381808459584.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/18045188060395936.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/18046752632590024.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/18053379122349937.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/18058124797975445.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/18060335087164214.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/18062807275881075.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/18063148259038478.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/18069222589772497.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/18069992104756661.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/18079356157801788.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/18087307858720515.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/18088776868720170.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/18094403728603852.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/18097392091553301.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/18100991389539682.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/18125728705438058.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/18134778304407432.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/18139237723394644.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/18165729718343876.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/18280517077250797.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202505/18386234098188020.jpg', alt: 'Nail art design', category: 'solid' },
    
    
    // Images from 202506 folder
    { src: '/Images/posts/202506/17862027561352352.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202506/17870478129286694.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202506/17887157499272970.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202506/17890697385141606.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202506/17966092865779203.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202506/17971392779883767.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202506/18015541316724906.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202506/18048309056404026.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202506/18051131903609110.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202506/18066118052026047.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202506/18068365540839620.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202506/18075105946936731.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202506/18086062189671923.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202506/18188193739314785.jpg', alt: 'Nail art design', category: 'solid' },
    
    
    
    // Images from 202507 folder
    { src: '/Images/posts/202507/17864645964356091.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202507/17865186090419813.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202507/17974480307748525.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202507/17992298405669093.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202507/18068512904028346.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202507/18075305716755193.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202507/18090991669655424.jpg', alt: 'Nail art design', category: 'solid' },
    
    // Images from 202508 folder
    { src: '/Images/posts/202508/17855218548455857.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202508/17857293753493320.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202508/18061963214057584.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202508/18081068879309981.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202508/18102246127596355.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202508/18142076455419143.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202508/17913844395055480.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202508/18051531725552472.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202508/18068879885126745.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202508/18077845990983114.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202508/18099514330551927.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202508/18126322723419756.jpg', alt: 'Nail art design', category: 'solid' },
    
    
    // Images from 202509 folder
    { src: '/Images/posts/202509/17842430916586863.jpg', alt: 'Nail art design', category: 'seasonal' },
    { src: '/Images/posts/202509/17844136392573800.jpg', alt: 'Nail art design', category: 'gelmanicure' },
    { src: '/Images/posts/202509/17870650893348872.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/17876650101403020.jpg', alt: 'Nail art design', category: 'gelxset' },
    { src: '/Images/posts/202509/17878498038288056.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/17879089866288110.jpg', alt: 'Nail art design', category: 'gelmanicure' },
    { src: '/Images/posts/202509/17882090433377258.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/17885187339370235.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/17892803901314713.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/17898447891143701.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/17898857580269750.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/17901298749257227.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/17918921397166879.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/17947146267028960.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/17947266234013684.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/17957905217994050.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/17970718499937164.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/17994725150683918.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18035884070495900.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18040735823425703.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18043064072670054.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18058449020175805.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18066783650203991.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18068099402196658.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18068357534228328.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18069581132194173.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18075285722038463.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18076578482071558.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18078371980970447.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18078955411797263.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18080563255979357.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18087023128841624.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18088299925840150.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18088755670887524.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18095937643653643.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18096302797641122.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18101509048533972.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18110086675558478.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18111489442533641.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18115568725521544.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18123754705480135.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18156722311388283.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18178350133343553.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18187570150322120.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18189466372321991.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18223127311307012.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18289226032264505.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18327502624236853.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202509/18342403009166328.jpg', alt: 'Nail art design', category: 'solid' },
    
    
    
    // Images from 202510 folder
    { src: '/Images/posts/202510/17844379524573540.jpg', alt: 'Nail art design', category: 'seasonal' },
    { src: '/Images/posts/202510/17951169053896221.jpg', alt: 'Nail art design', category: 'gelxset' },
    { src: '/Images/posts/202510/17973235436940247.jpg', alt: 'Nail art design', category: 'seasonal' },
    { src: '/Images/posts/202510/18053918615269469.jpg', alt: 'Nail art design', category: 'gelmanicure' },
    { src: '/Images/posts/202510/18057115424239301.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202510/18068919215034606.jpg', alt: 'Nail art design', category: 'gelxset' },
    { src: '/Images/posts/202510/18072558836336231.jpg', alt: 'Nail art design', category: 'seasonal' },
    { src: '/Images/posts/202510/18072758804464754.jpg', alt: 'Nail art design', category: 'seasonal' },
    { src: '/Images/posts/202510/18082065737487060.jpg', alt: 'Nail art design', category: 'seasonal' },
    { src: '/Images/posts/202510/18086017540918599.jpg', alt: 'Nail art design', category: 'seasonal' },
    { src: '/Images/posts/202510/18104864257620902.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202510/18115494823546661.jpg', alt: 'Nail art design', category: 'seasonal' },
    { src: '/Images/posts/202510/18117206320534349.jpg', alt: 'Nail art design', category: 'seasonal' },
    { src: '/Images/posts/202510/18145219633421934.jpg', alt: 'Nail art design', category: 'seasonal' },
    { src: '/Images/posts/202510/18188998117336415.jpg', alt: 'Nail art design', category: 'seasonal' },
    { src: '/Images/posts/202510/18208200073309380.jpg', alt: 'Nail art design', category: 'seasonal' },
    { src: '/Images/posts/202510/18389892007131604.jpg', alt: 'Nail art design', category: 'seasonal' },
    { src: '/Images/posts/202510/18508420240066856.jpg', alt: 'Nail art design', category: 'seasonal' },
    
    
    
    { src: '/Images/posts/202511/17867825208229173.jpg', alt: 'Nail art design', category: 'gelxset' },
    { src: '/Images/posts/202511/17901097451983396.jpg', alt: 'Nail art design', category: 'gelmanicure' },
    { src: '/Images/posts/202511/17918189954901783.jpg', alt: 'Nail art design', category: 'gelxset' },
    { src: '/Images/posts/202511/17946028022857400.jpg', alt: 'Nail art design', category: 'gelmanicure' },
    { src: '/Images/posts/202511/17984819468751793.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202511/18007664174653730.jpg', alt: 'Nail art design', category: 'gelxset' },
    { src: '/Images/posts/202511/18014346647341952.jpg', alt: 'Nail art design', category: 'gelmanicure' },
    { src: '/Images/posts/202511/18021722780615238.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202511/18023136296606585.jpg', alt: 'Nail art design', category: 'gelxset' },
    { src: '/Images/posts/202511/18026630468409675.jpg', alt: 'Nail art design', category: 'gelmanicure' },
    { src: '/Images/posts/202511/18027183209170423.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202511/18035363216198219.jpg', alt: 'Nail art design', category: 'gelxset' },
    { src: '/Images/posts/202511/18037103918184064.jpg', alt: 'Nail art design', category: 'gelmanicure' },
    { src: '/Images/posts/202511/18040325042170257.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202511/18044508656072565.jpg', alt: 'Nail art design', category: 'gelxset' },
    { src: '/Images/posts/202511/18047536117999165.mp4', alt: 'Nail art video', isVideo: true, category: 'gelxset' },
    { src: '/Images/posts/202511/18047937166952645.mp4', alt: 'Nail art video', isVideo: true, category: 'gelmanicure' },
    { src: '/Images/posts/202511/18061799296741579.jpg', alt: 'Nail art design', category: 'solid' },
    { src: '/Images/posts/202511/18061986211704654.jpg', alt: 'Nail art design', category: 'gelxset' },
    { src: '/Images/posts/202511/18103359877452188.jpg', alt: 'Nail art design', category: 'gelmanicure' },
    
    // Homepic images
    { src: '/Images/homepic1.jpeg', alt: 'Beautiful nail art design', category: 'gelxset' },
    { src: '/Images/homepic2.jpeg', alt: 'Elegant nail design', category: 'gelmanicure' },
    { src: '/Images/homepic4.jpg', alt: 'Stunning nail art', category: 'gelxset' },
    { src: '/Images/homeVid.mp4', alt: 'Nail art video', isVideo: true, category: 'gelxset' },
  ];
  // Numeric named images from main Images folder
  
  // Filter logic
  const filteredImages = activeFilter === 'all' 
  ? galleryImages 
  : galleryImages.filter(image => image.category === activeFilter);
  
  const filters = [
    { id: 'all', label: 'All Designs' },
    { id: 'solid', label: 'Solid' },
    { id: 'seasonal', label: 'Seasonal' },
    { id: 'gelxset', label: 'Gel X Set' },
    { id: 'gelmanicure', label: 'Gel Manicure' }
  ];

  return (
    <div className="min-h-screen bg-[#FAF4F2]">
      {/* Header Section */}
      <div className="flex justify-center flex-grow">
        <div className="text-center">
          <h1 className='text-[#2C2C2C] font-normal text-5xl md:text-7xl mt-14 mb-4' style={{ fontFamily: 'Cormorant Garamond, serif' }}>Gallery</h1>
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-[#D8A5B4] text-2xl">—————</span>
            <span className="text-[#D8A5B4]" style={{ fontFamily: 'Work Sans, sans-serif' }}>@nailxlauren</span>
            <span className="text-[#D8A5B4] text-2xl">—————</span>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="max-w-7xl mx-auto px-2 md:px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex justify-center relative">
          {/* Slide Indicator - Only visible on screens ≤420px, flashes for 3 seconds */}
          {showSlideIndicator && (
            <div className="max-[420px]:flex hidden items-center absolute -right-1 top-1/2 -translate-y-1/2 z-10 pointer-events-none transition-opacity duration-500">
              <div className="flex items-center gap-0.5 bg-[#D8A5B4]/70 backdrop-blur-sm rounded-full px-1.5 py-0.5 shadow-sm">
                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          )}
          <div className="flex gap-1.5 sm:gap-2 md:gap-3 bg-white/80 backdrop-blur-sm rounded-full p-1 sm:p-1.5 md:p-2 shadow-lg overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-200 whitespace-nowrap ${
                  activeFilter === filter.id
                    ? 'bg-[#D8A5B4] text-white shadow-md'
                    : 'text-[#2C2C2C] hover:bg-[#FAF4F2] hover:text-[#A56C82]'
                }`}
                style={{ fontFamily: 'Work Sans, sans-serif' }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((item, index) => (
            <div key={index} className="group relative aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {item.isVideo ? (
                <video
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  muted
                  loop
                  playsInline
                >
                  <source src={item.src} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              )}
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
