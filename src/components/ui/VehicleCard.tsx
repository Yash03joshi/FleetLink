'use client';

import React from 'react';
import BookVehiclePopUp from './BookVehiclePopUp';

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
        <BookVehiclePopUp name={name} image={image} capacityKg={capacityKg} tyres={tyres} vehicleId={id} fromPincode={fromPincode} toPincode={toPincode} startTime={startTime}/>
      </div>
    </div>
  );
}
