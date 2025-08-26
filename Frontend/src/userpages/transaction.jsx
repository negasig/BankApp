import { jwtDecode } from 'jwt-decode';
  import axios from 'axios';
    import React, { useEffect, useState } from 'react'
    import '../output.css'

    import { Link, Outlet, useNavigate } from 'react-router-dom';
import Logintwo from '../pages/login';
import Login from '../pages/login';
export default function Transaction() {
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
                <Link to="/acc">MyAccount</Link>
              </li>
                <li className='p-1'>
                 <button onClick={handlelogout}>logout</button>
          <Outlet />
              </li>
            </ul>
          </nav>

      <table className="border-solid bg-white w-full p-2 ml-1.5 ">
     <thead className='bg-green-600'>
       <th className=' text-white text-left border-1'>Date</th>
       <th className=' text-white  text-left border-1'>FirstName</th>
       <th className=' text-white text-left border-1'>LastName</th>
      
       <th className=' text-white text-left border-1'>Withdrawal</th>
       <th className=' text-white text-left border-1'>Deposit</th>
       <th className=' text-white  text-left border-1'>Description</th>
        <th className=' text-white  text-left border-1'>Tranfer Amount</th>
       <th className=' text-white  text-left border-1'>Balance</th>

     </thead>
     <tbody>
       {user.map(u => {
         return <tr key={u.id} className='border-1'><td className='border-1 pl-1.5' >{new Date(u.date).toLocaleDateString("en-GB",{
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })}</td><td className='border-1  pl-1.5'>{u.FirstName}</td><td className='border-1 pl-1.5'>{u.LastName}</td><td className='border-1 pl-1.5'>{u.withdrawal>0? `-Br ${u.withdrawal}`: " "}</td><td className='border-1 pl-1.5'>{u.deposit>0?`+Br ${u.deposit}`: ""}</td><td className='border-0.5 pl-1.5'>{u.description}</td><td className='border-1 pl-1.5'>{u.transferamount>0?`+Br ${u.transferamount}`:u.transferamount<0?`-Br ${-u.transferamount}`:""}</td><td className='border-1 pl-1.5'>${u.Balance}</td></tr>;

       }
       )}
     </tbody>
   </table>


   
   </div>:<Login />

 }
   



    
