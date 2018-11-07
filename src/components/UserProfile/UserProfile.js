import React, { Component } from "react";


import Media from 'react-bootstrap/lib/Media';

const UserProfile = (props) => (

<div className="cunt">
  <Media>
  <Media.Left>
    <img width={300} height={300} src={props.avImgLink} alt="thumbnail" />
  </Media.Left>
  <Media.Body>
    <h1>{props.name}</h1>
    <h2>Interests:</h2>
    {props.interests.map(results => (
        <h4>{results}</h4>
        ))}
    {/* <Button onClick={()=>props.deleteAttendee(results.name, results._id, props.attendees, props.yourHE, props.id)} bsStyle="danger">Delete Attendee</Button> */}
  </Media.Body>
</Media>
        
    </div>
  );

  
  export default UserProfile;