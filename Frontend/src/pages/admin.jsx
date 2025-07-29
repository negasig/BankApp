import { jwtDecode } from 'jwt-decode'
import React from 'react'

export default function Admin() {
  const log=localStorage.getItem("logintwo")
const user=jwtDecode(log);

  return <>
  <div>Admin</div>
  <h1>Welcome </h1> <p style={{color:'red'}}>{user.username}</p>
  </>
}
