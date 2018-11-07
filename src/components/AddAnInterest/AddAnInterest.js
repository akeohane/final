import React from "react";
import "./AddAnInterest.css";
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';

const AddAnInterest = props =>(
<div>
  <Panel>
    <Panel.Body><form> 
  <FormGroup bsSize="large">
    <FormControl onChange={props.handleInputChange} type="text" name="interest" placeholder="New Interest" />
  </FormGroup>
  <Button onClick={props.handleFormSubmit} bsStyle="primary">Add Interest</Button>
</form></Panel.Body>
  </Panel>
</div>
)

export default AddAnInterest;