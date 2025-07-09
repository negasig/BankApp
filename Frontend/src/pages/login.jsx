import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'
import Layout from './layout';

function Login() {
       const[isauthonticated, setIsAuthenticated]=useState(false);
       const[username, setUsername]=useState("")
       const[password, setPassword]=useState("")
  

    const urll="http://localhost:3001/students/signin";
    const handlelogin=(event)=>{
       event.preventDefault();
        axios({
          method:'Post',
          url:urll,
          data:{
         username:username,
         password:password
          }
        }).then(res=>{
          setIsAuthenticated(res.data);
        })
    }
if(isauthonticated){
return <Layout isauthonticated={isauthonticated}  />
} 
   return <>
      <div>login</div>
    <form onSubmit={handlelogin}>
        <label htmlFor="username">username</label>
        <input type='text' id='username' placeholder='enter username' onChange={(e)=>setUsername(e.target.value)}/><br/>
        <label htmlFor="password" >password</label>
        <input type='password' id='password' placeholder='enter password' onChange={(e)=>setPassword(e.target.value)} />
        <input type="submit" />
    </form>
  </>
 
}

export default Login