import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../userpages/layout';
export default function Test() {
    const[username, setUsername]=useState("")
    const[password, setPassword]=useState("")
    const[islogedin, setislogedin]=useState(false)
     const[errmsg, seterrmsg]=useState("")
        const urll="http://localhost:3002/customers/signin";
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
               localStorage.setItem("login", res.data);
             })
    }
    useEffect(()=>{
  const log=localStorage.getItem("login")
  
  if(log==="true"){
    setislogedin(true);
    nav("/home")
  }
  else if(log==="false"){
    seterrmsg("Invalid Credientials")
    nav("/")
  }
    },[islogedin])
  return islogedin==="true"?<Layout />:<>
  <div className=' text-sm font-bold flex items-center justify-center'>Login</div><br/>
        
      <h1 className='font-bold mb-0.5 text-red-500 flex items-center justify-center'>{errmsg}</h1><br></br>
   <div className='flex items-center justify-center flex-wrap mt-1'>

      <form>
        
        <label htmlFor='username'>UserName</label><br></br>
        <input type='text' placeholder='username' id='username' required onChange={(e)=>setUsername(e.target.value)} className='p-1 border-1 md:w-100 lg:w-90 sm:w-120 w-75 rounded-lg'/><br></br>
        <label htmlFor="password">Password</label><br></br>
        <input type='password' placeholder='password' id='password' required onChange={(e)=>setPassword(e.target.value)} className='p-1 border-1 md:w-100 sm:w-120 lg:w-90 w-75 rounded-lg'/><br></br>

        <button onClick={handlesubmit} className='text-white hover:border-transparent cursor-pointer active:bg-sky-700 border-2 bg-sky-500 border-purple-200 hover:bg-purple-600 hover:text-white shadow-xl/20 p-1 pl-5 pr-5 mt-2 font-bold rounded-full'>LOGIN</button>
      </form>
        </div>
  </>  
}
