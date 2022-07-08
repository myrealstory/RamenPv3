import React from 'react'; //ES6 JS
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
                <Link to="/" class="navbar-brand">
                    Navbar
                </Link>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link to="/"
                                class="nav-link active">
                                Home
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/" class="nav-link" href="#">
                                Features
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/" class="nav-link" href="#">
                                Pricing
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/" class="nav-link disabled">Disabled</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;