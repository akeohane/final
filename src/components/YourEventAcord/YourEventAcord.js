import React from "react";
import "./YourEventAcord.css";
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';

import EventInvite1 from "../EventInvite1";
import Row from "../Row";
import Col from "../Col";

  const YourEventAcord = props => (
    <div className="cunt">
    {props.events.map(results => (
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
              <Button onClick={()=>props.bail(props.yourName,props.id,results.attendees,results.hostId,results._id)} bsClass="yellow">Bail</Button>
              </Col>
              <Col id="rsvpContainer" size="sm-6"><h2 > </h2>
                 <h3 >Attendees</h3><EventInvite1  attendees={results.attendees} eventId={results._id} > </EventInvite1>
                  </Col>
             </Row>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
        ))}
    </div>
    
    
    
      );
  
export default YourEventAcord