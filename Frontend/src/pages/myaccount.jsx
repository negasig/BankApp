import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../output.css'
import { Link, Outlet } from 'react-router-dom';
import Login from './login';
export default function Myaccount() {
    const[user, setUser]=useState([]);
   const[accountnumber, setAccountnumber]=useState(0);
   const[islogedin, setislogedin]=useState(localStorage.getItem("login"))
    const urll="http://localhost:3002/customers/transaction";
    const findusers=()=>{
        axios({
          method:'Post',
          url:urll,
          data:{
         AccountNumber:4444555
          }
        }).then(res=>{
          setUser(res.data);
        })
    }
    useEffect(()=>{
findusers();

    },[accountnumber])
          const handlelogout=()=>{
  localStorage.removeItem("login")
 setislogedin(false);
    }
  return islogedin==="true"?<>
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
  <h1>Customer details</h1>
<table className="border-solid bg-white w-full p-2">
    <thead>
        <th className=' text-black text-left'>Date</th>
        <th className=' text-black text-left'>FirstName</th>
        <th className=' text-black text-left'>LastName</th>
        <th className=' text-black text-left'>Dailywithdrawl</th>
        <th className=' text-black text-left'>withdrawal</th>
        <th className=' text-black text-left'>deposit</th>
        <th className=' text-black text-left'>Description</th>
        <th className=' text-black text-left'>Balance</th>
        
        
    </thead>
    <tbody>
{user.map(u=>{
         return  <tr key={u.id} className='border-1'><td>{u.date}</td><td>{u.FirstName}</td><td>{u.LastName}</td><td>{u.dailywithdrawl}</td><td>{u.withdrawal}</td><td>{u.deposit}</td><td>{u.description}</td><td>{u.Balance}</td></tr>      
        }
        )}
 
    </tbody>
</table>
  </>:<Login />
}
