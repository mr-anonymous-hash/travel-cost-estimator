import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaRegCircleUser } from 'react-icons/fa6'

const Navbar = ({bg}) => {
  const bgClass = bg === true ? 'bg-blue-900' : 'bg-transparent';
  const textcolor = bg === true ? 'text-white' : 'text-black';
  const [islogged, setislogged] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setislogged(true);
    }
  }, []);
  
  return (
    <div>
      <nav className={`${bgClass} ${textcolor} p-4`}>
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            {/* <img src="/logo.png" alt="OneTravel Logo" className="h-8" /> */}
            <span className="text-xl font-bold">TravelCalc</span>
          </div>
          {/* Links */}
          <div className="flex space-x-6 items-center">
            {/* <Link href="/help" className="hover:underline">Help</Link> */}
            {
              !islogged && (
                <Link href="/login" className="hover:underline flex items-center"><FaRegCircleUser className='mr-1'/>Sign In</Link>
              )
            }
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
