import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Login from "./login";
import '../output.css'
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
        <ul className=' flex flex-row flex-3/4 bg-green-700 text-amber-50 font-sans' >
          <li className='p-1'>
            <Link to="/customers">Home</Link>
          </li>
         <li className='p-1'>
            <Link to="/about">About</Link>
          </li>
         <li className='p-1'>
            <Link to="/transact">Transaction</Link>
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
    </>
  :<Login />
};

export default Layout;