import { useState } from 'react';
// import Layout from '../components/Layout';
import '@/app/globals.css'
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('form submitted')

    try{
      const res = await axios.post('http://localhost:8000/api/adminlogin', {
        username: username,
        password: password
    })

      if(res.status === 200){
        const {user,token} =  res.data
        localStorage.setItem('user',JSON.stringify(user))
        localStorage.setItem('token', token)
        window.location.href = '/admin'
      }else{
        console.log('login failed')
      }
    }catch(error){
      console.log(`Error while login ${error}`)
    }
  };

  return (
    <div className="bg-white flex justify-center items-center h-screen">
      <div className="min-w-[300px] mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div>
            <label htmlFor="email" className="block mb-1">Username</label>
            <input
              type="text"
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Login
          </button>
        </form>
        {/* <div className='mt-10'>
            <p className='text-black'>don't have account ? <a href="/signup" className=' text-blue-700 hover:text-blue-500'>Register here</a></p>
        </div> */}
      </div>
    </div>
  );
}