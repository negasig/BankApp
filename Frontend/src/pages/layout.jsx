import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Login from "./login";

const Layout = (props) => {
const [isauthonticated, setIsAuthenticated]=useState(props.isauthonticated)
if(!isauthonticated){
 return <h1>Please login</h1>
}
else{
return (
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

      <Outlet />
      
    </>

  )
}

};

export default Layout;