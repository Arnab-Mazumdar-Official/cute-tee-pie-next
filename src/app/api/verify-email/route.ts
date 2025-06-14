// /app/api/validate-email/route.ts

import arcjet, { validateEmail } from '@arcjet/next';
import { NextResponse } from 'next/server';

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    validateEmail({
      mode: 'LIVE',
      deny: ['DISPOSABLE', 'INVALID', 'NO_MX_RECORDS'],
    }),
  ],
});

export async function POST(req: Request) {
  try {
    console.log('verify started');

    const { email } = await req.json();
    console.log('email started', email);
    console.log('ARCJET_KEY from env:', process.env.ARCJET_KEY);
    const decision = await aj.protect(req, { email });
    console.log('decision started', decision);

    for (const result of decision.results) {
      console.log('Rule Result', result);

      if (result.reason.isEmail()) {
        console.log('Email rule', result);
      }
    }

    
    if (decision.isDenied()) {
      return NextResponse.json({ valid: false }, { status: 403 });
    }

    return NextResponse.json({ valid: true });
  } catch (err) {
    console.error('Arcjet validation error:', err);
    return NextResponse.json(
      { valid: false, error: 'Validation failed' },
      { status: 500 }
    );
  }
}
