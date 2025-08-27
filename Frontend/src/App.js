
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/about';
import Customers from '../src/adminpages/customers';
import Admin from '../src/adminpages/admin';
import Manager from '../src/adminpages/manager';
import Transaction from '../src/userpages/transaction';
import SendMoney from '../src/userpages/sendmoney';
import User from '../src/userpages/user';
import Layout from '../src/userpages/layout';
import './App.css';
import './output.css'
import Login from './pages/login';

function App() {
  return <>

 <BrowserRouter>
 <Routes>
  <Route path='/home'element={<Layout />} />

  <Route path='/customers' element={<Customers />} />
  <Route path='/about'element={<About />} />
   <Route path='/manager'element={< Manager/>} />
    <Route path='/'element={< Login/>} />
    <Route path='/login' element={<Login />} />
    <Route path='/admin' element={<Admin />} />
    <Route path='/user' element={<User />} />

    <Route path='/transact' element={<Transaction />} />
    <Route path='/sendmoney' element={<SendMoney />} />
 </Routes>
 </BrowserRouter>
 
  </>
}

export default App;
