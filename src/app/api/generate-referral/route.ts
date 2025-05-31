import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../db/dbConnect';
import { Types } from 'mongoose';
import users from '../../../../models/users';

// Function to generate a random alphanumeric referral code
function generateReferralCode(length = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Request body:', body);

    const { userId, referral_payment_method } = body;
    console.log('userId:', userId);
    console.log('referral_payment_method:', referral_payment_method);
    const paymentMethodToSave = referral_payment_method.referral_payment_method || referral_payment_method;


    // Validate input
    if (!userId || !Types.ObjectId.isValid(userId)) {
      console.log('Invalid or missing userId');
      return NextResponse.json({ error: 'Invalid or missing userId' }, { status: 400 });
    }

    if (!referral_payment_method) {
      console.log('Missing referral_payment_method');
      return NextResponse.json({ error: 'Missing referral_payment_method' }, { status: 400 });
    }

    await dbConnect();

    // Generate a unique referral code
    let unique = false;
    let referralCode = '';

    while (!unique) {
      referralCode = generateReferralCode();
      console.log('Generated referralCode:', referralCode);

      const existingUser = await users.findOne({ referralCode });
      if (!existingUser) {
        unique = true;
      }
    }

    // Correct the update to use referral_payment_method as is
    const updateResult = await users.updateOne(
      { _id: new Types.ObjectId(userId) },
      { $set: { referralCode, referral_payment_method:paymentMethodToSave  } }
    );

    console.log('Update result:', updateResult);

    if (updateResult.modifiedCount === 0) {
      console.log('User not found or nothing updated');
      return NextResponse.json({ error: 'User not found or nothing updated' }, { status: 404 });
    }

    return NextResponse.json({ referralCode });

  } catch (error) {
    console.error('Error generating referral code:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}


