import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiting (for production, use Redis/Vercel KV)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. HONEYPOT CHECK - reject if hidden field is filled
    if (body.website) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
    }

    // 2. TIMING CHECK - reject if submitted too quickly (< 3 seconds)
    const submissionTime = Date.now() - body.formOpenTime;
    if (submissionTime < 3000) {
      return NextResponse.json({ error: 'Too fast' }, { status: 429 });
    }

    // 3. TURNSTILE VERIFICATION - verify token with Cloudflare
    const turnstileResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: body.captchaToken,
        }),
      }
    );

    const turnstileData = await turnstileResponse.json();
    if (!turnstileData.success) {
      return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
    }

    // 4. RATE LIMITING - max 3 submissions per IP per 60 seconds
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const limit = rateLimitMap.get(ip);

    if (limit && limit.resetTime > now) {
      if (limit.count >= 3) {
        return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
      }
      limit.count++;
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
    }

    // 5. SEND EMAIL - using EmailJS server-side API
    const emailData = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params: {
        from_name: `${body.firstName} ${body.lastName}`,
        from_email: body.email,
        phone: body.phone || 'Not provided',
        message: body.message,
        to_email: 'office@fulkrums.com',
      },
    };

    const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailData),
    });

    if (!emailResponse.ok) {
      throw new Error('Email send failed');
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
