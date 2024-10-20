import { useRouter } from 'next/router';
import './../app/globals.css';
import Navbar from './components/Navbar';

const Welcome = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login'); 
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col" 
    style={{backgroundImage: 'url(http://localhost:8000/image/travel.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center' }} >
      <Navbar bg={true}/>
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <div className="bg-white bg-opacity-5 backdrop-blur-md border border-gray-300 rounded-lg shadow-lg p-8 max-w-[750px]">
          <h1 className="text-4xl font-bold mb-6 text-center text-black">
            Welcome to Travel Cost Estimator!
          </h1>
          <p className="text-lg mb-4 text-center text-black">
            Plan your trips with ease! Our Travel Cost Estimator helps you calculate your travel expenses,
            allowing you to budget effectively for your journeys. Whether you're traveling solo or with friends,
            we've got you covered!
          </p>
          <p className="text-lg mb-8 text-center text-black">
            Discover how much your next adventure will cost and find ways to save on your travel expenses.
            Let's make your travel planning as smooth as possible!
          </p>
          <div className='flex justify-center items-center'>
          <button
            className="px-6 py-2 text-lg font-semibold   bg-blue-700 rounded hover:bg-blue-500"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
