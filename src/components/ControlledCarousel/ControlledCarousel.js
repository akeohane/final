import React from "react";
import Carousel from 'react-bootstrap/lib/Carousel';
import Button from 'react-bootstrap/lib/Button';
import "./ControlledCarousel.css";

const divStyle = {
  backgroundImage: 'linear-gradient(white, black)'
  /* Set a specific height */
};

const YourEventAcord = props => (
  <div className="cunt">
   <Carousel>
  {props.events.map(results => (
 
  <Carousel.Item id="heroImg">
    <img style={divStyle} id="topImg" width={900} height={500} alt="900x500" src={results.eventPhoto} />
    <Carousel.Caption>

                 <h2 >{results.name}</h2>
                 <h3 >Event Type: {results.type}</h3>
                 <h4>Time: {results.time} </h4>
                 <h4>Location: {results.actualLocation} </h4>
                 <p>{results.description} </p>
                 
                 <Button onClick={()=>props.requestToAttend(results,results._id,results.hostId)} >Attend</Button>

                 {/* <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <EventInvite1  attendees={results.attendees} eventId={results._id} > </EventInvite1>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal> */}
    </Carousel.Caption>
  </Carousel.Item>
      ))}
      </Carousel>
  </div>
  
  
  
    );

export default YourEventAcord


//   <Carousel.Item id="heroImg">
//   <img id="topImg" width={900} height={500} alt="900x500" src="https://thenypost.files.wordpress.com/2017/04/170418-mountain-lion-dog-feature.jpg?quality=90&strip=all" />
//   <Carousel.Caption>
//     <h3>Second slide label</h3>
//     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//   </Carousel.Caption>
// </Carousel.Item>