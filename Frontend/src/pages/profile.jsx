import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../output.css'
import Login from './login';
import { Link, Outlet, useNavigate } from 'react-router-dom';
export default function Profile() {
    const[user, setUser]=useState([]);
   const[accountnumber, setAccountnumber]=useState(0);
   const[error, setError]=useState("")
    const[islogedin, setislogedin]=useState(localStorage.getItem("login"))
    const urll="http://localhost:3002/customers/transaction";
    const nav=useNavigate();
    const handlelogout=()=>{
  localStorage.removeItem("login")
 setislogedin(false);
 nav("/")
    }
    const finduser=(event)=>{
       event.preventDefault();
        axios({
          method:'Post',
          url:urll,
          data:{
         AccountNumber:accountnumber
          }
        }).then(res=>{
          setUser(res.data);
        })
        .catch(
    setError("Account not found")
        )
    }

return islogedin==="true"?<>
<nav>
        <ul className=' flex flex-row flex-3/4 bg-white text-sm/6 text-sky-400 font-sans font-semibold shadow-lg' >
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
<h1 style={{color:"red"}}>{error}</h1>
  <div>
    
   <form onSubmit={finduser}>
    <label htmlFor="">Enter Account number</label>
    <input type='number'  onChange={(e)=>setAccountnumber(e.target.value)} required placeholder='accountnumber' className='border-1 rounded-md' />
    <button className='text-sky-500'>Seach</button>
    </form> 
</div>
<table className="border-solid bg-white w-full p-2">
    <thead>
        <th className=' text-sky-500 text-left'>Date</th>
        <th className=' text-sky-500 text-left'>FirstName</th>
        <th className=' text-sky-500 text-left'>LastName</th>
        <th className=' text-sky-500 text-left'>Dailywithdrawl</th>
        <th className=' text-sky-500 text-left'>withdrawal</th>
        <th className=' text-sky-500 text-left'>deposit</th>
        <th className=' text-sky-500 text-left'>Description</th>
        <th className=' text-sky-500 text-left'>Balance</th>
        
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
