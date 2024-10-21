import React, { useState, useEffect } from 'react';
import { Plus, Edit, X } from 'lucide-react';
import './../app/globals.css'
import { useRouter } from 'next/router';

const AdminDashboard = () => {
    // Previous state declarations remain the same...
    const [activeTab, setActiveTab] = useState('flight');
    const [stats, setStats] = useState({
        flights: 0,
        hotels: 0,
        cars: 0
    });
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter()

    // Previous useEffect and fetch functions remain the same...
    useEffect(() => {
        fetchStats();
        fetchItems();
    }, [activeTab]);

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(!token){
            window.location.href = '/Home'
        }
    },[])
    const fetchStats = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/stats');
            if (!response.ok) throw new Error('Failed to fetch stats');
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        }
    };

    const fetchItems = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/${activeTab}`);
            if (!response.ok) throw new Error(`Failed to fetch ${activeTab}`);
            const data = await response.json();
            setItems(data || []);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/${activeTab}`, {
                method: formData.id ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error('Failed to save item');
            setIsModalOpen(false);
            setFormData({});
            await Promise.all([fetchItems(), fetchStats()]);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/${activeTab}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete item');
            await Promise.all([fetchItems(), fetchStats()]);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const renderForm = () => {
        switch (activeTab) {
            case 'flight':
                return (
                    <>
                        <input name="departureAirport" value={formData.departureAirport || ''} onChange={handleInputChange} placeholder="Departure Airport" className="mb-2 w-full p-2 border rounded" required />
                        <input name="arrivalAirport" value={formData.arrivalAirport || ''} onChange={handleInputChange} placeholder="Arrival Airport" className="mb-2 w-full p-2 border rounded" required />
                        <input name="date" type="date" value={formData.date || ''} onChange={handleInputChange} className="mb-2 w-full p-2 border rounded" required />
                        <input name="carrier" value={formData.carrier || ''} onChange={handleInputChange} placeholder="Carrier" className="mb-2 w-full p-2 border rounded" required />
                        <input name="basePrice" type="number" step="0.01" value={formData.basePrice || ''} onChange={handleInputChange} placeholder="Base Price" className="mb-2 w-full p-2 border rounded" required />
                        <input name="flightNumber" value={formData.flightNumber || ''} onChange={handleInputChange} placeholder="Flight Number" className="mb-2 w-full p-2 border rounded" required />
                        <input name="departureTime" type="time" value={formData.departureTime || ''} onChange={handleInputChange} className="mb-2 w-full p-2 border rounded" required />
                        <input name="arrivalTime" type="time" value={formData.arrivalTime || ''} onChange={handleInputChange} className="mb-2 w-full p-2 border rounded" required />
                        <input name="availableSeats" type="number" value={formData.availableSeats || ''} onChange={handleInputChange} placeholder="Available Seats" className="mb-2 w-full p-2 border rounded" required />
                        <select name="class" value={formData.class || ''} onChange={handleInputChange} className="mb-2 w-full p-2 border rounded" required>
                            <option value="">Select Class</option>
                            <option value="economy">Economy</option>
                            <option value="business">Business</option>
                            <option value="first">First</option>
                        </select>
                    </>
                );
            case 'cars':
                return (
                    <>
                        <input name="pickupLocation" value={formData.pickupLocation || ''} onChange={handleInputChange} placeholder="Pickup Location" className="mb-2 w-full p-2 border rounded" required />
                        <input name="dailyRate" type="number" step="0.01" value={formData.dailyRate || ''} onChange={handleInputChange} placeholder="Daily Rate" className="mb-2 w-full p-2 border rounded" required />
                        <input name="carModel" value={formData.carModel || ''} onChange={handleInputChange} placeholder="Car Model" className="mb-2 w-full p-2 border rounded" required />
                        <select name="carType" value={formData.carType || ''} onChange={handleInputChange} className="mb-2 w-full p-2 border rounded" required>
                            <option value="">Select Car Type</option>
                            <option value="economy">Economy</option>
                            <option value="compact">Compact</option>
                            <option value="luxury">Luxury</option>
                            <option value="suv">SUV</option>
                            <option value="van">Van</option>
                        </select>
                        <div className="mb-2">
                            <label className="flex items-center">
                                <input name="available" type="checkbox" checked={formData.available || false} onChange={handleInputChange} className="mr-2" />
                                Available
                            </label>
                        </div>
                        <input name="insuranceRate" type="number" step="0.01" value={formData.insuranceRate || ''} onChange={handleInputChange} placeholder="Insurance Rate" className="mb-2 w-full p-2 border rounded" required />
                    </>
                );
            case 'hotels':
                return (
                    <>
                        <input name="city" value={formData.city || ''} onChange={handleInputChange} placeholder="City" className="mb-2 w-full p-2 border rounded" required />
                        <input name="nightlyRate" type="number" step="0.01" value={formData.nightlyRate || ''} onChange={handleInputChange} placeholder="Nightly Rate" className="mb-2 w-full p-2 border rounded" required />
                        <input name="hotelName" value={formData.hotelName || ''} onChange={handleInputChange} placeholder="Hotel Name" className="mb-2 w-full p-2 border rounded" required />
                        <select name="roomType" value={formData.roomType || ''} onChange={handleInputChange} className="mb-2 w-full p-2 border rounded" required>
                            <option value="">Select Room Type</option>
                            <option value="single">Single</option>
                            <option value="double">Double</option>
                            <option value="suite">Suite</option>
                            <option value="deluxe">Deluxe</option>
                        </select>
                        <input name="address" value={formData.address || ''} onChange={handleInputChange} placeholder="Address" className="mb-2 w-full p-2 border rounded" required />
                        <input name="amenities" value={formData.amenities || ''} onChange={handleInputChange} placeholder="Amenities (comma-separated)" className="mb-2 w-full p-2 border rounded" />
                        <input name="availableRooms" type="number" value={formData.availableRooms || ''} onChange={handleInputChange} placeholder="Available Rooms" className="mb-2 w-full p-2 border rounded" required />
                    </>
                );
            default:
                return null;
        }
    };

    // Rest of the component remains the same...
    return (
        <div className='bg-white min-h-screen'>
            <div className="p-6 max-w-6xl mx-auto">
                {/* Error display */}
                {error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {/* Dashboard header and stats */}
                <div className="mb-6">
                    <div className='flex justify-between  items-center'>
                    <h1 className="text-2xl font-bold mb-4 text-slate-800">Admin Dashboard</h1>
                    <button className='text-2xl font-semibold text-slate-800 hover:text-red-500'
                    onClick={()=>{
                        localStorage.removeItem('user')
                        localStorage.removeItem('token')
                        router.push('Home')}}
                    >Logout</button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-400 p-4 rounded text-white">
                            <h3>Total Flights</h3>
                            <p className="text-2xl font-bold">{stats.flight_count}</p>
                        </div>
                        <div className="bg-green-400 p-4 rounded text-white">
                            <h3>Total Hotels</h3>
                            <p className="text-2xl font-bold">{stats.hotel_count}</p>
                        </div>
                        <div className="bg-gray-400 p-4 rounded text-white">
                            <h3>Total Cars</h3>
                            <p className="text-2xl font-bold">{stats.car_count}</p>
                        </div>
                    </div>

                    {/* Tab buttons */}
                    <div className="flex space-x-4">
                        <button
                            className={`px-4 py-2 rounded ${activeTab === 'flight' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => setActiveTab('flight')}
                        >
                            Flights
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${activeTab === 'hotels' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => setActiveTab('hotels')}
                        >
                            Hotels
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${activeTab === 'cars' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => setActiveTab('cars')}
                        >
                            Cars
                        </button>
                    </div>
                </div>

                {/* Add New button */}
                <button
                    className="mb-4 flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => {
                        setFormData({});
                        setIsModalOpen(true);
                    }}
                    disabled={loading}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                </button>

                {/* Items grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {Array.isArray(items) && items.map((item) => (
                            <div key={item.id} className="border p-4 rounded shadow">
                                {Object.entries(item).map(([key, value]) => (
                                    key !== 'id' && (
                                        <p key={key} className="mb-1">
                                            <span className="font-semibold">
                                                {key.charAt(0).toUpperCase() + key.slice(1)}:
                                            </span>{' '}
                                            {typeof value === 'boolean' ? value.toString() : value}
                                        </p>
                                    )
                                ))}
                                <div className="mt-4 flex justify-end space-x-2">
                                    <button
                                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        onClick={() => {
                                            setFormData(item);
                                            setIsModalOpen(true);
                                        }}
                                        disabled={loading}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        onClick={() => handleDelete(item.id)}
                                        disabled={loading}
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                {formData.id ? 'Edit' : 'Add New'} {activeTab.slice(0, -1)}
                            </h3>
                            <form onSubmit={handleSubmit} className='text-gray-400'>
                                {renderForm()}
                                <div className="mt-4 flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
       </div>
    );
};

export default AdminDashboard;