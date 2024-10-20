import React from 'react';
import { FaCalendarAlt, FaLocationDot, FaUser } from 'react-icons/fa';
import { IoSearchSharp } from "react-icons/io5";

const LocationInput = ({ label, placeholder }) => (
  <div className="col-span-12 lg:col-span-3">
    <label className="block text-gray-700">{label}</label>
    <div className="flex border rounded-md items-center">
      <FaLocationDot className="text-slate-800 ml-2" />
      <input type="text" placeholder={placeholder} className="w-full p-2 outline-none" />
    </div>
  </div>
);

const DateInput = ({ label }) => (
  <div className="col-span-6 lg:col-span-2">
    <label className="block text-gray-700">{label}</label>
    <div className="flex border rounded-md items-center">
      <FaCalendarAlt className="text-slate-800 ml-2" />
      <input type="date" className="w-full p-2 outline-none" />
    </div>
  </div>
);

const TravelersInput = () => (
  <div className="col-span-6 lg:col-span-1">
    <label className="block text-gray-700">Travelers</label>
    <div className="flex border rounded-md items-center">
      <FaUser className="text-slate-800 ml-2" />
      <input type="number" className="w-full p-2 outline-none" defaultValue={1} min={1} />
    </div>
  </div>
);

const SearchButton = () => (
  <div className="col-span-6 lg:col-span-1 flex items-end">
    <button className="bg-yellow-400 text-white px-6 py-2 w-full rounded flex items-center justify-center">
      <IoSearchSharp className="mr-2" />
      Search
    </button>
  </div>
);

const FlightForm = ({ tripType }) => (
  <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
    <LocationInput label="From" placeholder="From where?" />
    <LocationInput label="To" placeholder="To where?" />
    <DateInput label="Depart" />
    {tripType === 'roundtrip' && <DateInput label="Return" />}
    <TravelersInput />
    <SearchButton />
  </form>
);

const CarForm = () => (
  <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
    <LocationInput label="From" placeholder="Pick up Location" />
    <LocationInput label="To" placeholder="Drop off Location" />
    <DateInput label="Pick up Date" />
    <DateInput label="Drop off Date" />
    <TravelersInput />
    <SearchButton />
  </form>
);

const PackagesForm = ({ tripType }) => (
  <>
    <FlightForm tripType={tripType} />
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
  </>
);

export { FlightForm, CarForm, PackagesForm };