import React, { useState } from 'react';
import './../app/globals.css'
import { Search, User, Phone, MapPin, Calendar, ChevronDown } from 'lucide-react';

const TravelBookingPage = () => {
  const [activeTab, setActiveTab] = useState('Cars');

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-800">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-yellow-500">OneTravel</span>
          <nav>
            <ul className="flex space-x-4">
              <li>More Travel</li>
              <li>Deals</li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-green-600 rounded-full px-4 py-2">
            <Phone size={20} />
            <span className="ml-2">1-845-664-6169</span>
          </div>
          <select className="bg-transparent border-none">
            <option>USD $ / EN</option>
          </select>
          <span>Help</span>
          <div className="flex items-center">
            <User size={20} />
            <span className="ml-2">Sign In / Join</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto mt-8">
        <h1 className="text-4xl font-bold mb-6">Millions of Cheap Flights on Over 500 Airlines!</h1>

        {/* Search Form */}
        <div className="bg-white rounded-lg p-6 text-gray-800">
          <div className="flex mb-4">
            {['Flights', 'Packages', 'Hotels', 'Cars'].map((option) => (
              <button
                key={option}
                className={`px-4 py-2 ${activeTab === option ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
                onClick={() => setActiveTab(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {activeTab === 'Cars' && (
            <div>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-2 relative">
                  <input className="w-full p-2 border rounded pl-10" placeholder="Pick up Location?" />
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2" />
                      Need a different Drop off Location?
                    </label>
                  </div>
                </div>
                <div className="relative">
                  <input className="w-full p-2 border rounded pl-10" placeholder="Pick up Date" />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <select className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none">
                    <option>10:00 AM</option>
                  </select>
                </div>
                <div className="relative">
                  <input className="w-full p-2 border rounded pl-10" placeholder="Drop off Date" />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <select className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none">
                    <option>10:00 AM</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center text-blue-500">
                  <span>I Don't Have a Discount Code</span>
                  <ChevronDown size={20} />
                </div>
                <button className="bg-yellow-500 text-white px-6 py-2 rounded">Search Cars</button>
              </div>
            </div>
          )}
        </div>

        {/* Customer Support */}
        <div className="bg-white text-gray-800 rounded-lg p-6 mt-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Call us 24/7 at <span className="text-green-600">1-845-664-6169</span></h2>
            <p>Need help booking? Our agents are ready!</p>
            <p>Choose from over 500 airlines.</p>
          </div>
          <div className="flex space-x-4">
            {['Hawaiian Airlines', 'JetBlue Airways', 'Turkish Airlines'].map((airline) => (
              <div key={airline} className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
                <span className="text-sm">{airline}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deals Section */}
        <h2 className="text-2xl font-bold mt-8">
          Found these <span className="text-green-500">low fare deals</span> for your next trip
        </h2>
      </main>
    </div>
  );
};

export default TravelBookingPage;