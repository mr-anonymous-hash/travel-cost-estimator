import Link from 'next/link';
import './../app/globals.css'

import { FaLocationDot } from 'react-icons/fa6';
import {FaExchangeAlt} from 'react-icons/fa6'
import {FaCalendarAlt} from 'react-icons/fa6'
import {FaUser} from 'react-icons/fa6'

const Packages = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">Travel Cost</span>
          </div>
          <div className="flex space-x-6 items-center">
            <Link href="/more-travel" className="hover:underline">More Travel</Link>
            <Link href="/deals" className="hover:underline">Deals</Link>
            <Link href="/help" className="hover:underline">Help</Link>
            <Link href="/login" className="hover:underline">Sign In / Join</Link>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-slate-800">
          Compare and book cheap flights on over 500 airlines!
        </h1>
        
        {/* Search Box */}
        <div className="bg-white shadow-md rounded-md p-6">
          
          {/* Tab Menu */}
          <div className="flex justify-between space-x-4 mb-4">
            <button className="flex-1 bg-blue-100 text-blue-800 py-2 px-4 rounded">Flight + Hotel</button>
            <button className="flex-1 bg-gray-100 text-gray-600 py-2 px-4 rounded">Flight + Car</button>
            <button className="flex-1 bg-gray-100 text-gray-600 py-2 px-4 rounded">Hotel + Car</button>
          </div>

          {/* Travel Options */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input type="radio" name="tripType" checked className="form-radio" />
                <span>Round Trip</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="tripType" className="form-radio" />
                <span>One Way</span>
              </label>
            </div>
            <div>
              <select className="border p-2 rounded text-gray-600">
                <option>Coach</option>
                <option>Business</option>
                <option>First Class</option>
              </select>
            </div>
          </div>
          
          {/* Flight Search Form */}
          <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
            <div className="col-span-6 lg:col-span-3 relative">
              <label className="block text-gray-700">From</label>
              <div className="flex border rounded-md items-center p-2">
                {/* <FaLocationDot className="text-slate-800 mr-2" /> */}
                <input type="text" placeholder="From where?" className="w-full outline-none" />
              </div>
            </div>
            
            <div className="col-span-6 lg:col-span-3 relative">
              <label className="block text-gray-700">To</label>
              <div className="flex border rounded-md items-center p-2">
                {/* <FaLocationDot className="text-slate-800 mr-2" /> */}
                <input type="text" placeholder="To where?" className="w-full outline-none" />
              </div>
              {/* Swap Button */}
              <button className="absolute -top-6 right-0 bg-white border rounded-full p-1 text-gray-600">
                {/* <FaExchangeAlt /> */}
              </button>
            </div>

            <div className="col-span-6 lg:col-span-2">
              <label className="block text-gray-700">Depart</label>
              <div className="flex border rounded-md items-center p-2">
                {/* <FaCalendarAlt className="text-slate-800 mr-2" /> */}
                <input type="date" className="w-full outline-none" />
              </div>
            </div>
            <div className="col-span-6 lg:col-span-2">
              <label className="block text-gray-700">Return</label>
              <div className="flex border rounded-md items-center p-2">
                {/* <FaCalendarAlt className="text-slate-800 mr-2" /> */}
                <input type="date" className="w-full outline-none" />
              </div>
            </div>

            <div className="col-span-6 lg:col-span-1">
              <label className="block text-gray-700">Travelers</label>
              <div className="flex border rounded-md items-center p-2">
                {/* <FaUser className="text-slate-800 mr-2" /> */}
                <input type="number" className="w-full outline-none" defaultValue={1} />
              </div>
            </div>

            <div className="col-span-6 lg:col-span-1 flex items-end">
              <button className="bg-yellow-400 text-white px-6 py-2 w-full rounded">Search Packages</button>
            </div>
          </form>

          {/* Additional options */}
          <div className="mt-4 space-y-2">
            <label className="block">
              <input type="checkbox" className="mr-2" />
              I only need this hotel for part of my trip
            </label>
            <label className="block">
              <input type="checkbox" className="mr-2" />
              Homes & Apartments
            </label>
            <div className="flex space-x-4">
              <input type="text" placeholder="Hotel Name" className="border p-2 rounded w-full" />
              <select className="border p-2 rounded text-gray-600">
                <option>Hotel Rating</option>
                <option>1 Star</option>
                <option>2 Star</option>
                <option>3 Star</option>
                <option>4 Star</option>
                <option>5 Star</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
