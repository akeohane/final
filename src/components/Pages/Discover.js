import React, { Component } from "react";
import Nav from "../Nav";
import axios from 'axios';
import ControlledCarousel from "../ControlledCarousel";


class Discover extends Component {
    state = {
      interest: "",
      interests:[],
      interestedEvents: [],
      events: [],
      show: false
    };

    requestToAttend = (eventArray,eventId,hostId) =>{
        const thisUsername = localStorage.getItem('thisUsername')
        const thisId = localStorage.getItem('_id')
        console.log('this is the id:', thisId);
        console.log('this is the host id:', hostId);
    
        const newUser ={
          username: thisUsername,
          _id: thisId,
          name: this.state.name
        };
    
        function updatEventInfo(){
          return axios.post("/api/user/" + thisId,{params:{yourNewEvent: eventArray,functionToRun:3,}})
        }
    
        function getUserInfo(){
          return axios.post("/api/event/" + eventId, {params: {attendees: newUser,functionToRun:2}})
    
        }
        axios.all([updatEventInfo(), getUserInfo()])
        .then(axios.spread( (acct, perms) =>{
    
          console.log(acct)
          console.log(perms)
          perms.data.attendees.push(newUser)
          console.log(perms)
          axios.get('/api/user/' +hostId)
          .then((response) => {
            console.log(response.data[0].yourHostedEvents)
            let hostsEvents = response.data[0].yourHostedEvents
            for (let i=0; i<hostsEvents.length; i++){
              if (hostsEvents[i]._id ===perms.data._id){
                hostsEvents[i].attendees.push(newUser)
                console.log(hostsEvents)
                axios.post("/api/user/" + thisId, {params: {yourHostedEvents1: hostsEvents,functionToRun:1}})
                .then((response) => {
                  console.log(response.data)
                  console.log(response);
                  this.popYourEvents();
                })
                .catch(function (error) {
                  console.log(error);
                });  
              }
            }
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    
        }));
    // this.handleShow()
      };

      handleClose = () =>{
        this.setState({ show: false });
      }
    
      handleShow = () =>{
        console.log("function is here")
        this.setState({ show: true });
      }
    
    
  
    // When the component mounts, get a list of all available base breeds and update this.state.breeds
    componentDidMount() {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      const thisUsername = localStorage.getItem('thisUsername')
      console.log("this is the username: " + thisUsername);
      const thisId = localStorage.getItem('_id')
      console.log('this is the id:', thisId);
      axios.get('/api/user/' +thisId)
      .then((response) => {
        console.log("user data: "+ response.data)
        this.setState({
          interests: response.data[0].interests
        });
      })
      .catch(function (error) {
        console.log(error);
      });

      axios.get('/api/event')
      .then(res => {
        let emptyArr = [];
        function checkForDuplicate(currentEvents, passedEvent){
          if (currentEvents === undefined  | currentEvents.length === 0){
              currentEvents.push(passedEvent)
          } else {
              var isFalse = 0;
              for (let e=0; e<currentEvents.length; e++){
                  if (currentEvents[e].name === passedEvent.name){
                  } else {
                
                      isFalse++;
                  }
                  if (isFalse ===currentEvents.length){
                      currentEvents.push(passedEvent);
                      
                  }
              }
          }
      };
      
      function interestInEvent(userInterest,passedInEvent,allEvents){
          let numFalse = 0;
          let numTrue = 0;
          for (let o=0; o< passedInEvent.interests.length; o++){
              if (passedInEvent.interests[o]===userInterest){
                  numTrue++;
              }
              else {
                  numFalse ++;
              }
          }
          if (numFalse === passedInEvent.interests.length){
          }
          else {
              checkForDuplicate(emptyArr,passedInEvent)
          }
      };
      
      function loopingThroughEvents(eventArr,interest){
          for (let i=0; i<eventArr.length;i++){
              // console.log("logging2: " + i + ", interest"+ interest)
              interestInEvent(interest,eventArr[i],eventArr)
          }
      };
      
      function findInterestsInEvents(interestsArr,events){
          for (let p=0; p<interestsArr.length;p++){
              // console.log("logging1: " + p +interestsArr[p])
              loopingThroughEvents(events,interestsArr[p])
          }
      };
      
      findInterestsInEvents(this.state.interests,res.data);
      console.log(emptyArr)
      console.log(res.data)

        /// function that parses res.data for events with user id in the array. 
        this.setState({ events: res.data, username: thisUsername, interestedEvents: emptyArr });
        console.log(this.state.interestedEvents);
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.props.history.push("/login");
        }
      }); 

    };
  
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };
  
    handleFormSubmit = event => {
      event.preventDefault();
    };
  
  
    render() {
      return (
        <div>
        <Nav></Nav>
        <div>
        <ControlledCarousel requestToAttend={this.requestToAttend} events={this.state.interestedEvents}>
        </ControlledCarousel>
      </div>
      </div>

      
      );
    }
  }
  
  export default Discover;