import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Login from "./login";
import '../output.css'
import myimg from '../images/myimg.jpg'
const Layout = () => {
      const nav=useNavigate();
      const[islogedin, setislogedin]=useState(localStorage.getItem("login"))
      const handlelogout=()=>{
  localStorage.removeItem("login")
 setislogedin(false);
    }
    useEffect(()=>{
   if(islogedin==="false"){
    setislogedin(false);
    nav("/")
   }
    },[islogedin])
  return islogedin?
    <>
      <nav>
        <ul className=' flex flex-row flex-3/4 bg-white text-black font-sans font-semibold' >
          <li className='p-1'>
            <Link to="/home">Home</Link>
          </li>
          <li className='p-1'>
            <Link to="/customers">Customers</Link>
          </li>
         <li className='p-1'>
            <Link to="/about">About</Link>
          </li>
         <li className='p-1'>
            <Link to="/acc">MayAccount</Link>
          </li>
         <li className='p-1'>
            <Link to="/profile">profile</Link>
          </li>
            <li className='p-1'>
             <button onClick={handlelogout}>logout</button>
      <Outlet />
          </li>
        </ul>
      </nav>
      <h1>Welcome to the best bank in the world</h1>
      <img src={myimg} alt="aklk" style={{width:'100%'}}/>
    </>
  :<Login />
};

export default Layout;