import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Main Title */}
      <div className="flex justify-center lg:mt-8 lg:mb-8">
        <p className='font-imperial lg:text-7xl text-5xl text-[#FFB6C1]'> Nails X Lauren </p>
      </div>

      <div className="relative mt-5 flex justify-between items-center">
        {/* Left Image */}
        <Image 
          src="/Images/certIcon.png"
          alt="Nails X Lauren Logo" 
          width={400}
          height={400}
          className="hidden md:block w-1/4 h-[400px] object-contain"
        />

        {/* Center Image */}
        <div className="relative w-full md:w-2/4">
          <Image 
            src="/Images/HomePage1.jpeg" 
            alt="Beautiful nail art showcase" 
            width={600}
            height={400}
            className="w-full h-[400px] object-contain z-10"
          />
          <div className="absolute inset-x-0 bottom-3 flex justify-center items-center">
            <Link href="/booknow" className="btn-bookNowCenter z-20"> BOOK NOW </Link>
          </div>
        </div>

        {/* Right Image */}
        <Image 
          src="/Images/HomePage3.jpeg" 
          alt="Nails X Lauren Logo" 
          width={400}
          height={400}
          className="hidden md:block w-1/4 h-[400px] object-contain"
        />
      </div>
    </>
  );
}
