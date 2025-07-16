import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import Layout from './layout';
import { useNavigate } from 'react-router-dom';

function Login() {
       const[isauthonticated, setIsAuthenticated]=useState(localStorage.getItem("login"));
       const[username, setUsername]=useState("")
       const[password, setPassword]=useState("")
      const nav=useNavigate();

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
          
              setIsAuthenticated(res.data)
              localStorage.setItem("login", res.data)
        })
        if(isauthonticated){
          nav("/home")
        }
        else{
          nav("/")
        }
    }


return<>
      <div>login</div>
    <form>
        <label htmlFor="username">username</label>
        <input type='text' id='username' autoComplete='off' placeholder='enter username' onChange={(e)=>setUsername(e.target.value)}/><br/>
        <label htmlFor="password" >password</label>
        <input type='password' id='password' autoComplete='off' placeholder='enter password' onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={handlelogin}>Login</button>
    </form>
  </>
 
}

export default Login