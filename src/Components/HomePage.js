import React, { useEffect, useState } from 'react'
import '../Styles/Navbar.css'
import '../Styles/homecontent.css'
import '../Styles/intro.css'
import img1 from '../images/Image (1).png'
import img2 from '../images/Illustration.png'
import icon1 from '../Icons/Icon (1).png'
import icon2 from '../Icons/Icon (2).png'
import icon3 from '../Icons/Icon (3).png'
import icon4 from '../Icons/Icon.png'
import logout from '../Icons/logout.png'
import { Link, useNavigate } from 'react-router-dom'

function HomePage() {
 
// session
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = sessionStorage.getItem("username");
    if (storedName) {
      setName(storedName.toUpperCase());
    }
  }, []);
//dropdown
const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleLogout = (event) => {
    console.log("Logout button clicked");
    event.stopPropagation(); // Prevent dropdown interference
    sessionStorage.clear();
    
    navigate('/login'); // Redirect to the login page
  };
    return (
        <div>
            <nav className="navbar">
        <div className="nav-logo">Estatery</div>
        <ul className="nav_link">
          <li><Link className="scroll-link" to="/">HomePage</Link></li>
          <li>
            <Link className="scroll-link" to="/buypage">Buy</Link>
          </li>
          <li>
            <Link className="scroll-link" to="/sellerform">Sell</Link>
          </li>
          <li>
            <Link className="scroll-link" to="">About Us</Link>
          </li>
          <li>
            <Link className="scroll-link" to="">Contact Us</Link>
          </li>
          <li>
            <Link className="scroll-link" to="/brokerpage">Broker Page</Link>
          </li>
        </ul>

        {name ? (
          <div className="nav-username">
            <h1 className="navhead" onClick={() => setDropdownOpen(!dropdownOpen)} style={{ cursor: "pointer" }}>
              Welcome, {name}
            </h1>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={handleLogout}>
                  <img className="logout" src={logout} alt="logout" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="nav_btns">
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="login-btn">Sign Up</button>
            </Link>
          </div>
        )}
      </nav>
      <div className='home-container-1'>
                <div className='home-content-1'>
                    <h1 className='home-head-1' >Buy or sell your property easily</h1>
                    <p style={{ color: '#555', fontSize: '1.2rem', margin: '10px 0 30px' }}>
                    A great platform to buy and sell properties via brokers safely and securely.</p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '15px' }}>
                        <select style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd' }}>
                            <option>Barcelona, Spain</option>
                            <option>Madrid, Spain</option>
                            <option>Valencia, Spain</option>
                        </select>
                        <button className='browse-btn-1'>
                            Browse Properties
                        </button>
                    </div>
              </div>
              <div className='home-img-con'>
                <img className='homeimage' src={img1} alt='homeimage'/>
              </div>
            </div>
            <div className='intro'>
                  <div className='card-img'>
                    <img className='img2' src={img2} alt='property' />
                    <div className='intro-content'>
                        <h2>The new way to find your new home</h2>
                        <p>Find your dream place to live in with more than 10k+ properties listed.</p>
                        <button>Browse Properties</button>
                    </div>
                  </div>
                  <div className='benefits'>
                     <div className='benefits-row'>
                         <div className='row-benefits'>
                            <img className='icons' src={icon4} alt='iconic'/>
                            <h3>Property Insurance</h3>
                            <p>We offer our customer property protection of liability coverage and insurance for their better life.</p>
                         </div>
                         <div className='row-benefits'>
                         <img className='icons' src={icon1} alt='iconics'/>

                         <h3>Best Price</h3>
                         <p>Not sure what  you should be charging for your property? No need to worry, let us do the numbers for you.</p>
                         </div>
                     </div>
                     <div className='benefits-row'>
                     <div className='row-benefits'> 
                     <img className='icons' src={icon2} alt='iconesia'/>

                        <h3>Lowest Commission</h3>
                        <p>You no longer have to negotiate commissions and haggle with other agents it only cost 2%!</p></div>
                     <div className='row-benefits'> 
                     <img className='icons' src={icon3} alt='icu'/>

                        <h3>Overall Control</h3>
                        <p>Get a virtual tour, and schedule visits before you rent or buy any properties. You get overall control.</p></div>
                     </div>
                  </div>
            </div>
        </div>
    )
}

export default HomePage
