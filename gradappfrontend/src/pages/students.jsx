import axios from 'axios';
import React, { useEffect, useState } from 'react'

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
<table>
    <thead>
        <th>FirstName</th>
        <th>lastname</th>
        <th>age</th>
    </thead>
    <tbody>
{users.map(u=>{
         return  <tr key={u.id}><td>{u.FirstName}</td><td>{u.LastName}</td> <td>{u.Age}</td></tr>
         
        }
        )}
 
    </tbody>
</table>
    
        
  
  </>
}
