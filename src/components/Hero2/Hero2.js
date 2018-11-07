import React from "react";
import "./Hero2.css";
import Jumbotron from 'react-bootstrap/lib/Jumbotron';

const divStyle = {
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://preview.ibb.co/neP7hf/adults-backlit-bonding-1049317.jpg")',
  backgroundRepeat  : 'no-repeat',
  backgroundPosition: 'center',
  position: 'relative',
  backgroundSize: 'cover',
  height: '50%',
  minHeight: '450px'
  /* Set a specific height */
};

const textStyle = {
  textAlign: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'white',
  /* Set a specific height */
};

const text1= {
  fontFamily: "Paytone One" 
}
const text2= {
  fontFamily: "Droid Sans" 
}


const Hero2 = props => (
  <div>
{/* <div style={divStyle }id="heroImage"> <h1>hello</h1></div> */}


<Jumbotron style={divStyle}>
<div style={textStyle}>
    <h1 style={text1} >your profile</h1>
    <p style={text2} >Add interests to discover events</p>
</div>
</Jumbotron>
</div>
  );
  
  export default Hero2;
  