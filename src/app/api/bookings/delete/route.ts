import { connectDB } from '@/lib/db';
import Booking from '@/Models/Booking';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const { bookingId, userId } = body;

    if (!bookingId || !userId) {
      return NextResponse.json(
        { success: false, message: 'Missing bookingId or userId' },
        { status: 400 }
      );
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    if (booking.userId.toString() !== userId) {
      return NextResponse.json(
        { success: false, message: 'Not authorized to cancel this booking' },
        { status: 403 }
      );
    }

    const now = new Date();
    const bookingStartTime = new Date(booking.startTime);
    if (bookingStartTime <= now) {
      return NextResponse.json(
        { success: false, message: 'Cannot cancel past bookings' },
        { status: 400 }
      );
    }

    await booking.deleteOne();
    return NextResponse.json({ success: true, message: 'Booking cancelled' });
  } catch (error) {
    console.error('Delete Booking Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
