import React from "react";
import "./AllEventAcord.css";
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import EventInvite1 from "../EventInvite1";
import Row from "../Row";
import Col from "../Col";

const panelHeadStyle = {
    backgroundColor: "#9fa8af",
    borderRadius: "4px"
};

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

  const AllEventAcord = props => (
    <div className="cunt">
    {props.events.map(results => (
          <Panel id="collapsible-panel-example-2" defaultCollapsed>
          <Panel.Heading style={panelHeadStyle}>
            <Panel.Title style={text3}toggle>
              {results.name}  |  {results.locationAprox}
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse >
            <Panel.Body>
             <Row>
                 <Col size="sm-6">
                 <h2 style={text1}>{results.name}</h2>
                 <h3 style={text2}>Event Type: {results.type}</h3>
                 <h4 style={text2}>Time: {results.time} </h4>
                 <h4 style={text2}>Location: {results.locationAprox} </h4>
                 <p style={text2}>{results.Description}</p>
   
              <Button onClick={()=>props.requestToAttend(results,results._id,results.hostId)}  bsClass="yellow">Attened</Button>
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
  
export default AllEventAcord