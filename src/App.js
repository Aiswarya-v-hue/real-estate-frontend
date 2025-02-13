
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sellerform from './Components/Sellerform';
import BuyPage from './Components/BuyPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Brokerpage from './Components/Brokerpage';
import Dashboardpage from './Components/Dashboardpage';
import Buyform from './Components/Buyform';
import Dashcomp from './Components/Dashcomp';
import Buydesign from './Components/Buydesign';
import HomePage from './Components/HomePage';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Seller from './Components/Seller';
function App() {
  return (
   <>
   
<BrowserRouter>
<Routes>
  <Route path='/'  element={<HomePage/>}></Route>
<Route path='/signup' element={<Signup />}></Route>
<Route path='/login' element={<Login />}></Route>
<Route path='buycomp' element={<Buydesign />}></Route>
<Route path='buypage' element={<BuyPage />}></Route>
<Route path='sellerform' element={<Sellerform />}></Route>
<Route path='sell' element={<Seller/>}></Route>
<Route  path='brokerpage' element={<Brokerpage />}></Route>
<Route  path='/dashboard' element={<Dashboardpage />}></Route>
<Route path ='/buyform' element ={<Buyform />}></Route>
<Route  path='/buyerdetails' element={<Dashcomp />}></Route>

</Routes>






</BrowserRouter>






   
   
   </>
  );
}

export default App;
