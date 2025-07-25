
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/about';
import './App.css';
import './output.css'
import Students from './pages/students';
import Layout from './pages/layout';

import Manager from './pages/manager';
import Profile from './pages/profile';
import Login from './pages/login';
import Myaccount from './pages/myaccount';

function App() {
  return <>
<h1 className='w-full text-2xl shadow-lg font-bold flex items-center justify-center'>Welcome to ABC bank</h1>
 <BrowserRouter>
 <Routes>
  <Route path='/home'element={<Layout />} />
  <Route path='/customers' element={<Students />} />
  <Route path='/about'element={<About />} />
  <Route path='/acc'element={< Myaccount/>} />
   <Route path='/manager'element={< Manager/>} />
   <Route path='/profile'element={< Profile/>} />
    <Route path='/'element={< Login/>} />
 </Routes>
 </BrowserRouter>
 
  </>
}

export default App;
