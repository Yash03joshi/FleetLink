import { connectDB } from '@/lib/db';
import Vehicle from '@/Models/Vehicle';
import Booking from '@/Models/Booking';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const capacityRequired = Number(searchParams.get('capacityRequired'));
  const fromPincode = searchParams.get('fromPincode');
  const toPincode = searchParams.get('toPincode');
  const startTimeRaw = searchParams.get('startTime');

  if (!capacityRequired || !fromPincode || !toPincode || !startTimeRaw) {
    return NextResponse.json({ message: 'Missing query parameters',succcess:false }, { status: 400 });
  }

  const startTime = new Date(startTimeRaw);
  const estimatedRideDurationHours =
  Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24;

  const endTime = new Date(startTime);
  endTime.setHours(endTime.getHours() + estimatedRideDurationHours);

  try {
    // Step 1: Fetch all vehicles that meet capacity requirement
    const vehicles = await Vehicle.find({ capacityKg: { $gte: capacityRequired } });

    // Step 2: Find all bookings that overlap with requested time
    const bookedVehicleIds = await Booking.find({
      startTime: { $lt: endTime },
      bookingEndTime: { $gt: startTime },
    }).distinct('vehicleId');

    const bookedVehicleIdsStr = bookedVehicleIds.map(id => id.toString());

    const availableVehicles = vehicles.filter(
      (v) => !bookedVehicleIdsStr.includes(v._id.toString())
    );

    return NextResponse.json({
      success:true,
      estimatedRideDurationHours,
      availableVehicles,
    }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ message: 'Server error',success:false, error: (err as Error).message }, { status: 500 });
  }
}
