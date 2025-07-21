import React, { useState } from 'react'
import "../output.css"
import Login from './login'
import { Link, Outlet } from 'react-router-dom'
export default function About() {
  const[islogedin, setislogedin]=useState(localStorage.getItem("login"))
        const handlelogout=()=>{
  localStorage.removeItem("login")
 setislogedin(false);
    }
  return  islogedin==="true"?<>
      <nav>
        <ul className=' flex flex-row flex-3/4 text-sm/6 bg-white text-black font-sans font-semibold shadow-lg' >
          <li className='p-1'>
            <Link to="/home">Home</Link>
          </li>
          <li className='p-1'>
            <Link to="/customers">Customers</Link>
          </li>
         <li className='p-1'>
            <Link to="/about">About</Link>
          </li>
         <li className='p-1'>
            <Link to="/acc">MyAccount</Link>
          </li>
         <li className='p-1'>
            <Link to="/profile">profile</Link>
          </li>
            <li className='p-1'>
             <button onClick={handlelogout}>logout</button>
      <Outlet />
          </li>
        </ul>
      </nav>
<h1>About The Bank</h1>
  </>:<Login />
}
