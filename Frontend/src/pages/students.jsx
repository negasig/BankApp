import axios from 'axios';
import React, { useEffect, useState } from 'react'
import 'tailwindcss'
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
  <h1>Users</h1>
<table class="table">
    <thead>
        <th>FirstName</th>
        <th>lastname</th>
        <th>age</th>
        <th>Accountnumber</th>
        <th>Balance</th>
        <th>dailywithdrawl</th>
    </thead>
    <tbody>
{users.map(u=>{
         return  <tr key={u.id} className="bg-emerald-200"><td>{u.FirstName}</td><td>{u.LastName}</td> <td>{u.Age}</td><td>{u.AccountNumber}</td><td>{u.Balance}</td><td>{u.dailywithdrawl}</td></tr>
         
        }
        )}
 
    </tbody>
</table>
    
        
  
  </>
}
