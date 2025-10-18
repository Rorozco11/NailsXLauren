import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, phoneNumber, email, message } = body;

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

    // Log the booking request
    console.log('New booking request sent:', {
      fullName,
      phoneNumber,
      email,
      message,
      timestamp: new Date().toISOString(),
      bookingId: `BK-${Date.now()}`
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
