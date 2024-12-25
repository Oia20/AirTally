import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = process.env.FORMBEE_API_KEY;
  
  try {
    const response = await fetch(`https://api.formbee.dev/challenge/${API_KEY}`);
    const challenge = await response.json();
    return NextResponse.json(challenge);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch challenge' }, { status: 500 });
  }
} 