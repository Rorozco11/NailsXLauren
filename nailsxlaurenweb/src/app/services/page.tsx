export default function Services() {
  return (
    <>
      <div className="flex justify-center flex-grow">
        <div className="text-center">
          <p className='text-[#FFB6C1] font-arima font-semibold text-7xl mt-14 mb-4'> Price List </p>
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-[#FFB6C1] text-2xl">—————</span>
            <span className="text-[#FFB6C1] font-arima">@nailxlauren</span>
            <span className="text-[#FFB6C1] text-2xl">—————</span>
          </div>
        </div>
      </div>

      {/* Price List Section */}
      <div className="max-w-2xl mx-auto px-4">
        {/* Main Services */}
        <div className="mb-8">
          <div className="flex justify-between items-center py-2 border-b border-pink-200">
            <span className="font-arima text-lg">Gel X Set</span>
            <span className="font-arima text-lg">$35</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-pink-200">
            <span className="font-arima text-lg">Gel Manicure</span>
            <span className="font-arima text-lg">$20</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-pink-200">
            <span className="font-arima text-lg">Fill W/ Builder Gel</span>
            <span className="font-arima text-lg">$30</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-pink-200">
            <span className="font-arima text-lg">Tip Replacement</span>
            <span className="font-arima text-lg">$2</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-pink-200">
            <span className="font-arima text-lg">Soak Off</span>
            <span className="font-arima text-lg">$7</span>
          </div>
        </div>

        {/* Add Ons Section */}
        <div className="mt-12 mb-8">
          <h2 className="text-[#FFB6C1] text-2xl font-arima mb-4">Add Ons (Prices May Vary)</h2>
          <div className="flex justify-between items-center py-2 border-b border-pink-200">
            <span className="font-arima text-lg">French Tip</span>
            <span className="font-arima text-lg">$5</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-pink-200">
            <span className="font-arima text-lg">Chrome</span>
            <span className="font-arima text-lg">$5</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-pink-200">
            <span className="font-arima text-lg">Design</span>
            <span className="font-arima text-lg">$5-$15</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-pink-200">
            <span className="font-arima text-lg">Gems</span>
            <span className="font-arima text-lg">$2-$15</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-pink-200">
            <span className="font-arima text-lg">3D</span>
            <span className="font-arima text-lg">$5-$10</span>
          </div>
        </div>
      </div>
    </>
  );
}
