'use client';

import React from 'react';
import DeleteBookingPopup from './DeleteBoookingPopup';

type VehicleCardProps = {
  image: string;
  name: string;
  capacityKg: number;
  tyres: number;
  id:string;
  fromPincode:string;
  toPincode:string;
  startTime:string;
};

export default function VehicleCard({ image, name, capacityKg, tyres,id , fromPincode,toPincode,startTime }: VehicleCardProps) {
    const onBook = ()=>{
        // console.log(id);
        
    }
  return (
    <div className="bg-white w-[32%]  shadow rounded-lg mb-6 overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-contain"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold">{name}</h3>
        <p><strong>Capacity:</strong> {capacityKg} Kg</p>
        <p><strong>Tyres:</strong> {tyres}</p>
        <p><strong>From Pin Code:</strong> {fromPincode}</p>
        <p><strong>To Pin Code:</strong> {toPincode}</p>
        <p><strong>Booking Time:</strong> {startTime}</p>
        {/* <BookVehiclePopUp name={name} image={image} capacityKg={capacityKg} tyres={tyres} vehicleId={id} fromPincode={fromPincode} toPincode={toPincode} startTime={startTime}/> */}
        <DeleteBookingPopup name={name} image={image} capacityKg={capacityKg} tyres={tyres} BookingId={id} fromPincode={fromPincode} toPincode={toPincode} startTime={startTime}/>
      </div>
    </div>
  );
}
