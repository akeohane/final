import React from "react";
import "./Hero1.css";
import Jumbotron from 'react-bootstrap/lib/Jumbotron';

const divStyle = {
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://preview.ibb.co/dkmS8L/alcohol-alcoholic-bar-16408.jpg")',
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


const Hero1 = props => (
  <div>
{/* <div style={divStyle }id="heroImage"> <h1>hello</h1></div> */}


<Jumbotron style={divStyle}>
<div style={textStyle}>
    <h1 style={text1} >host with the most</h1>
    <p style={text2} >Make it stand out!</p>
</div>
</Jumbotron>
</div>
  );
  
  export default Hero1;
  