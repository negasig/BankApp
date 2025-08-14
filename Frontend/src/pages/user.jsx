import { jwtDecode } from 'jwt-decode';
  import axios from 'axios';
    import React, { useEffect, useState } from 'react'
    import '../output.css'

    import { Link, Outlet, useNavigate } from 'react-router-dom';
import Logintwo from './logintwo';
export default function User() {
      const log=localStorage.getItem("logintwo");
      const userloged=jwtDecode(log);
      const[user, setUser]=useState([]);
      const[transact,setTransact]=useState(false);
      const[usern, setUsern]=useState({});
      const[logedin, setislogedin]=useState(true)
      const[receiverAccount, setReceiverAccount]=useState(0)
      const[amount, setAmount]=useState(0)
      const[payment, setPayment]=useState(false)
      const[response, setResponse]=useState("");
      const[description, setDescription]=useState("");
        const urll="http://localhost:3002/customers/transaction";
        const url2="http://localhost:3002/customers/findbyAcc/";
        const urlt="http://localhost:3002/customers/transfer";
        const nav=useNavigate();
        const handlelogout=()=>{
      localStorage.removeItem("logintwo")
         nav("/logtwo")
        }
        const finduser=()=>{
    
            axios({
              method:'Post',
              url:urll,
              data:{
             AccountNumber:userloged.accountnumber
              }
            }).then(res=>{
              setUser(res.data);
            })
        }
        const finduserbyacc=()=>{
    
            axios({
              method:'Post',
              url:url2,
              data:{
             AccountNumber:userloged.accountnumber
              }
            }).then(res=>{
              setUsern(res.data);
            })
        }
        const data={
            "fromACC":userloged.accountnumber,
            "toACC":receiverAccount,
            "amount":Number(amount),
            "descri":description
        }
        const handletransfer=()=>{
          axios.post(urlt,
             data,
             {
  headers: {
    'Content-Type': 'application/json'
  }
}
          ).then(r=>{
            setResponse(r.data);
          })
        }
        useEffect(()=>{
         finduser();
          finduserbyacc();
        },[]);
        



  return logedin && userloged.role==="user"? <div>
    <nav>
            <ul className=' flex flex-row flex-3/4 bg-white text-sm/6 text-sky-400 font-sans font-semibold shadow-lg' >
              <li className='p-1'>
                <Link to="/home">Home</Link>
              </li>
              <li className='p-1'>
                <Link to="/sendmoney">SendMoney</Link>
              </li>
              <li className='p-1'>
                <Link to="/transact">Transactions</Link>
              </li>
             <li className='p-1'>
                <Link to="/acc">MyAccount</Link>
              </li>
                <li className='p-1'>
                 <button onClick={handlelogout}>logout</button>
          <Outlet />
              </li>
            </ul>
          </nav>
     <h1>Welcome <span style={{color:"red", fontSize:"16px"}}> {userloged.username}</span></h1>
<p> Your Balance is: {usern.Balance}</p>

     
   </div>:<Logintwo />

 }
   



    
