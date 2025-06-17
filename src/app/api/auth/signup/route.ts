import { connectDB } from '@/lib/db';
import User from '@/Models/users';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: NextRequest) {
  await connectDB();
 let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  const { name, email, password, role } = body || {};

  // Basic validation
  if (!name || !email || !password) {
    return NextResponse.json({ message: 'Name, email, and password are required' }, { status: 400 });
  }
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  const user = await User.create({ name, email, password: password, role });

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  

  return NextResponse.json({
    message: 'User created',
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  }, { status: 201 });
}
