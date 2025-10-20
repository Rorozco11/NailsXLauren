import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

// Only create Supabase client if environment variables are available
const supabase = SUPABASE_URL && SUPABASE_SERVICE_KEY 
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
      auth: { persistSession: false },
    })
  : null;

// Services array to calculate pricing
const services = [
  { id: 'gelxset', name: 'Gel X Set', price: '$35' },
  { id: 'gel-manicure', name: 'Gel Manicure', price: '$20' },
  { id: 'fillwbuildergel', name: 'Fill W/ Builder Gel', price: '$30' },
  { id: 'tip-replacement', name: 'Tip Replacement', price: '$2' },
  { id: 'soak-off', name: 'Soak Off', price: '$7' },
  { id: 'french-tip', name: 'French Tip', price: '$5' },
  { id: 'chrome', name: 'Chrome', price: '$5' },
  { id: 'design', name: 'Design', price: '$15' },
  { id: 'gems', name: 'Gems', price: '$15' },
  { id: '3d', name: '3D', price: '$10' }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      fullName, 
      phoneNumber, 
      email, 
      selectedServices,
      preferredDate,
      preferredTime,
      message 
    } = body;

    // Validate required fields
    if (!fullName || !phoneNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter for Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDEREMAIL,
        pass: process.env.SENDERPASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SENDEREMAIL,
      to: process.env.SENDEREMAIL, // Send to Lauren's email
      subject: `New Booking Request from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FFB6C1;">New Booking Request - Nails X Lauren</h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Customer Information:</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Phone:</strong> ${phoneNumber}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            ${preferredDate ? `<p><strong>Preferred Date:</strong> ${preferredDate}</p>` : ''}
            ${preferredTime ? `<p><strong>Preferred Time:</strong> ${preferredTime}</p>` : ''}
            ${selectedServices && selectedServices.length > 0 ? `<p><strong>Selected Services:</strong> ${selectedServices.join(', ')}</p>` : ''}
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
          </div>
          
          <div style="background-color: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #666;">
              <strong>Request Time:</strong> ${new Date().toLocaleString()}
            </p>
            <p style="margin: 5px 0 0 0; color: #666;">
              <strong>Booking ID:</strong> BK-${Date.now()}
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #888; font-size: 14px;">
              This booking request was submitted through the Nails X Lauren website.
            </p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Calculate total price from selected services
    const totalPrice = selectedServices ? selectedServices.reduce((total: number, serviceId: string) => {
      const service = services.find(s => s.id === serviceId);
      if (service) {
        const price = parseInt(service.price.replace(/[^0-9]/g, ''));
        return total + price;
      }
      return total;
    }, 0) : null;

    // Save booking to Supabase database with proper field mapping
    let dbError = null;
    if (supabase) {
      const { error } = await supabase
        .from('bookings')
        .insert([
          {
            // API field -> Supabase field mapping
            full_name: fullName,                    // fullName -> full_name
            phone_number: phoneNumber,              // phoneNumber -> phone_number  
            email: email || null,                   // email -> email
            preferred_date: preferredDate || null,  // preferredDate -> preferred_date
            preferred_time: preferredTime || null,  // preferredTime -> preferred_time
            message: message || null,               // message -> message
            init_price: totalPrice,                 // calculated totalPrice -> init_price
            // Note: id and created_on are auto-generated by Supabase
            // selectedServices array could be stored as JSON in a separate field if needed
          }
        ])
        .select();
      
      dbError = error;
      if (dbError) {
        console.error('Database error:', dbError);
        // Don't fail the request if DB save fails, email was still sent
      }
    } else {
      console.warn('Supabase not configured - booking not saved to database');
    }

    // Log the booking request
    console.log('New booking request sent:', {
      fullName,
      phoneNumber,
      email,
      selectedServices,
      preferredDate,
      preferredTime,
      message,
      totalPrice,
      timestamp: new Date().toISOString(),
      bookingId: `BK-${Date.now()}`,
      dbSaved: !dbError
    });

    return NextResponse.json(
      { 
        message: 'Booking request sent successfully! Lauren has been notified.',
        bookingId: `BK-${Date.now()}`
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing booking request:', error);
    return NextResponse.json(
      { error: 'Failed to send booking request. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
