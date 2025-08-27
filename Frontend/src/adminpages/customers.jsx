import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../output.css'
import Login from '../pages/logintest';
import { Link, Outlet, useNavigate } from 'react-router-dom';
export default function Customers() {
    const[users, setUsers]=useState([]);
   const[islogedin, setislogedin]=useState(localStorage.getItem("logintwo"))
   const nav=useNavigate();
   const handlelogout=()=>{
  localStorage.removeItem("logintwo")
 setislogedin(false);
  nav("/login")
    }
    const url="http://localhost:3002/customers/findCustomers";
    const findusers=()=>{
        axios.get(url).then(
            res=>{
                setUsers(res.data);
            }
        )
    }
    useEffect(()=>{
     findusers();

    },[users])

  return islogedin?<>
   <h1 className='text-center font-bold'>Welcome To ABC Bank</h1>
        <nav>
                <ul className=' flex flex-row flex-3/4 text-sm/6 pb-1 bg-white text-black font-sans font-semibold shadow-md' >
                  <li className='p-1'>
                    <Link to="/admin">Home</Link>
                  </li>
                  <li className='p-1'>
                    <Link to="/customers">Customers</Link>
                  </li>
                    <li className='p-1'>
                     <button onClick={handlelogout}>logout</button>
              <Outlet />
                  </li>
                </ul>
              </nav>
  <h1>Customers</h1>
<table className="border-solid w-full p-2 mt-2">
    <thead>
        <th className=' text-black text-left'>FirstName</th>
        <th className=' text-black text-left'>LastName</th>
        <th className=' text-black text-left'>Age</th>
        <th className=' text-black text-left'>AccountNumber</th>
        <th className=' text-black text-left'>Dailywithdrawl</th>
        <th className=' text-black text-left'>Balance</th>
    </thead>
    <tbody>
{users.map(u=>{
         return  <tr key={u.id} className='border-1'><td>{u.FirstName}</td><td>{u.LastName}</td> <td>{u.Age}</td><td>{u.AccountNumber}</td><td>{u.dailywithdrawl}</td><td>{u.Balance}</td></tr>
         
        }
        )}
 
    </tbody>
</table>
  </>:<Login />
}
