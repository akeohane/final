import React from "react";
import "./EventAcord.css";
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';

import EventInvite from "../EventInvite";
import Row from "../Row";
import Col from "../Col";

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

  const EventAcord = props => (
    <div className="placeholder">
    {props.yourHE.map(results => (
          <Panel id="collapsible-panel-example-2" defaultCollapsed>
          <Panel.Heading>
            <Panel.Title style={text3} toggle>
              {results.name}  |  {results.locationAprox}
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
             <Row>
                 <Col size="sm-6">
                 <h2 style={text1}>{results.name}</h2>
                 <h3 style={text2}>Event Type: {results.type}</h3>
                 <h4 style={text2}>Time: {results.time} </h4>
                 <h4 style={text2}>Location: {results.actualLocation} </h4>
                 <p style={text2}> {results.Description}</p>
              <Button onClick={()=>props.deleteEvent(results._id)} bsStyle="danger" bsClass="yellow">Delete Event</Button>
              </Col>
                 <Col id="rsvpContainer" size="sm-6">               <h2 > </h2>
                 <h3 >Attendees</h3><EventInvite yourHE={props.yourHE} deleteAttendee={props.deleteAttendee} attendees={results.attendees} id={results._id} > </EventInvite> </Col>
             </Row>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
        ))}
    </div>
    
    
    
      );
  
export default EventAcord
