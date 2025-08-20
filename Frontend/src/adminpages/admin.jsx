import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../output.css'
import Login from '../pages/logintest';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Logintwo from '../pages/login';
export default function Admin() {
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
if(user.length>0){
    return <table className="border-solid bg-white w-full p-2">
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
             <button onClick={handlelogout}>logout</button>
      <Outlet />
          </li>
        </ul>
      </nav>
     <h1>Welcome <span style={{color:"red", fontSize:"16px"}}> {userloged.username}</span></h1>
<h1 style={{color:"red"}}>{error}</h1>
  <div>
    
   <form onSubmit={finduser}>
    <label htmlFor="">Enter Account number</label>
    <input type='number'  onChange={(e)=>setAccountnumber(e.target.value)} required placeholder='accountnumber' className='border-1 rounded-md' />
    <button className='text-sky-500'>Seach</button>
    </form> 
    {user.length>0 ?(<table className="border-solid bg-white w-full p-2">
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
):"no result"}
</div>


  </>:<Login />

}
