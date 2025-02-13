import React from 'react'
import buyicon from '../Icons/Icon-buy.png'
import sellicon from '../Icons/Icon-sell.png'
import searchicon from '../Icons/search-icon.png'
import "../Buypage.css";

function Buydesign() {
  return (
    <div>
<br></br>
<br></br>
<br></br>
       <div className='buypage'>
      <div className='buypage-head'>
        <h1>Based on your location</h1>
        <p>Some of our picked properties near you location.</p>
      </div>
      <div className='tabSearch-bar'>
          <div className='tab-bar'>
            <button><img className='icon' alt='icons'  src={buyicon} />Buy</button>
            <button><img className='icon'alt='icons' src={sellicon} />Sell</button>
          </div>
          <div><img className='search-icon' alt='icons' src={searchicon}/>
         <input className='search-bar' type='search' placeholder="Search..." /></div>
      </div>
      <div className='Browsw-btn'>
          <button>Browse more properties</button>
          
      </div>
    </div>

    </div>
  )
}

export default Buydesign
