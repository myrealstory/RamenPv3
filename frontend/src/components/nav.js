import React from 'react'; //ES6 JS
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid d-flex justify-content-bewteen">
                <div>
                    <Link to="/" class="navbar-brand">
                        <img src="img/Logo.png" alt="" class="logo"/>
                    </Link>
                </div>
               
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link to="/"
                                class="nav-link active">
                                HOME
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/" class="nav-link" href="#">
                                FOOD MENU
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/" class="nav-link" href="#">
                                ORDERS
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/" class="nav-link ">ABOUT US</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/" class="nav-link" href="#">
                                LOCATION
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul class="d-flex ">
                        <li></li>
                        <li>
                            <Link to="/" class="">
                                Login / 
                            </Link>
                        </li>
                        <li>
                            <Link to="/" class="pl-2">
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