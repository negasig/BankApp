import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from './layout';

export default function Login() {
    const[username, setUsername]=useState("")
    const[password, setPassword]=useState("")
    const[islogedin, setislogedin]=useState(false)
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
  }
    },[islogedin])
  return islogedin?<Layout />:<>
  
      <div>login</div>
      <form onSubmit={handlesubmit}>
        <input type='text' placeholder='username' onChange={(e)=>setUsername(e.target.value)} />
        <input type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)} />
        <input type='submit' />
      </form>
  </>


  
}
