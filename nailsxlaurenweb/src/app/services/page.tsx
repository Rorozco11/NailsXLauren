import Image from 'next/image';

export default function Services() {
  const mainServices = [
    {
      name: "Gel X Set",
      price: "$40",
      description: "Full set with gel extensions for long-lasting, beautiful nails",
      image: "/Images/gelxset.jpg"
    },
    {
      name: "Gel Manicure",
      price: "$25",
      description: "Classic gel manicure for natural nail enhancement",
      image: "/Images/reg.jpg"
    },
    {
      name: "Tip Replacement",
      price: "$2",
      description: "Quick tip repair for damaged extensions",
      image: "/Images/laurenphoto.jpeg"
    },
    {
      name: "Soak Off",
      price: "$5",
      description: "Gentle removal of gel polish and extensions",
      image: "/Images/soakoff.jpg"
    }
  ];

  const addOns = [
    {
      name: "French Tip",
      price: "$5",
      description: "Classic white tip design"
    },
    {
      name: "Chrome",
      price: "$3",
      description: "Metallic chrome finish"
    },
    {
      name: "Design",
      price: "$5-$15",
      description: "Custom nail art and designs"
    },
    {
      name: "Gems",
      price: "$2-$10",
      description: "Beautiful gemstone accents"
    },
    {
      name: "3D",
      price: "$5-$10",
      description: "Three-dimensional nail art"
    }
  ];

  return (
    <>
      {/* Header Section */}
      <div className="flex justify-center flex-grow">
        <div className="text-center">
          <h1 className='text-[#2C2C2C] font-normal text-5xl md:text-7xl mt-14 mb-4' style={{ fontFamily: 'Cormorant Garamond, serif' }}>Our Services</h1>
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-[#D8A5B4] text-2xl">—————</span>
            <span className="text-[#D8A5B4]" style={{ fontFamily: 'Work Sans, sans-serif' }}>@nailxlauren</span>
            <span className="text-[#D8A5B4] text-2xl">—————</span>
          </div>
        </div>
      </div>

      {/* Main Services Grid */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-[#2C2C2C] text-3xl font-normal text-center mb-8" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Main Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainServices.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={service.image || "/Images/laurenphoto.jpeg"}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-medium mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {service.name}
                  </h3>
                  <p className="text-[#D8A5B4] text-lg font-semibold" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                    {service.price}
                    {service.price.includes('-') && (
                      <span className="text-xs text-[#D8A5B4] opacity-75 ml-1">(varies)</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[#2C2C2C] text-sm leading-relaxed" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Ons Section */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-[#2C2C2C] text-3xl font-normal text-center mb-8" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Add Ons</h2>
        <p className="text-[#2C2C2C] text-center mb-8 font-medium" style={{ fontFamily: 'Work Sans, sans-serif' }}>
          Prices may vary based on complexity
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addOns.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/Images/laurenphoto.jpeg"
                  alt={service.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-medium mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {service.name}
                  </h3>
                  <p className="text-[#D8A5B4] text-lg font-semibold" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                    {service.price}
                    {service.price.includes('-') && (
                      <span className="text-xs text-[#D8A5B4] opacity-75 ml-1">(varies)</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[#2C2C2C] text-sm leading-relaxed" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
}
