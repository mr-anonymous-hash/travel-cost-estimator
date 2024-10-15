import Link from 'next/link';
import '@/app/globals.css'
import { FaLocationDot } from "react-icons/fa6";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { MdFlight } from "react-icons/md";
import { GiIsland } from "react-icons/gi";
import { LiaHotelSolid } from "react-icons/lia";

export default function TravelSearch() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            {/* <img src="/logo.png" alt="OneTravel Logo" className="h-8" /> */}
            <span className="text-xl font-bold">Travel Cost</span>
          </div>
          {/* Links */}
          <div className="flex space-x-6 items-center">
            {/* <Link href="/more-travel" className="hover:underline">More Travel</Link>
            <Link href="/deals" className="hover:underline">Deals</Link> */}
            <Link href="/help" className="hover:underline">Help</Link>
            <Link href="/login" className="hover:underline flex items-center"><FaRegCircleUser className='mr-1'/>Sign In</Link>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-slate-800">
          Compare and book cheap flights
        </h1>
        
        {/* Search Box */}
        <div className="bg-white shadow-md rounded-md p-6">
          {/* Tab Menu */}
          <div className="flex flex-col sm:flex-row sm:space-x-8 border-b pb-2 mb-4 text-gray-800">
            <button className="font-bold border-b-2 border-blue-500 pb-2 flex items-center">
               <MdFlight/>Flights</button>
            <button className='flex items-center'><GiIsland/> Packages</button>
            <button className='flex items-center'><LiaHotelSolid /> Hotels</button>
            {/* <button>Cars</button> */}
          </div>
          
          {/* Flight Search Form */}
          <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-3">
              <label className="block text-gray-700">From</label>
              <div className="flex border rounded-md items-center">
                <FaLocationDot className="text-slate-800 ml-2" />
                <input type="text" placeholder="From where?" className="w-full p-2 outline-none" />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-3">
              <label className="block text-gray-700">To</label>
              <div className="flex border rounded-md items-center">
                <FaLocationDot className="text-slate-800 ml-2" />
                <input type="text" placeholder="To where?" className="w-full p-2 outline-none" />
              </div>
            </div>
            <div className="col-span-6 lg:col-span-2">
              <label className="block text-gray-700">Depart</label>
              <input type="date" className="w-full border rounded p-2 text-gray-400" />
            </div>
            <div className="col-span-6 lg:col-span-2">
              <label className="block text-gray-700">Return</label>
              <input type="date" className="w-full border rounded p-2 text-gray-400" />
            </div>
            <div className="col-span-6 lg:col-span-1">
              <label className="block text-gray-700">Travelers</label>
              <input type="number" className="w-full border rounded p-2" defaultValue={1} />
            </div>
            <div className="col-span-6 lg:col-span-1 flex items-end">
              <button className=" text-white px-6 py-2 w-full rounded"><IoSearchSharp className='text-slate-800 text-xl'/></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
