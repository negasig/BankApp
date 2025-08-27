import { jwtDecode } from 'jwt-decode';
  import axios from 'axios';
    import React, { useEffect, useState } from 'react'
    import '../output.css'

    import { Link, Outlet, useNavigate } from 'react-router-dom';
import Logintwo from '../pages/login';
import Login from '../pages/login';
export default function SendMoney() {
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
         nav("/login")
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
        
      


  return logedin? <div>
    <h1 className='text-center font-bold'>Welcome To ABC Bank</h1>
    <nav>
            <ul className='flex flex-row flex-3/4 bg-white text-sm/6 text-black font-sans font-semibold shadow-lg' >
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
     <h1>Welcome <span style={{color:"red", fontSize:"16px"}}> {userloged.username}</span></h1>
      <h2 className='flex justify-center flex-wrap mt-5 p-4 font-bold ' >Send Money</h2>
   <div className='flex justify-center flex-wrap mt-5 p-4'>
    <form>
         <input type='number' placeholder='Enter Account' id='username' required onChange={(e)=>setReceiverAccount(e.target.value)} className='p-2 border-1 md:w-100 lg:w-90 sm:w-120 w-75 rounded-lg mb-1'/><br></br>
      <input type='number' placeholder='Enter Amount' id='username' required onChange={(e)=>setAmount(e.target.value)} className='p-1 border-1 md:w-100 lg:w-90 sm:w-120 w-75 rounded-lg mb-1'/><br></br>
      <input type='text' placeholder='Enter Description' id='username' required onChange={(e)=>setDescription(e.target.value)} className='p-1 border-1 md:w-100 lg:w-90 sm:w-120 w-75 rounded-lg mb-1'/><br></br>
      <button  onClick={handletransfer} className='text-white hover:border-transparent cursor-pointer active:bg-sky-700 border-1 bg-sky-500 border-purple-200 hover:bg-purple-600 hover:text-white shadow-xl/20 p-1 pl-5 ml-70 pr-5 mt-2 font-bold rounded-full'>Pay</button>
    </form>
   </div>
   </div>:<Login />

 }
   



    
