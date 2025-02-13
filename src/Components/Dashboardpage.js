import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Dashboarddetails from './Dashboarddetails';
import Dashcomp from './Dashcomp';


function Dashboardpage() {

const [userdata,setuserdata] = useState(null);
const navigate = useNavigate();

useEffect(()=>{
const token = localStorage.getItem('token')
if(!token){
    navigate('/brokerpage');
    return;
}

async function fetchData(){
 
try {
const response = await fetch("https://real-estate-backend-awzg.onrender.com/api/broker/dashboard",{
method:'GET',
headers:{
  
  'Authorization': `Bearer ${localStorage.getItem('token')}`
}

});
console.log(response);

const data =  await response.json()
console.log(data);
if(response.ok){
  setuserdata(data)
}
else{
  navigate('/brokerpage')
}  
} catch (error) {
  navigate('/brokerpage')
}
}

fetchData();

},[navigate])

  return (
    <div>
 <nav className='navbar'>
                <div className='nav-logo'>
                    Estatery
                </div>
               
        </nav>
<h1>Dashboard page</h1>
{userdata ?<p>{userdata.message}</p>:<p>loading....</p>}
<Dashboarddetails />

<Dashcomp />
    </div>
  )
}

export default Dashboardpage
