import React from 'react'
import Login from '../pages/login'
import { Link, Outlet } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function Deposit() {
        const[user, setUser]=useState([]);
   const[accountnumber, setAccountnumber]=useState(0);
   const[error, setError]=useState("")
    const[islogedin, setislogedin]=useState(true)


    const urll="http://localhost:3002/customers/transaction";
    const nav=useNavigate();
    const log=localStorage.getItem("logintwo");
        const decoded=jwtDecode(JSON.stringify(log));
    const userloged=jwtDecode(log);
         const handlelogout=()=>{
      localStorage.removeItem("logintwo")
     nav("/login")
        }
  return islogedin===true && decoded.role==="admin"?<>

<nav>
        <ul className=' flex flex-row flex-3/4 text-sm/6 pb-1 bg-white text-black font-sans font-semibold shadow-md' >
          <li className='p-1'>
            <Link to="/admin">Home</Link>
          </li>
          <li className='p-1'>
            <Link to="/customers">Customers</Link>
          </li>
         <li className='p-1'>
            <Link to="/about">About</Link>
          </li>
         <li className='p-1'>
            <Link to="/withdraw">Dithdraw</Link>
          </li>
                   <li className='p-1'>
            <Link to="/deposit">Deposit</Link>
          </li>
            <li className='p-1'>
             <button onClick={handlelogout}>logout</button>
      <Outlet />
          </li>
        </ul>
      </nav>
        <p>Deposit</p>
  </>
   :<Login />
  
}


