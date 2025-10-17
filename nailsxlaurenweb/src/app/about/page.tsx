import Image from 'next/image';

export default function About() {
  return (
    <>
      <div className="flex justify-center lg:mt-8 lg:mb-8">
        <p className='text-[#FFB6C1] font-arima font-semibold text-7xl mt-14 mb-4'> About </p>
      </div>

      {/* Add circular image */}
      <div className="flex justify-center mb-8">
        <div className="w-64 h-64 rounded-full overflow-hidden">
          <Image 
            src="/Images/actualLogo.jpeg" 
            alt="About section image" 
            width={256}
            height={256}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="max-w-3xl px-4">
          <p className="text-center black font-arima text-lg leading-relaxed">
            This website combines a pink and blue color palette with floral patterns to highlight its spa&apos;s interior
            style. It includes a blog section featuring beauty tips and service-related content, enhancing the
            brand&apos;s presence and engagement. This website combines a pink and blue color palette with floral
            patterns to highlight its spa&apos;s interior style. It includes a blog section featuring beauty tips and
            service-related content, enhancing the brand&apos;s presence and engagement. This website combines a pink and
            blue color palette with floral patterns to highlight its spa&apos;s interior style. It includes a blog
            section featuring beauty tips and service-related content, enhancing the brand&apos;s presence and
            engagement.
          </p>
        </div>
      </div>
    </>
  );
}
