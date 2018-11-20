import React from "react";
import "./YourEventAcord.css";
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';

import EventInvite1 from "../EventInvite1";
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

  const YourEventAcord = props => (
    <div className="placehoder">
    {props.events.map(results => (
          <Panel id="collapsible-panel-example-2" defaultCollapsed>
          <Panel.Heading>
            <Panel.Title style={text3}toggle>
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
                 <p style={text2}>{results.Description}</p>
              <Button onClick={()=>props.bail(props.yourName,props.id,results.attendees,results.hostId,results._id)} bsClass="yellow">Bail</Button>
              </Col>
              <Col id="rsvpContainer" size="sm-6"><h2 > </h2>
                 <h3 style={text2}>Attendees</h3><EventInvite1  attendees={results.attendees} eventId={results._id} > </EventInvite1>
                  </Col>
             </Row>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
        ))}
    </div>
    
    
    
      );
  
export default YourEventAcord
