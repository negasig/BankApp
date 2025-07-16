
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/about';
import './App.css';
import './output.css'
import Students from './pages/students';
import Layout from './pages/layout';
import Transaction from './pages/transaction';
import Manager from './pages/manager';
import Profile from './pages/profile';
import Login from './pages/login';

function App() {
  return <>
<h1 className='w-full bg-green-700 text-center text-2xl text-blue-50'>Welcome to ABC bank</h1>
 <BrowserRouter>
 <Routes>
  <Route path='/'element={<Login />} />
  <Route path='/home'element={<Layout />} />
  <Route path='/customers' element={<Students />} />
  <Route path='/about'element={<About />} />
  <Route path='/transact'element={< Transaction/>} />
   <Route path='/manager'element={< Manager/>} />
   <Route path='/profile'element={< Profile/>} />
 </Routes>
 </BrowserRouter>
 
  </>
}

export default App;
