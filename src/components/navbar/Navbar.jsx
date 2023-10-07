import React from 'react'
import "./Navbar.scss"
import { Link } from 'react-router-dom'
import Search from '../search/Search'
import logo from "../../assets/image/raad.png";

const Navbar = () => {
  return (
    <div className='navbar '>
        <nav>
            <ul className="item_ul">
                <li className="item_li">
                    <Link to="/man">Man</Link>
                    <Link to="/Woman">Woman</Link>
                    <Link to="/Shop">Shop</Link>
                    <Link to="/Accessory" className='color'>Accessory</Link>
                    <Link to="/About">About</Link>
                </li>
            </ul>

            <div className="logo">
                <h1>RAAD SHOP</h1>
                {/* <img src={logo} alt="" /> */}
            </div>

            <div className="right">
                <Search/>
            </div>
        </nav>
      
    </div>
  )
}

export default Navbar;
