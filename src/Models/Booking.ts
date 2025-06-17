import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  vehicleId: mongoose.Types.ObjectId;
  fromPincode: string;
  toPincode: string;
  startTime: Date;
  bookingEndTime: Date;
  estimatedRideDurationHours: number;
  userId: mongoose.Types.ObjectId;
}

const bookingSchema = new Schema<IBooking>(
  {
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    fromPincode: { type: String, required: true },
    toPincode: { type: String, required: true },
    startTime: { type: Date, required: true },
    bookingEndTime: { type: Date, required: true },
    estimatedRideDurationHours: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);
