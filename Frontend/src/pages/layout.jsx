import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Login from "./login";

const Layout = () => {
  const nav=useNavigate();
const [isauthonticated, setIsAuthenticated]=useState(localStorage.getItem("login"))

const handlelogout=(event)=>{
  event.preventDefault();
localStorage.removeItem("login")
localStorage.clear("login")
setIsAuthenticated(localStorage.getItem("login"));
  nav("/")
}
if(!isauthonticated){
  nav("/")
}
useEffect(()=>{
  const loginStatus = localStorage.getItem("login");
  setIsAuthenticated(loginStatus);
   if (!loginStatus || loginStatus === "false") {
    nav("/");
  }
},[nav])
return isauthonticated?  
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
 <button onClick={handlelogout}>logout</button>
      <Outlet />
      
    </>
:<Login />

};

export default Layout;