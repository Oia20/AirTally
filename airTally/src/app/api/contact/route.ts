import { NextResponse } from 'next/server';

const FORMBEE_API_KEY = process.env.FORMBEE_API_KEY;

if (!FORMBEE_API_KEY) {
  throw new Error('FORMBEE_API_KEY is not defined');
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    
    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      );
    }

    const formData = {
      name: name || 'Anonymous',
      email: email,
      message: message,
    };

    console.log('Sending to FormBee:', formData);

    const formBeeResponse = await fetch(`https://api.formbee.dev/formbee/${FORMBEE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const responseText = await formBeeResponse.text();
    console.log('FormBee Response Status:', formBeeResponse.status);
    console.log('FormBee Response Headers:', Object.fromEntries(formBeeResponse.headers.entries()));
    console.log('FormBee Response Body:', responseText);

    if (!formBeeResponse.ok) {
      return NextResponse.json(
        { error: `FormBee API error: ${responseText}` },
        { status: formBeeResponse.status }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send message' },
      { status: 500 }
    );
  }
}
