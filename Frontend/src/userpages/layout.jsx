import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Login from "../pages/logintest";
import '../output.css'

const Layout = () => {
      const nav=useNavigate();
      const[islogedin, setislogedin]=useState(localStorage.getItem("logintwo"))
        const handlelogout=()=>{
      localStorage.removeItem("logintwo")
         nav("/login")
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
        <ul className=' flex flex-row flex-3/4 bg-white text-sm/6 text-sky-400 font-sans font-semibold shadow-lg' >
              <li className='p-1'>
                <Link to="/user">Home</Link>
              </li>
              <li className='p-1'>
                <Link to="/sendmoney">SendMoney</Link>
              </li>
              <li className='p-1'>
                <Link to="/transact">Transactions</Link>
              </li>

            <li className='p-1'>
             <button onClick={handlelogout}>logout</button>
      <Outlet />
          </li>
        </ul>
      </nav>
      <h1>Welcome to the best bank in the world</h1>
     
    </>
  :<Login />
};

export default Layout;