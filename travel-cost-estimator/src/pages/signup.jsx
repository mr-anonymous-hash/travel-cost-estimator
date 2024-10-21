import { useState } from 'react';
import { useRouter } from 'next/router';
import { X } from 'lucide-react';
import './../app/globals.css';

export default function Signup() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, phone })
            });

            if (response.ok) {
                setIsSuccess(true);
                setPopupMessage('Signup successful! Redirecting to login...');
                setShowPopup(true);
                
                // Reset form
                setName('');
                setEmail('');
                setPhone('');
                setPassword('');

                // Redirect to login page after 2 seconds
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                const data = await response.json();
                setIsSuccess(false);
                setPopupMessage(data.message || 'Signup failed. Please try again.');
                setShowPopup(true);
            }
        } catch (error) {
            console.log(`Error while signup ${error}`);
            setIsSuccess(false);
            setPopupMessage('An error occurred. Please try again later.');
            setShowPopup(true);
        }
    };

    // Close popup after 3 seconds for error messages only
    const showTemporaryPopup = () => {
        if (!isSuccess) {  // Only auto-hide error messages
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);
        }
    };

    if (showPopup) {
        showTemporaryPopup();
    }

    return (
        <div className="bg-white flex justify-center items-center h-screen relative">
            {/* Popup */}
            {showPopup && (
                <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg max-w-sm flex items-center justify-between ${
                    isSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                    <span>{popupMessage}</span>
                    <button 
                        onClick={() => setShowPopup(false)}
                        className="ml-4 text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            <div className="min-w-[300px] mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center text-black">Sign Up</h1>
                <form onSubmit={handleSubmit} className="space-y-4 text-black">
                    <div>
                        <label htmlFor="name" className="block mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-1">Phone</label>
                        <input
                            type="tel"
                            id="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}