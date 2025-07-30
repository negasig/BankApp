import { jwtDecode } from 'jwt-decode';
  import axios from 'axios';
    import React, { useEffect, useState } from 'react'
    import '../output.css'

    import { Link, Outlet, useNavigate } from 'react-router-dom';
export default function User() {
      const log=localStorage.getItem("logintwo")
      const userloged=jwtDecode(log);
      const[user, setUser]=useState([]);
      const[transact,setTransact]=useState(false);
     
        const urll="http://localhost:3002/customers/transaction";
        const nav=useNavigate();
        const handlelogout=()=>{
      localStorage.removeItem("logintwo")
     nav("/logtwo")
        }
        const finduser=()=>{
    
            axios({
              method:'Post',
              url:urll,
              data:{
             AccountNumber:userloged.accountnumber
              }
            }).then(res=>{
              setUser(res.data);
            })
        }
        useEffect(()=>{
          finduser();
        },[]);
        console.log(user);
        
 

  
  if(transact){
    return <><table className="border-solid bg-white w-full p-2">
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
       {user.map(u => {
         return <tr key={u.id} className='border-1'><td>{u.date}</td><td>{u.FirstName}</td><td>{u.LastName}</td><td>{u.dailywithdrawl}</td><td>{u.withdrawal}</td><td>{u.deposit}</td><td>{u.description}</td><td>{u.Balance}</td></tr>;

       }
       )}
     </tbody>
   </table>
   </>
  }
    
  return <div>
    
     <h1>Welcome <span> {userloged.username}</span></h1>
     <nav>
       <ul className=' flex flex-row flex-3/4 bg-white text-sm/6 text-sky-400 font-sans font-semibold shadow-lg'>
         <li className='p-1'>
           <button onClick={handlelogout}>logout</button>
           <Outlet />
         </li>
       </ul>
     </nav>

     <form>
       <button className='text-sky-500' onClick={()=>setTransact(true)}>Seach</button>
     </form>
   </div>
 
 }
   
    
