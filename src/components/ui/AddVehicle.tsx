import React, { useState } from "react";
import { toast } from "react-toastify";

function AddVehicle() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [capacityKg, setCapacityKg] = useState("");
  const [tyres, setTyres] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parseFloat(tyres) % 2 != 0 && parseFloat(tyres) <=128) {
      toast("Enter Valid amount of tyres!!");
      return;
    }
    const payload = {
      name,
      capacityKg: Number(capacityKg),
      tyres: Number(tyres),
      image:
        "https://img.freepik.com/premium-photo/container-truck-mockup-advertising-isolated-white-background_669798-7705.jpg?semt=ais_hybrid&w=740",
    };

    const res = await fetch("/api/vehicles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok) {
      toast("Vehicle added successfully!");
      setName("");
      setCapacityKg("");
      setTyres("");
      setIsOpen(false);
    } else {
      toast(data.message || "Error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white cursor-pointer hover:bg-black text-black hover:text-white px-4 py-2 hover:rounded-[22px] rounded transition-all duration-300 ease-in-out"
      >
        Add Vehicle
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
              <h2 className="text-2xl font-semibold mb-4">Add Vehicle</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Name</label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    Capacity (Kg)
                  </label>
                  <input
                    type="number"
                    className="w-full border px-3 py-2 rounded"
                    value={capacityKg}
                    onChange={(e) => setCapacityKg(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Tyres</label>
                  <input
                    type="number"
                    className="w-full border px-3 py-2 rounded"
                    value={tyres}
                    onChange={(e) => setTyres(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white py-2 px-4 rounded transition"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddVehicle;
