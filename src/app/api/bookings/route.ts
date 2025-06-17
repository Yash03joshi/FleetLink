import { connectDB } from '@/lib/db';
import Vehicle from '@/Models/Vehicle';
import Booking from '@/Models/Booking';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await connectDB();

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  const { vehicleId, fromPincode, toPincode, startTime, customerId } = body;

  if (!vehicleId || !fromPincode || !toPincode || !startTime || !customerId) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  // Check if vehicle exists
  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) {
    return NextResponse.json({ message: 'Vehicle not found' }, { status: 404 });
  }

  const parsedStartTime = new Date(startTime);
  const estimatedRideDurationHours = calculateEstimatedRideDurationHours(fromPincode, toPincode);

  const bookingEndTime = new Date(parsedStartTime);
  bookingEndTime.setHours(bookingEndTime.getHours() + estimatedRideDurationHours);

  // Check for overlapping bookings
  const conflict = await Booking.exists({
    vehicleId,
    startTime: { $lt: bookingEndTime },
    bookingEndTime: { $gt: parsedStartTime }
  });

  if (conflict) {
    return NextResponse.json({ message: 'Vehicle already booked in this time slot' }, { status: 409 });
  }

  try {
    const booking = await Booking.create({
      vehicleId,
      fromPincode,
      toPincode,
      startTime: parsedStartTime,
      bookingEndTime,
      estimatedRideDurationHours,
      userId: customerId,
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Server error', error: (err as Error).message }, { status: 500 });
  }
}


export function calculateEstimatedRideDurationHours(fromPincode: string, toPincode: string): number {
  const from = parseInt(fromPincode);
  const to = parseInt(toPincode);

//   if (isNaN(from) || isNaN(to)) return 0;
    console.log(fromPincode,toPincode);
    
  return Math.abs(to - from) % 24;
}
