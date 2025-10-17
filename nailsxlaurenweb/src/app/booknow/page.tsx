'use client';

import { useState } from 'react';

export default function BookNow() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    try {
      // Send data to the API
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage('Booking request sent successfully! NailsXLauren has been notified!');
        setFormData({
          fullName: '',
          phoneNumber: '',
          email: '',
          message: ''
        });
      } else {
        setStatusMessage('There was an error sending your booking request. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      setStatusMessage('There was an error sending your booking request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex justify-center lg:mt-8 lg:mb-8">
        <p className='text-[#FFB6C1] font-arima font-semibold text-7xl mt-14 mb-4'> Book Now </p>
      </div>

      {/* Form */}
      <div className="flex justify-center mt-10">
        <form className="flex flex-col w-[400px] gap-4" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="flex flex-col gap-2">
            <label className="text-lg">
              Name <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="border-2 border-gray-200 rounded-sm p-2 h-[40px]" 
              placeholder="John Doe"
            />
          </div>

          {/* Phone Number Input */}
          <div className="flex flex-col gap-2">
            <label className="text-lg">Phone Number <span className="text-red-500">*</span></label>
            <input 
              type="tel" 
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              className="border-2 border-gray-200 rounded-sm p-2 h-[40px]" 
              placeholder="111-111-1111"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label className="text-lg">Email <span className="text-red-500">*</span></label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="border-2 border-gray-200 rounded-sm p-2 h-[40px]" 
              placeholder="Johndoe@gmail.com"
            />
          </div>

          {/* Message Input */}
          <div className="flex flex-col gap-2">
            <label className="text-lg">Message</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="border-2 border-gray-200 rounded-sm p-2 h-[120px] resize-none" 
              placeholder="What do you want done?"
            />
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div className={`text-center p-3 rounded-lg mt-2 ${
              statusMessage.includes('successfully') 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {statusMessage}
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-[#A25B7C] text-white rounded-lg py-3 mt-4 text-lg hover:bg-[#8A4B69] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
}
