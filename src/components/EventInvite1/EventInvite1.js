import React, { Component } from "react";


import Media from 'react-bootstrap/lib/Media';

const text1= {
  fontFamily: "Paytone One" 
};

const text2= {
  fontFamily: "Droid Sans" 
};
const text3= {
  fontFamily: "Droid Sans",
  textAlign: "center"
};

const EventInvite1 = (props) => (

<div className="placeholder">
    {props.attendees.map(results => (
  <Media>
  <Media.Left>
    <img width={64} height={64} src={results.avImgLink} alt="thumbnail" />
  </Media.Left>
  <Media.Body>
    <Media.Heading style={text2} >{results.name}</Media.Heading>
    {/* <Button onClick={()=>props.deleteAttendee(results.name, results._id, props.attendees, props.yourHE, props.id)} bsStyle="danger">Delete Attendee</Button> */}
  </Media.Body>
</Media>
        ))}
    </div>
  );

  
  export default EventInvite1;
