import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../userpages/layout';
import { jwtDecode } from 'jwt-decode';
export default function Login() {
    const[username, setUsername]=useState("")
    const[password, setPassword]=useState("")
    const[islogedin, setislogedin]=useState(false)
     const[errmsg, seterrmsg]=useState("")
     const [role, setRole]=useState("")
        const urll="http://localhost:3002/customers/logincs";
        const nav=useNavigate();
    const handlesubmit=(e)=>{

        axios({
               method:'Post',
               url:urll,
               data:{
              username:username,
              password:password
               }
             }).then(res=>{
             if(JSON.stringify(res).includes(".")){

             
               localStorage.setItem("logintwo", res.data);
             }      
              else{
             seterrmsg("Incorrect");
             }
            })
       
            
    }
    const handlelogin=()=>{
       const log=localStorage.getItem("logintwo")
  if(log && log.length>0){
    const decoded=jwtDecode(JSON.stringify(log));
    setRole(decoded.role);
  }
 if (role==="admin"){
    nav("/admin")
  }
  else if(role==="user"){
    nav("/user")
  }
    }
    useEffect(()=>{

    handlelogin();
       
    },[role])
    
  return islogedin?<Layout />:<>
  <div>
    <h1 className='text-center font-bold'>Welcome To ABC Bank</h1>
    <nav className='ml-3.5 '>
            <ul className=' flex flex-row flex-3/4  bg-white text-sm/6 text-sky-400 font-sans font-semibold shadow-lg' >
              <li className='p-1'>
                <Link to="/about">About us</Link>
              </li>
            </ul>
          </nav>
  </div>

        
      <h1 className='font-bold mb-0.5 text-red-500 flex items-center justify-center'>{errmsg}</h1><br></br>
        <div className=' font-bold flex items-center justify-center text-2xl '>Secure Login</div><br/>
   <div className='flex items-center justify-center flex-wrap mt-0'>

      <form>
        
        <label htmlFor='username'>UserName</label><br></br>
        <input type='text' placeholder='username' id='username' required onChange={(e)=>setUsername(e.target.value)} className='p-1 border-1 md:w-100 lg:w-90 sm:w-120 w-75 rounded-lg'/><br></br>
        <label htmlFor="password">Password</label><br></br>
        <input type='password' placeholder='password' id='password' required onChange={(e)=>setPassword(e.target.value)} className='p-1 border-1 md:w-100 sm:w-120 lg:w-90 w-75 rounded-lg'/><br></br>

        <button onClick={handlesubmit} className='text-white hover:border-transparent cursor-pointer active:bg-sky-700 border-2 bg-sky-500 border-purple-200 hover:bg-purple-600 ml-65 hover:text-white shadow-xl/20 p-1 pl-5 pr-5 mt-2 font-bold rounded-full'>LOGIN</button>
      </form>
        </div>
  </>  
}
