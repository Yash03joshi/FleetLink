'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function SearchForm({ onSearch }: { onSearch: (data: any) => void }) {
  const [fromPincode, setFromPincode] = useState('');
  const [toPincode, setToPincode] = useState('');
  const [capacityRequired, setCapacityRequired] = useState('');
  const [startTime, setStartTime] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      fromPincode.length !== 6 ||
      toPincode.length !== 6 ||
      !capacityRequired ||
      !startTime
    ) {
      toast('Please fill all fields correctly');
      return;
    }

    try {
      const params = new URLSearchParams({
        fromPincode,
        toPincode,
        capacityRequired,
        startTime,
      });

      const res = await fetch(`/api/vehicles/available?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        onSearch(data);
        // console.log(data);
        
      } else {
        toast(data.message);
      }
    } catch (err) {
      toast('Error fetching available vehicles');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 bg-white rounded shadow">
      <div>
        <label className="block mb-1 text-sm font-medium">From Pincode</label>
        <input
          type="text"
          maxLength={6}
          value={fromPincode}
          onChange={(e) => setFromPincode(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">To Pincode</label>
        <input
          type="text"
          maxLength={6}
          value={toPincode}
          onChange={(e) => setToPincode(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Capacity Required (kg)</label>
        <input
          type="number"
          min={1}
          value={capacityRequired}
          onChange={(e) => setCapacityRequired(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Start Time</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          min={new Date().toISOString().slice(0, 16)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full cursor-pointer bg-[#1e2939] text-white py-2 rounded hover:bg-[#1e2125] transition"
      >
        Search Vehicles
      </button>
    </form>
  );
}
