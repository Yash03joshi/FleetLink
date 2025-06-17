import { connectDB } from '@/lib/db';
import Vehicle from '@/Models/Vehicle';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await connectDB();

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  const { name, capacityKg, tyres, image } = body || {};

  // Validation
  if (!name || typeof name !== 'string') {
    return NextResponse.json({ message: 'Name is required and must be a string' }, { status: 400 });
  }
  if (typeof capacityKg !== 'number' || capacityKg <= 0) {
    return NextResponse.json({ message: 'capacityKg must be a positive number' }, { status: 400 });
  }
  if (typeof tyres !== 'number' || tyres <= 0) {
    return NextResponse.json({ message: 'tyres must be a positive number' }, { status: 400 });
  }
  if (!image || typeof image !== 'string') {
    return NextResponse.json({ message: 'image is required and must be a string' }, { status: 400 });
  }

  try {
    const vehicle = await Vehicle.create({ name, capacityKg, tyres ,image });
    return NextResponse.json(vehicle, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Server error', error: (err as Error).message }, { status: 500 });
  }
}
