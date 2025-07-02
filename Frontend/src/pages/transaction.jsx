import React from 'react'

export default function Transaction() {
      const[users, setUsers]=useState([]);
   
    
    const url="http://localhost:3001/students/findCustomers";
    const findcustomer=()=>{
        axios.get(url).then(
            res=>{
                setUsers(res.data);
            }
        )
    }
    useEffect(()=>{
findcustomer();

    },[users])
  return <>
  <table>
    <thead>
      <tr>
    <th>firstname</th>
    <th>lastname</th>
      </tr>
    
    </thead>
    <tbody>
<tr>
  <td></td>
</tr>
    </tbody>
  </table>
  </>
}
