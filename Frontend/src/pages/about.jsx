import React, { useState } from 'react'
import "../output.css"
import Login from './login'
export default function About() {
  const[islogedin, setislogedin]=useState(localStorage.getItem("login"))
  return  islogedin?<>

<h1>About The Bank</h1>
  </>:<Login />
}
