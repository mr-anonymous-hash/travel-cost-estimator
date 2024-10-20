import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import './../app/globals.css';
import Navbar from './components/Navbar';

const TravelBookingSystem = () => {
  // State management
  const [flightDetails, setFlightDetails] = useState({
    departureAirport: '',
    arrivalAirport: '',
    date: '',
    carrier: 'All',
    calculatedPrice: 0
  });

  const [carRental, setCarRental] = useState({
    pickupAirport: '',
    pickupDate: '',
    dropOffDate: '',
    calculatedPrice: 0
  });

  const [hotel, setHotel] = useState({
    city: '',
    checkInDate: '',
    checkOutDate: '',
    calculatedPrice: 0
  });

  const [results, setResults] = useState({
    markupPercentage: 20,
    additionalCosts: 0,
    total: 0
  });

  const [options, setOptions] = useState({
    airports: [],
    carriers: [],
    cities: [],
    flights: [],
    cars: [],
    hotels: []
  });

  // Fetch and process data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [flightsRes, carsRes, hotelsRes] = await Promise.all([
          fetch('http://localhost:8000/api/flight/'),
          fetch('http://localhost:8000/api/cars/'),
          fetch('http://localhost:8000/api/hotels/')
        ]);

        const flightsData = await flightsRes.json();
        const carsData = await carsRes.json();
        const hotelsData = await hotelsRes.json();

        const uniqueAirports = new Set();
        flightsData.data.forEach(flight => {
          uniqueAirports.add(flight.departureAirport);
          uniqueAirports.add(flight.arrivalAirport);
        });

        const uniqueCarriers = new Set(flightsData.data.map(flight => flight.carrier));
        const uniqueCities = new Set(hotelsData.data.map(hotel => hotel.city));

        setOptions({
          airports: Array.from(uniqueAirports).map(airport => ({
            value: airport,
            label: airport
          })),
          carriers: Array.from(uniqueCarriers).map(carrier => ({
            value: carrier,
            label: carrier
          })),
          cities: Array.from(uniqueCities).map(city => ({
            value: city,
            label: city
          })),
          flights: flightsData.data,
          cars: carsData.data,
          hotels: hotelsData.data
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFlightSearch = () => {
    const matchingFlight = options.flights.find(flight => 
      flight.departureAirport === flightDetails.departureAirport &&
      flight.arrivalAirport === flightDetails.arrivalAirport &&
      (flightDetails.carrier === 'All' || flight.carrier === flightDetails.carrier)
    );

    if (matchingFlight) {
      const basePrice = parseFloat(matchingFlight.basePrice);
      const markup = basePrice * (results.markupPercentage / 100);
      const total = basePrice + markup;
      setFlightDetails(prev => ({ ...prev, calculatedPrice: total }));
    }
  };

  const handleCarSearch = () => {
    const matchingCar = options.cars.find(car => 
      car.pickupLocation.includes(carRental.pickupAirport)
    );

    if (matchingCar) {
      const basePrice = parseFloat(matchingCar.dailyRate);
      const markup = basePrice * (results.markupPercentage / 100);
      const total = basePrice + markup;
      setCarRental(prev => ({ ...prev, calculatedPrice: total }));
    }
  };

  const handleHotelSearch = () => {
    const matchingHotel = options.hotels.find(hotel => 
      hotel.city === hotel.city
    );

    if (matchingHotel) {
      const basePrice = parseFloat(matchingHotel.nightlyRate);
      const markup = basePrice * (results.markupPercentage / 100);
      const total = basePrice + markup;
      setHotel(prev => ({ ...prev, calculatedPrice: total }));
    }
  };

  const calculateTotal = () => {
    const totalServices = flightDetails.calculatedPrice + carRental.calculatedPrice + hotel.calculatedPrice;
    const total = totalServices + results.additionalCosts;
    setResults(prev => ({ ...prev, total }));
  };

  return (
    <div className="bg-white">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Flight Search Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-slate-800">Flight</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <label className="block text-sm text-gray-600">Departure Airport</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={flightDetails.departureAirport}
                  onChange={(e) => setFlightDetails({ ...flightDetails, departureAirport: e.target.value })}
                >
                  <option value="">Select Airport</option>
                  {options.airports.map(airport => (
                    <option key={airport.value} value={airport.value}>
                      {airport.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600">Arrival Airport</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={flightDetails.arrivalAirport}
                  onChange={(e) => setFlightDetails({ ...flightDetails, arrivalAirport: e.target.value })}
                >
                  <option value="">Select Airport</option>
                  {options.airports.map(airport => (
                    <option key={airport.value} value={airport.value}>
                      {airport.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600">Date</label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full p-2 border rounded-md"
                    value={flightDetails.date}
                    onChange={(e) => setFlightDetails({ ...flightDetails, date: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600">Carrier</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={flightDetails.carrier}
                  onChange={(e) => setFlightDetails({ ...flightDetails, carrier: e.target.value })}
                >
                  <option value="All">All</option>
                  {options.carriers.map(carrier => (
                    <option key={carrier.value} value={carrier.value}>
                      {carrier.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                onClick={handleFlightSearch}
              >
                Search
              </button>

              {flightDetails.calculatedPrice > 0 && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <p className="font-medium">Flight Total: ${flightDetails.calculatedPrice.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Car Rental Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-slate-800">Car Rental</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <label className="block text-sm text-gray-600">Pickup Airport</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={carRental.pickupAirport}
                  onChange={(e) => setCarRental({ ...carRental, pickupAirport: e.target.value })}
                >
                  <option value="">Select Airport</option>
                  {options.airports.map(airport => (
                    <option key={airport.value} value={airport.value}>
                      {airport.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600">Pickup Date</label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full p-2 border rounded-md"
                    value={carRental.pickupDate}
                    onChange={(e) => setCarRental({ ...carRental, pickupDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600">Drop-off Date</label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full p-2 border rounded-md"
                    value={carRental.dropOffDate}
                    onChange={(e) => setCarRental({ ...carRental, dropOffDate: e.target.value })}
                  />
                </div>
              </div>

              <button
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                onClick={handleCarSearch}
              >
                Search
              </button>

              {carRental.calculatedPrice > 0 && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <p className="font-medium">Car Rental Total: ${carRental.calculatedPrice.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Hotel Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-slate-800">Hotel</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <label className="block text-sm text-gray-600">City</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={hotel.city}
                  onChange={(e) => setHotel({ ...hotel, city: e.target.value })}
                >
                  <option value="">Select City</option>
                  {options.cities.map(city => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600">Check-in Date</label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full p-2 border rounded-md"
                    value={hotel.checkInDate}
                    onChange={(e) => setHotel({ ...hotel, checkInDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600">Check-out Date</label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full p-2 border rounded-md"
                    value={hotel.checkOutDate}
                    onChange={(e) => setHotel({ ...hotel, checkOutDate: e.target.value })}
                  />
                </div>
              </div>

              <button
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                onClick={handleHotelSearch}
              >
                Search
              </button>

              {hotel.calculatedPrice > 0 && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <p className="font-medium">Hotel Total: ${hotel.calculatedPrice.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-bold mb-4 text-slate-800">Results</h2>
          <div className="space-y-4 text-gray-600">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600">Flight Cost</label>
                <p className="text-lg font-medium">${flightDetails.calculatedPrice.toFixed(2)}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600">Car Rental Cost</label>
                <p className="text-lg font-medium">${carRental.calculatedPrice.toFixed(2)}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600">Hotel Cost</label>
                <p className="text-lg font-medium">${hotel.calculatedPrice.toFixed(2)}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600">Markup Percentage</label>
                <p className="text-lg font-medium">{results.markupPercentage}%</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600">Additional Costs</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  value={results.additionalCosts}
                  onChange={(e) => setResults({ ...results, additionalCosts: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Total Cost</label>
                <p className="text-lg font-medium">${results.total.toFixed(2)}</p>
              </div>
            </div>

            <button
              className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
              onClick={calculateTotal}
            >
              Calculate Total
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelBookingSystem;