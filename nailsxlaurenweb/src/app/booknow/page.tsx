'use client';

import { useState, useEffect, useRef } from 'react';

interface Service {
  id: string;
  name: string;
  price: string;
  minPrice: number;
  maxPrice: number;
  description: string;
  category?: string;
}

const services: Service[] = [
    {
      id: 'gelxset',
      name: 'Gel X Set',
      price: '$40',
      minPrice: 40,
      maxPrice: 40,
      description: 'Full set with Gel X extensions'
    },
    {
      id: 'gel-manicure',
      name: 'Gel Manicure',
      price: '$25',
      minPrice: 25,
      maxPrice: 25,
      description: 'Long-lasting gel polish with UV curing'
    },
  {
    id: 'soak-off',
    name: 'Soak Off',
    price: '$5-$8',
    minPrice: 5,
    maxPrice: 8,
    description: 'Remove existing gel polish safely'
  },
  {
    id: 'french-tip',
    name: 'French Tip',
    price: '$5',
    minPrice: 5,
    maxPrice: 5,
    description: 'Classic French tip design',
    category: 'addon'
  },
  {
    id: 'chrome',
    name: 'Chrome',
    price: '$3',
    minPrice: 3,
    maxPrice: 3,
    description: 'Metallic chrome finish',
    category: 'addon'
  },
  {
    id: 'design',
    name: 'Design',
    price: '$5-$15',
    minPrice: 5,
    maxPrice: 15,
    description: 'Custom nail art designs ',
    category: 'addon'
  },
  {
    id: 'gems',
    name: 'Gems',
    price: '$2-$10',
    minPrice: 2,
    maxPrice: 10,
    description: 'Decorative gems and stones ',
    category: 'addon'
  },
  {
    id: '3d',
    name: '3D',
    price: '$5-$10',
    minPrice: 5,
    maxPrice: 10,
    description: '3D nail art elements ',
    category: 'addon'
  }
];

export default function BookNow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    selectedServices: [] as string[],
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const statusMessageRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to status message when it appears
  useEffect(() => {
    if (statusMessage && statusMessageRef.current) {
      statusMessageRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }, [statusMessage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(id => id !== serviceId)
        : [...prev.selectedServices, serviceId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage('Booking request sent successfully! Lauren will contact you soon to confirm your appointment.');
        setFormData({
          fullName: '',
          phoneNumber: '',
          email: '',
          selectedServices: [],
          preferredDate: '',
          preferredTime: '',
          message: ''
        });
        setCurrentStep(1);
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

  const scrollToFormTop = () => {
    if (formContainerRef.current) {
      const elementTop = formContainerRef.current.offsetTop;
      // Dynamic header height based on screen size
      const headerHeight = window.innerWidth < 768 ? 100 : 120;
      const scrollPosition = elementTop - headerHeight;
      
      // Check if smooth scrolling is supported
      const supportsSmoothScroll = 'scrollBehavior' in document.documentElement.style;
      
      if (supportsSmoothScroll) {
        // Use requestAnimationFrame for better performance
        requestAnimationFrame(() => {
          window.scrollTo({
            top: Math.max(0, scrollPosition),
            behavior: 'smooth'
          });
        });
      } else {
        // Fallback for older browsers
        window.scrollTo(0, Math.max(0, scrollPosition));
      }
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      // Scroll to top of form container with delay to ensure DOM update
      setTimeout(scrollToFormTop, 150);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Scroll to top of form container with delay to ensure DOM update
      setTimeout(scrollToFormTop, 150);
    }
  };

  const priceRange = formData.selectedServices.reduce((range, serviceId) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      return {
        min: range.min + service.minPrice,
        max: range.max + service.maxPrice
      };
    }
    return range;
  }, {min: 0, max: 0});

  const hasRange = priceRange.min !== priceRange.max;
  const totalPrice = hasRange ? `$${priceRange.min}-$${priceRange.max}` : `$${priceRange.min}`;

  return (
    <div className="min-h-screen bg-[#FAF4F2]">
      {/* Header */}
      <div className="bg-[#FAF4F2] shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-normal text-[#2C2C2C] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Book Your Appointment
            </h1>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step 
                  ? 'bg-[#D8A5B4] text-white' 
                  : 'bg-[#E7E2E0] text-[#2C2C2C]'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  currentStep > step ? 'bg-[#D8A5B4]' : 'bg-[#E7E2E0]'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center text-sm text-[#2C2C2C] mb-8">
          <span className={currentStep === 1 ? 'text-[#A56C82] font-medium' : ''}>Services</span>
          <span className="mx-4">•</span>
          <span className={currentStep === 2 ? 'text-[#A56C82] font-medium' : ''}>Details</span>
          <span className="mx-4">•</span>
          <span className={currentStep === 3 ? 'text-[#A56C82] font-medium' : ''}>Confirm</span>
        </div>
      </div>

      {/* Status Message - Global */}
      {statusMessage && (
        <div ref={statusMessageRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className={`text-center p-6 rounded-xl shadow-lg border-2 ${
            statusMessage.includes('successfully') 
              ? 'bg-green-50 text-green-800 border-green-200' 
              : 'bg-red-50 text-red-800 border-red-200'
          }`}>
            <div className="flex items-center justify-center mb-2">
              {statusMessage.includes('successfully') ? (
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
              <h3 className="text-lg font-medium">
                {statusMessage.includes('successfully') ? 'Success!' : 'Error'}
              </h3>
            </div>
            <p className="text-base">{statusMessage}</p>
          </div>
        </div>
      )}

      {/* Form Container */}
      <div ref={formContainerRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <div className="p-8">
                <h2 className="text-3xl font-normal text-[#2C2C2C] mb-6 text-center" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Choose Your Services</h2>
                
                {/* Main Services */}
                <div className="mb-8">
                  <h3 className="text-xl font-normal text-[#2C2C2C] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Main Services</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.filter(service => !service.category).map((service) => (
                      <div
                        key={service.id}
                        className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          formData.selectedServices.includes(service.id)
                            ? 'border-[#D8A5B4] bg-[#FAF4F2] shadow-lg'
                            : 'border-[#E7E2E0] hover:border-[#A56C82] hover:shadow-md'
                        }`}
                        onClick={() => handleServiceToggle(service.id)}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-medium text-[#2C2C2C]" style={{ fontFamily: 'Work Sans, sans-serif' }}>{service.name}</h3>
                          <div className="text-right">
                            <div className="text-2xl font-medium text-[#A56C82]" style={{ fontFamily: 'Work Sans, sans-serif' }}>{service.price}</div>
                            {service.minPrice !== service.maxPrice && (
                              <div className="text-xs text-[#A56C82] opacity-75" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                                Price varies
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-[#2C2C2C]" style={{ fontFamily: 'Work Sans, sans-serif' }}>{service.description}</p>
                        <div className="mt-4 flex items-center">
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                            formData.selectedServices.includes(service.id)
                              ? 'border-[#D8A5B4] bg-[#D8A5B4]'
                              : 'border-[#E7E2E0]'
                          }`}>
                            {formData.selectedServices.includes(service.id) && (
                              <div className="w-full h-full rounded-full bg-white scale-50"></div>
                            )}
                          </div>
                          <span className="text-sm text-[#2C2C2C]">Select this service</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add-ons */}
                <div>
                  <h3 className="text-xl font-normal text-[#2C2C2C] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Add-ons (Prices May Vary)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.filter(service => service.category === 'addon').map((service) => (
                      <div
                        key={service.id}
                        className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                          formData.selectedServices.includes(service.id)
                            ? 'border-[#A56C82] bg-[#FAF4F2] shadow-lg'
                            : 'border-[#E7E2E0] hover:border-[#A56C82] hover:shadow-md'
                        }`}
                        onClick={() => handleServiceToggle(service.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-medium text-[#2C2C2C]" style={{ fontFamily: 'Work Sans, sans-serif' }}>{service.name}</h3>
                          <div className="text-right">
                            <div className="text-lg font-medium text-[#A56C82]" style={{ fontFamily: 'Work Sans, sans-serif' }}>{service.price}</div>
                            {service.minPrice !== service.maxPrice && (
                              <div className="text-xs text-[#A56C82] opacity-75" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                                Price varies
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-[#2C2C2C] mb-3" style={{ fontFamily: 'Work Sans, sans-serif' }}>{service.description}</p>
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full border-2 mr-2 ${
                            formData.selectedServices.includes(service.id)
                              ? 'border-[#A56C82] bg-[#A56C82]'
                              : 'border-[#E7E2E0]'
                          }`}>
                            {formData.selectedServices.includes(service.id) && (
                              <div className="w-full h-full rounded-full bg-white scale-50"></div>
                            )}
                          </div>
                          <span className="text-xs text-[#2C2C2C]">Add to service</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end mt-8">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={formData.selectedServices.length === 0}
                    className="px-8 py-3 bg-[#D8A5B4] text-white font-medium rounded-full hover:bg-[#A56C82] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    style={{ fontFamily: 'Work Sans, sans-serif' }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Personal Details */}
            {currentStep === 2 && (
              <div className="p-8">
                <h2 className="text-3xl font-bold text-[#2C2C2C] mb-6 text-center">Your Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                      Full Name <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
                      className="w-full px-4 py-3 border border-[#E7E2E0] rounded-lg focus:ring-2 focus:ring-[#A56C82] focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
            />
          </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
            <input 
              type="tel" 
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
                      className="w-full px-4 py-3 border border-[#E7E2E0] rounded-lg focus:ring-2 focus:ring-[#A56C82] focus:border-transparent transition-all duration-200"
                      placeholder="(555) 123-4567"
            />
          </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                      Email Address
                    </label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#E7E2E0] rounded-lg focus:ring-2 focus:ring-[#A56C82] focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com (optional)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-[#E7E2E0] rounded-lg focus:ring-2 focus:ring-[#A56C82] focus:border-transparent transition-all duration-200"
            />
          </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                      Preferred Time
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#E7E2E0] rounded-lg focus:ring-2 focus:ring-[#A56C82] focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select a time</option>
                      <option value="7:00 AM">7:00 AM</option>
                      <option value="8:00 AM">8:00 AM</option>
                      <option value="9:00 AM">9:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                      <option value="5:00 PM">5:00 PM</option>
                      <option value="6:00 PM">6:00 PM</option>
                      <option value="7:00 PM">7:00 PM</option>
                      <option value="8:00 PM">8:00 PM</option>
                      <option value="9:00 PM">9:00 PM</option>
                      <option value="10:00 PM">10:00 PM</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                      Special Requests or Notes
                    </label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-[#E7E2E0] rounded-lg focus:ring-2 focus:ring-[#A56C82] focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Any specific nail art ideas, allergies, or special requests?"
            />
          </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 border-2 border-[#E7E2E0] text-[#2C2C2C] font-medium rounded-full hover:border-[#A56C82] transition-all duration-200 text-sm sm:text-base"
                    style={{ fontFamily: 'Work Sans, sans-serif' }}
                  >
                    Back to Services
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.fullName || !formData.phoneNumber}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-[#D8A5B4] text-white font-medium rounded-full hover:bg-[#A56C82] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm sm:text-base"
                    style={{ fontFamily: 'Work Sans, sans-serif' }}
                  >
                    Next
                  </button>
                </div>
            </div>
          )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="p-8">
                <h2 className="text-3xl font-normal text-[#2C2C2C] mb-6 text-center" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Confirm Your Booking</h2>
                
                {/* Selected Services */}
                <div className="bg-[#FAF4F2] rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-normal text-[#2C2C2C] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Selected Services</h3>
                  {formData.selectedServices.map((serviceId) => {
                    const service = services.find(s => s.id === serviceId);
                    return service ? (
                      <div key={serviceId} className="flex justify-between items-center py-3 border-b border-[#E7E2E0] last:border-b-0">
                        <div>
                          <h4 className="font-medium text-[#2C2C2C]" style={{ fontFamily: 'Work Sans, sans-serif' }}>{service.name}</h4>
                          <p className="text-sm text-[#2C2C2C]" style={{ fontFamily: 'Work Sans, sans-serif' }}>{service.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-[#A56C82]" style={{ fontFamily: 'Work Sans, sans-serif' }}>{service.price}</div>
                        </div>
                      </div>
                    ) : null;
                  })}
                  <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-[#E7E2E0]">
                    <span className="text-xl font-bold text-[#2C2C2C]">Total</span>
                    <span className="text-2xl font-bold text-[#A56C82]">{totalPrice}</span>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-[#FAF4F2] rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-medium text-[#2C2C2C] mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-[#2C2C2C]">Name:</span>
                      <p className="font-medium text-[#2C2C2C]">{formData.fullName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-[#2C2C2C]">Phone:</span>
                      <p className="font-medium text-[#2C2C2C]">{formData.phoneNumber}</p>
                    </div>
                    <div>
                      <span className="text-sm text-[#2C2C2C]">Email:</span>
                      <p className="font-medium text-[#2C2C2C]">{formData.email || 'Not provided'}</p>
                    </div>
                    <div>
                      <span className="text-sm text-[#2C2C2C]">Preferred Time:</span>
                      <p className="font-medium text-[#2C2C2C]">
                        {formData.preferredDate && formData.preferredTime 
                          ? `${formData.preferredDate} at ${formData.preferredTime}`
                          : 'To be confirmed'
                        }
                      </p>
                    </div>
                  </div>
                  {formData.message && (
                    <div className="mt-4">
                      <span className="text-sm text-[#2C2C2C]">Special Requests:</span>
                      <p className="font-medium text-[#2C2C2C]">{formData.message}</p>
                    </div>
                  )}
          </div>

                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 border-2 border-[#E7E2E0] text-[#2C2C2C] font-medium rounded-full hover:border-[#A56C82] transition-all duration-200 text-sm sm:text-base"
                    style={{ fontFamily: 'Work Sans, sans-serif' }}
                  >
                    Back to Details
                  </button>
          <button 
            type="submit" 
            disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-[#D8A5B4] text-white font-bold text-base sm:text-lg rounded-full hover:bg-[#A56C82] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    style={{ fontFamily: 'Work Sans, sans-serif' }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                        <span className="text-sm sm:text-base">Sending Request...</span>
                      </div>
                    ) : (
                      'Book My Appointment'
                    )}
          </button>
                </div>
              </div>
            )}
        </form>
        </div>

      </div>
    </div>
  );
}
