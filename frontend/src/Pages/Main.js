import React from 'react';
import './CSS/Main.css'
import Nav from "../components/nav";
import { Link } from 'react-router-dom'
import RamenFont from './img/background/title02.png'
import RamenCup from './img/Laksa_Alpha.png'

const MainPage = () => {
    return (
      <div className="MBody">
        <div className="MContainer">
          <Nav />
          <div className="w100">
            <Link to="/" className="d-flex RamenMain">
              <img src={RamenFont} alt="" className="RamenTitle" />
              <img src={RamenCup} className="CupRamen" alt=''/>
            </Link>
          </div>
        </div>
      </div>
    );
};

export default MainPage;