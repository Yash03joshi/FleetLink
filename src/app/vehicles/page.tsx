'use client'; 

import Header from '@/components/common/Header'
import SearchForm from '@/components/ui/searchForn';
import React, { useState } from 'react';
import VehicleCard from '@/components/ui/VehicleCard';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

function page() {
  const [results, setResults] = useState<any>(null);

  useAuthRedirect()
  return (
    <div>
      <Header/>
      {results ? (
        <div className="mt-8 w-full mx-auto">
          <h2 className="text-xl font-semibold mb-2">Estimated Ride Duration: {results.estimatedRideDurationHours} Hours</h2>
          <h2 className="text-xl font-semibold mb-2">Available Vehicles:</h2>
          <div className='flex items-start gap-2 flex-wrap w-full'>
            {results.availableVehicles.map((v: any) => (
              <VehicleCard name={v.name} image={v.image} capacityKg={v.capacityKg} tyres={v.tyres} id={v._id} fromPincode={results.searchData.fromPincode} toPincode={results.searchData.toPincode} startTime={results.searchData.startTime} />
          ))}
          </div>
        </div>
      ) : (
        <div className='w-full h-full mt-10'>
          <SearchForm onSearch={setResults} />
        </div>
      )}
    </div>
  )
}

export default page
