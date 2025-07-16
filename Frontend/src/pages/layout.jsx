import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Login from "./login";

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
        <ul>
          <li>
            <Link to="/customers">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/transact">Transaction</Link>
          </li>
            <li>
            <Link to="/profile">profile</Link>
          </li>
        </ul>
      </nav>
 <button onClick={handlelogout}>login</button>
      <Outlet />
    </>
  :<Login />
};

export default Layout;