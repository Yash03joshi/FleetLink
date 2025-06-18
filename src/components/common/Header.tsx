'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import AddVehicle from '../ui/AddVehicle';

const Header = () => {
    const router = useRouter();

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow-md">
            <h1 className="cursor-pointer text-xl font-semibold" onClick={()=>{router.push('/')}}>Fleet Dashboard</h1>

            <div className="flex gap-4">
                <button 
                className="bg-white cursor-pointer hover:bg-black text-black hover:text-white px-4 py-2 hover:rounded-[22px] rounded transition-all duration-300 ease-in-out"
                onClick={()=>{router.push("/booked")}}
                >
                    Booked Vehicle
                </button>
                <button 
                className="bg-white cursor-pointer hover:bg-black text-black hover:text-white px-4 py-2 hover:rounded-[22px] rounded transition-all duration-300 ease-in-out"
                onClick={()=>{router.push('/vehicles')}}
                >Available Vehicle
                </button>
                <AddVehicle/>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        router.push("/login");
                        toast("Logout Successful");
                    }}
                    className="bg-white cursor-pointer hover:bg-black text-black hover:text-white px-4 py-2 hover:rounded-[22px] rounded transition-all duration-300 ease-in-out">
                    Logout
                </button>
            </div>
        </header>
    )
}

export default Header
