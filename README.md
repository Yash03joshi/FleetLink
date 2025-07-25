# 🚚 FleetLink - Logistics Vehicle Booking System
FleetLink is a web application that allows businesses to manage logistics vehicles and make bookings based on capacity, route, and time. It ensures accurate vehicle availability tracking and prevents booking conflicts. Ideal for B2B logistics operations.

## 🔗 Live Demo
Check out the live application: [FleetLink](https://fleet-link-two.vercel.app/)

## 📚 Table of Contents
* Features
* Pages
* Installation

## ✅ Features
* User-friendly interface for logistics vehicle management
* Add, view, and book vehicles based on route and capacity
* Accurate conflict-free booking with time window checks
* Calculates estimated ride durations from pin codes
* Real-time search for available vehicles
* Success/error messages and progress indicators


## 📄 Pages
1. Add Vehicle  
  Add new vehicles with name, capacity, and tyres  
  Sends a POST request to /api/vehicles

2. Search & Book
Enter required capacity, from & to pincodes, and start time  
Calls /api/vehicles/available to search for available vehicles  
"Book Now" button sends a POST request to /api/bookings

3. Bookings  
View or cancel upcoming bookings (if implemented using DELETE)

## 🛠️ Installation
To run this project locally, follow these steps:

1. Clone the Repository  
```git clone https://github.com/Yash03joshi/FleetLink.git```  
```cd fleetlink```

2. Create .env.local file with the following content:  
`MONGODB_URI=your_mongo_connection_string`  
`JWT_SECRET=your_JWT_Secret `

3. Install Dependencies  
`npm install`

4. Start the Development Server  
`npm run dev`

The app will run at `http://localhost:3000`

## 📦 Tech Stack
* Frontend: Next.js (React)
* Backend: Node.js, Next.js API Routes
* Database: MongoDB with Mongoose

## 🏁 Bonus Features (Optional)
* Improved duration logic using Google Maps API
* User authentication & protected routes
