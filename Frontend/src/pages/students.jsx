import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../output.css'
export default function Students() {
    const[users, setUsers]=useState([]);
   
    
    const url="http://localhost:3001/students/findCustomers";
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
  return<>
  <h1>Customers</h1>
<table className="border-solid w-full p-2">
    <thead>
        <th className='bg-green-700 text-white text-left'>FirstName</th>
        <th className='bg-green-700 text-white text-left'>LastName</th>
        <th className='bg-green-700 text-white text-left'>Age</th>
        <th className='bg-green-700 text-white text-left'>AccountNumber</th>
        <th className='bg-green-700 text-white text-left'>Dailywithdrawl</th>
        <th className='bg-green-700 text-white text-left'>Balance</th>
    </thead>
    <tbody>
{users.map(u=>{
         return  <tr key={u.id} className='border-1'><td>{u.FirstName}</td><td>{u.LastName}</td> <td>{u.Age}</td><td>{u.AccountNumber}</td><td>{u.dailywithdrawl}</td><td>{u.Balance}</td></tr>
         
        }
        )}
 
    </tbody>
</table>
 
  </>
}
