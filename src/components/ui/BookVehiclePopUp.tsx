'use client';

import React , {useState} from 'react';
import jwt from 'jsonwebtoken';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

type VehicleCardProps = {
  image: string;
  name: string;
  capacityKg: number;
  tyres: number;
  vehicleId: string;
  fromPincode:string;
  toPincode:string;
  startTime:string;
};
function BookVehiclePopUp({ image, name, capacityKg, tyres, vehicleId , fromPincode,toPincode,startTime }: VehicleCardProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const handleSubmit = async () =>{
        const token=localStorage.getItem("token");
        const tokenData = jwt.decode(token!) as { id: string }; // already an object
        const customerId=tokenData.id;

        try {
              const payload = {
                vehicleId,
                fromPincode,
                toPincode,
                startTime,
                customerId
            }
        
              const res = await fetch("/api/bookings", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });
              const data = await res.json();
        
              if (data.success) {
                toast("Vehicle Booked")
                router.push('/')
                
              } else {
                toast(data.message);
              }
            } catch (err) {
              toast('Error fetching available vehicles');
            }

        }

   return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => setIsOpen(true)}
        className="w-full cursor-pointer bg-[#1e2939] text-white py-2 rounded hover:bg-[#1e2125] transition"
      >
        Book Now
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 text-black bg- flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg min-w-96 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute cursor-pointer top-1 right-2 text-4xl text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
            <div className="mx-auto py-10 px-5 bg-white">
              <h2 className='text-2xl font-semibold mb-4'>Are you sure you want to book this vehicle?</h2>
              <div className='flex flex-col mb-2'>
                <div>Name:{name}</div>
                <div>Tyres:{tyres}</div>
                <div>Capacity: {capacityKg}KG</div>
              </div>
              <div className='flex gap-2'>
                <button className='w-full cursor-pointer bg-[#1e2939] text-white py-2 rounded hover:bg-red-700 transition' onClick={()=>{setIsOpen(false)}}>No</button>
                <button className='w-full bg-[#1e2939] cursor-pointer text-white py-2 rounded hover:bg-green-600 transition' onClick={handleSubmit}>Yes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookVehiclePopUp;