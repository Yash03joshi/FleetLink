import { connectDB } from '@/lib/db';
import Booking from '@/Models/Booking';
import VehicleModel from '@/Models/Vehicle';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

mongoose.modelNames().includes('Vehicle') || mongoose.model('Vehicle', VehicleModel.schema);

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { success: false, message: 'userId is required' },
      { status: 400 }
    );
  }

  try {
    const bookings = await Booking.find({ userId }).populate('vehicleId');
    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error('Get Bookings Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
