import React, { useEffect, useRef } from 'react';
import FireBG from "../img/FireLoop.mp4";
import lottie from 'lottie-web'

function AutoBG() {
    const VideoBG = {
        "position": "absolute",
        "height": "150%",
        "width": "250%",
        "objectFit": "cover",
        "left": 0,
        "top":"-5px",
    }
    const container = useRef(null)

    useEffect(() => { 
        lottie.loadAnimation({
            container: container.current, 
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../img/FireLoop.json'),
        })
    },[])
   
    return (
      <>
        <div className="Vcontainer" ref={container}></div>
      </>
    );
};

export default AutoBG