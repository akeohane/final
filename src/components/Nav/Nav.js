import React from "react";
import "./Nav.css";

const divStyle = {
  backgroundColor: "#688da2",
  color: "white",
  display:"flex",
  alignItems:"center",
  /* Set a specific height */
};
const textStyle = {
  color: "white",
    fontFamily: "Droid Sans" 
  /* Set a specific height */
};



const Nav = props => (
<nav style={divStyle}className="navbar navbar-expand-lg">
    {/* <a className="navbar-brand" href="/">
    <img src="https://i.imgur.com/URfLD6e.png" className="logo" width="100" height="50" alt=""></img>
    </a> */}
    <div style={textStyle} className="collapse navbar-collapse" id="navbarNav">
    <ul  style={textStyle} className="navbar-nav">
      <li style={textStyle}className="nav-item">
      <img src="https://i.imgur.com/URfLD6e.png" className="logo" width="100" height="50" alt=""></img>
      </li>
      <li style={textStyle}className="nav-item">
        <a style={textStyle} className="nav-link" href="/">Home </a>
      </li>
      <li style={textStyle} class="nav-item">
        <a style={textStyle} className="nav-link" href="/discover">Discover</a>
      </li>
      <li className="nav-item">
        <a style={textStyle} className="nav-link" href="/host">Host</a>
      </li>
      <li className="nav-item">
        <a style={textStyle}className="nav-link" href="/myprofile">My Profile</a>
      </li>
    </ul>
  </div>
  </nav>
)

export default Nav;
