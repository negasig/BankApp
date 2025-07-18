import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from './layout';

export default function Login() {
    const[username, setUsername]=useState("")
    const[password, setPassword]=useState("")
    const[islogedin, setislogedin]=useState(false)
     const[errmsg, seterrmsg]=useState("")
        const urll="http://localhost:3001/students/signin";
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
   <div className='ml-100'>
      <div className='ml-34 font-bold mt-20'>login</div>
      <h1 className='ml-30 font-bold mt-2 text-red-600'>{errmsg}</h1>
      <form>
        <label htmlFor='username'>UserName</label><br></br>
        <input type='text' placeholder='username' id='username' required onChange={(e)=>setUsername(e.target.value)} className='p-2 border-1 w-md rounded-lg'/><br></br>
        <label htmlFor="password">Password</label><br></br>
        <input type='password' placeholder='password' id='password' required onChange={(e)=>setPassword(e.target.value)} className='p-2 border-1 w-md rounded-lg'/><br></br>

        <button onClick={handlesubmit} className='text-purple-500 hover:border-transparent active:bg-purple-700 border-2 border-purple-200 hover:bg-purple-600 hover:text-white shadow-xl/20 p-1 pl-5 pr-5 mt-2 font-bold rounded-full'>LOGIN</button>
      </form>
        </div>
  </>  
}
