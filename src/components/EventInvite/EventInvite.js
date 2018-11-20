import React, { Component } from "react";
import Button from 'react-bootstrap/lib/Button';
import Media from 'react-bootstrap/lib/Media';


const EventInvite = (props) => (

<div className="placeholder">
    {props.attendees.map(results => (
  <Media>
  <Media.Left>
    <img width={64} height={64} src={results.avImgLink} alt="thumbnail" />
  </Media.Left>
  <Media.Body>
    <Media.Heading>{results.name}</Media.Heading>
    <Button onClick={()=>props.deleteAttendee(results.name, results._id, props.attendees, props.yourHE, props.id)} bsStyle="danger">Delete Attendee</Button>
  </Media.Body>
</Media>
        ))}
    </div>
  );

  
  export default EventInvite;
