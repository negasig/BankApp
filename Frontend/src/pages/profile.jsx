import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../output.css'
export default function Profile() {
    const[user, setUser]=useState([]);
   const[accountnumber, setAccountnumber]=useState(0);
    
    const urll="http://localhost:3001/students/transaction";
    const finduser=()=>{
        axios({
          method:'Post',
          url:urll,
          data:{
         AccountNumber:accountnumber
          }
        }).then(res=>{
          setUser(res.data);
        })
    }
    useEffect(()=>{
finduser();

    },[accountnumber])
  return<>
  <h1>Customer details</h1>
<table className="border-solid table-column bg-white w-full p-2">
    <thead>
        <th className='bg-green-700 text-white text-left'>Date</th>
        <th className='bg-green-700 text-white text-left'>FirstName</th>
        <th className='bg-green-700 text-white text-left'>LastName</th>
        <th className='bg-green-700 text-white text-left'>Dailywithdrawl</th>
        <th className='bg-green-700 text-white text-left'>withdrawal</th>
        <th className='bg-green-700 text-white text-left'>deposit</th>
        <th className='bg-green-700 text-white text-left'>Description</th>
        <th className='bg-green-700 text-white text-left'>Balance</th>
        
        
    </thead>
    <tbody>
{user.map(u=>{
         return  <tr key={u.id} className='border-1'><td>{u.date}</td><td>{u.FirstName}</td><td>{u.LastName}</td><td>{u.dailywithdrawl}</td><td>{u.withdrawal}</td><td>{u.deposit}</td><td>{u.description}</td><td>{u.Balance}</td></tr>
         
        }
        )}
 
    </tbody>
</table>
<div>
   <form onClick={finduser}>
    <input type='text' onChange={(e)=>setAccountnumber(e.target.value)} />
    <input type='submit'/>
    </form> 

</div>
   

  
  </>
}
