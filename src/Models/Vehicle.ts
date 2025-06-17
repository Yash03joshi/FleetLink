import mongoose, { Schema, Document } from 'mongoose';

export interface IVehicle extends Document {
  name: string;
  capacityKg: number;
  tyres: number;
  image: string;
}

const vehicleSchema = new Schema<IVehicle>({
  name: { type: String, required: true },
  capacityKg: { type: Number, required: true },
  tyres: { type: Number, required: true },
  image: { type: String }, // optional, URL to vehicle image
}, { timestamps: true });


export default mongoose.models.Vehicle || mongoose.model<IVehicle>('Vehicle', vehicleSchema);
