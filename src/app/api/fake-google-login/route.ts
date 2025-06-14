import dbConnect from '../../../../db/dbConnect';
import User from '../../../../models/users';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    await dbConnect();

    let user = await User.findOne({ email });

    if (!user) {
      const admin_password = await hashPassword('p@ss1234');

      user = await User.create({
        name: email.split('@')[0],
        email,
        role: 'is_customer',
        admin_password,
      });
    }

    // Convert to plain object and exclude unwanted fields
    const userObj = user.toObject();
    const {
      password,
      admin_password,
      email: _email,
      phone,
      address,
      referral_payment_method,
      ...filteredUser
    } = userObj;

    return NextResponse.json(filteredUser, { status: 200 });
  } catch (error) {
    console.error('Fake Google login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

