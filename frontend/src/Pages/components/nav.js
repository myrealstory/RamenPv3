import React from 'react'; //ES6 JS
import { Link } from 'react-router-dom';
import LOGO from '../img/Logo.png'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Button } from 'react-bootstrap'
// import '../App.css'

function Nav() {
  
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="NavBar">
          <div>
            <Link to="/" className="navLogo">
              <img src={LOGO} alt="" className="logo" />
            </Link>
          </div>

          <div className="nav" id="navbarNav">
            <ul className="navUL">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link" href="#">
                  FOOD MENU
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link" href="#">
                  ORDERS
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link ">
                  ABOUT US
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link" href="#">
                  LOCATION
                </Link>
              </li>
            </ul>
          </div>
          <div className="navLogin">
            <ul className="d-flex ">
              <li className="navLi">
                {/* <i className="fa-solid fa-cart-arrow-down white"></i> */}
                <Link to="/">
                  {/* <AiOutlineShoppingCart className='Cart-log'/> */}
                  <i className="fa-solid fa-cart-arrow-down white mr-3"></i>
                </Link>
              </li>
              <li>
                <Link to="/" className="Login_Red">
                  Login  /
                </Link>
              </li>
              <li>
                <Link to="/" className="pl-2 Login_Red">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}

export default Nav;