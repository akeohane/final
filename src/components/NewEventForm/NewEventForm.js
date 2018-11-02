import React from "react";
import "./NewEventForm.css";
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';

const NewEventForm = props => (
<div>
  <Panel>
    <Panel.Heading>
      <Panel.Title componentClass="h3">Create New Event</Panel.Title>
    </Panel.Heading>
    <Panel.Body><form> 
  <FormGroup bsSize="large">
    <FormControl onChange={props.handleInputChange} type="text" name="name" placeholder="Name of Event" />
  </FormGroup>
  <FormGroup bsSize="large">
    <FormControl onChange={props.handleInputChange} type="text" name="time" placeholder="Time" />
  </FormGroup>
  <FormGroup>
    <FormControl bsSize="large" onChange={props.handleInputChange} type="text" name="date" placeholder="Date" />
  </FormGroup>
  <FormGroup>
    <FormControl onChange={props.handleInputChange} type="text" name="type" placeholder="Type of Event" />
  </FormGroup>
  <FormGroup>
    <FormControl onChange={props.handleInputChange} type="text" name="actualLocation" placeholder="Exact Address" />
  </FormGroup>
  <FormGroup>
    <FormControl onChange={props.handleInputChange} type="text" name="locationAprox" placeholder="Approx Location" />
  </FormGroup>
  <FormGroup>
    <FormControl onChange={props.handleInputChange} type="text" name="interests" placeholder="Interests" />
  </FormGroup>
  <FormGroup>
    <FormControl onChange={props.handleInputChange} type="text" name="description" placeholder="Description" />
  </FormGroup>
  <FormGroup>
    <FormControl onChange={props.handleInputChange} type="text" name="eventPhoto" placeholder="Insert Link to Event Photo" />
  </FormGroup>
  <Button onClick={props.handleFormSubmit} bsStyle="primary">Create</Button>
</form></Panel.Body>
  </Panel>
</div>
    

);

export default NewEventForm;
