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
      const[transact,setTransact]=useState(true);
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
        },);
        
      
const handlelpay=()=>{
setPayment(true)
}

  return logedin? <div>
    <nav>
            <ul className=' flex flex-row flex-3/4 bg-white text-sm/6 text-sky-400 font-sans font-semibold shadow-lg' >
              <li className='p-1'>
                <Link to="/home">Home</Link>
              </li>
             <li className='p-1'>
                <Link to="/about">About</Link>
              </li>
             <li className='p-1'>
                <Link to="/acc">MyAccount</Link>
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
     <h1>Welcome <span style={{color:"red", fontSize:"16px"}}> {userloged.username}</span></h1>
<p> Your Balance is: {usern.Balance}</p>

     <form>
       <button className='text-sky-500' onClick={()=>setTransact(true)}>Transactions</button>     </form>
       {transact && (<table className="border-solid bg-white w-full p-2">
     <thead>
       <th className=' text-sky-500 text-left'>Date</th>
       <th className=' text-sky-500 text-left'>FirstName</th>
       <th className=' text-sky-500 text-left'>LastName</th>
       <th className=' text-sky-500 text-left'>Dailywithdrawl</th>
       <th className=' text-sky-500 text-left'>withdrawal</th>
       <th className=' text-sky-500 text-left'>deposit</th>
       <th className=' text-sky-500 text-left'>Description</th>
        <th className=' text-sky-500 text-left'>Amount</th>
       <th className=' text-sky-500 text-left'>Balance</th>

     </thead>
     <tbody>
       {user.map(u => {
         return <tr key={u.id} className='border-1'><td>{u.date}</td><td>{u.FirstName}</td><td>{u.LastName}</td><td>{u.dailywithdrawl}</td><td>{u.withdrawal}</td><td>{u.deposit}</td><td>{u.description}</td><td>{u.transferamount}</td><td>{u.Balance}</td></tr>;

       }
       )}
     </tbody>
   </table>)}


   <div>
    <h2>Sendmoney</h2>
    <p>{response}</p>
    <form>
      <input type='number' placeholder='enter receiver ACC' className='p-1 border-1 md:w-100 lg:w-45 m-1 sm:w-120 w-75 rounded-lg' required onChange={(e)=>(setReceiverAccount(e.target.value))} /><br/>
      <input type='number' placeholder='enter Amount' className='p-1 border-1 md:w-100 lg:w-45 sm:w-120 w-75 rounded-lg' required onChange={(e)=>(setAmount(e.target.value))} /><br/>
      <input type='text' placeholder='enter description' className='p-1 border-1 md:w-100 lg:w-45 m-1 sm:w-120 w-75 rounded-lg' required onChange={(e)=>(setDescription(e.target.value))} />
      <button  onClick={handletransfer} className='text-white hover:border-transparent cursor-pointer active:bg-sky-700 border-2 bg-sky-500 border-purple-200 hover:bg-purple-600 hover:text-white shadow-xl/20 p-1 pl-5 pr-5 mt-2 font-bold rounded-full'>Pay</button>

    </form>
   </div>
   </div>:<Logintwo />

 }
   



    
