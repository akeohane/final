import React from "react";
import "./EventAcord.css";
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';

import EventInvite from "../EventInvite";
import Row from "../Row";
import Col from "../Col";


  const EventAcord = props => (
    <div className="cunt">
    {props.yourHE.map(results => (
          <Panel id="collapsible-panel-example-2" defaultCollapsed>
          <Panel.Heading>
            <Panel.Title toggle>
              {results.name}  |  {results.locationAprox}
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
             <Row>
                 <Col size="sm-6">
                 <h2 >{results.name}</h2>
                 <h3 >Event Type: {results.type}</h3>
                 <h4>Time: {results.time} </h4>
                 <h4>Location: {results.actualLocation} </h4>
                 <p>{results.Description}</p>
              <Button onClick={()=>props.deleteEvent(results._id)} bsStyle="danger">Delete Event</Button>
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