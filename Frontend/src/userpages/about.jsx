import React, { useState } from 'react'
import "../output.css"
import Login from '../pages/logintest'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Logintwo from '../pages/login'
export default function About() {
  const[islogedin, setislogedin]=useState(localStorage.getItem("logintwo"))
  const nav=useNavigate();
        const handlelogout=()=>{
      localStorage.removeItem("logintwo")
         nav("/login")
        }
  return  islogedin?<>
      <nav>
        <ul className=' flex flex-row flex-3/4 text-sm/6 bg-white text-black font-sans font-semibold shadow-lg' >
          <li className='p-1'>
            <Link to="/admin">Home</Link>
          </li>
          <li className='p-1'>
            <Link to="/customers">Customers</Link>
          </li>
         <li className='p-1'>
            <Link to="/acc">MyAccount</Link>
          </li>

            <li className='p-1'>
             <button onClick={handlelogout}>logout</button>
      <Outlet />
          </li>
        </ul>
      </nav>
<h1>About The Bank</h1>
  </>:<Logintwo />
}
