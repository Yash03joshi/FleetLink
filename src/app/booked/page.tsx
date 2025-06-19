'use client';

import Header from '@/components/common/Header';
import React, { useEffect, useState } from 'react';
import VehicleCard from '@/components/ui/BookedVehiclePage/BookedVehicleCard'; // adjust path if needed
import jwt from "jsonwebtoken";
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

type Booking = {
  _id: string;
  fromPincode: string;
  toPincode: string;
  startTime: string;
  vehicleId: {
    _id: string;
    name: string;
    image: string;
    capacityKg: number;
    tyres: number;
  };
};

function Page() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [noBooking,setNoBooking] = useState(false);
  useAuthRedirect();

  useEffect(() => {
    const token=localStorage.getItem("token");
  console.log(token);
  
  const tokenData = jwt.decode(token!) as { id: string };
  const userId=tokenData.id;
    const fetchBookings = async () => {
      try {
        const res = await fetch(`/api/bookings/user?userId=${userId}`);
        const data = await res.json();
        if (data.success) {
          setBookings(data.bookings);
          // console.log(data.booking);
          
        }
        if (data.bookings.length === 0) {
          setNoBooking(true);
        }
      } catch (err) {
        console.error('Failed to fetch bookings', err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex flex-wrap gap-4 p-4">
        {bookings.map((booking) => (
          <VehicleCard
            key={booking._id}
            id={booking._id}
            name={booking.vehicleId.name}
            image={booking.vehicleId.image}
            capacityKg={booking.vehicleId.capacityKg}
            tyres={booking.vehicleId.tyres}
            fromPincode={booking.fromPincode}
            toPincode={booking.toPincode}
            startTime={new Date(booking.startTime).toLocaleString()}
          />
        ))}
        {noBooking && (
            <p className="text-4xl mt-[35vh] w-full font-bold text-gray-800 text-center">There are no bookings.</p>
        )}
      </div>
    </div>
  );
}

export default Page;
