import React, { Component } from "react";
import Nav from "../Nav";
import EventAcord from "../EventAcord";
import Container from "../Container";
import NewEventForm from "../NewEventForm";
import axios from 'axios';
import Hero1 from '../Hero1';

class Host extends Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      yourHostedEvents: [],
      username:"",
      id:"",
      test:"",
      name:"",
      date:"",
      time:"",
      attendees:[],
      type:"",
      locationAprox:"",
      actualLocation:"",
      description: "",
      interests: "",
      eventPhoto: "",
    };
  }
  

  popYourEvents = ()=>{
    const thisUsername = localStorage.getItem('thisUsername')
    const thisId = localStorage.getItem('_id')
    axios.get('/api/event')
    .then(res => {
      let emptyArr = [];
    function checkIt2(events, userId) {
        for (let p = 0; p < events.length; p++) {
            if (events[p].hostId===userId){
              emptyArr.push(events[p])
            }
            console.log("________________________________")
        }
    };
    checkIt2(res.data,thisId);
    console.log(emptyArr)
      this.setState({ username: thisUsername,id:thisId, yourHostedEvents: emptyArr });
    })
    .catch((error) => {
      if(error.response.status === 401) {
        this.props.history.push("/login");
      }
    }); 
  };

    test1(num,num1,num2){
      console.log("func running" + num+num1+"attendees" + num2)
      let eventId = "5bcf70ef12fc0ba9a4bf05e6";
      axios.post("/api/event/" + eventId, {
        params: {
          _id: num1,
          name: num,
        }
      })
    };

    deleteEvent = (eventId) => {
      axios.delete("/api/event/" + eventId)
      .then(res => {
        this.popYourEvents();
        console.log(res);
      })
      .catch((error) => {
        if(error.response.status === 401) {
          console.log(error)
        }
      });
    };


    deleteAttendee = (attendeeName,attendeeId,allAttendees,usersHostedEvents,eventId1)=>{
      const thisId = localStorage.getItem('_id')
      console.log('this is the id:', thisId);
      console.log("func running" + attendeeName+attendeeId+"attendees" + allAttendees+ usersHostedEvents)
      console.log(allAttendees[0])
      console.log(allAttendees[0].name)
      console.log(usersHostedEvents[0])
      console.log(eventId1)
      let eventId = eventId1;

      var removeIndex = allAttendees.map((attendee) => { return attendee._id; })
                       .indexOf(attendeeId);
                       ~removeIndex && allAttendees.splice(removeIndex, 1);
                       console.log(allAttendees)
      for(let i=0; i<usersHostedEvents.length; i++){
        if(usersHostedEvents[i]._id === eventId){
         usersHostedEvents[i].attendees = allAttendees
         console.log(usersHostedEvents[i])       
        }
      };  
      
      function updatEventInfo(){
        return axios.post("/api/event/" + eventId, {params: {_id: attendeeId,name: attendeeName,attendees: allAttendees,functionToRun:1}})
      }

      function getUserInfo(){
        return axios.post("/api/user/" + thisId, {params: {yourHostedEvents1: usersHostedEvents,functionToRun:1}})

      }
      axios.all([updatEventInfo(), getUserInfo()])
      .then(axios.spread(function (acct, perms) {

        console.log(acct)
        console.log(perms)
        this.popYourEvents();
        // Both requests are now complete
      }));
    };

    componentDidMount() {
      const thisUsername = localStorage.getItem('thisUsername')
      console.log(thisUsername);
      const thisId = localStorage.getItem('_id')
      console.log('this is the id:', thisId);

      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      axios.get('/api/event')
      .then(res => {
        let emptyArr = [];
      function checkIt2(events, userId) {
          for (let p = 0; p < events.length; p++) {
              if (events[p].hostId===userId){
                emptyArr.push(events[p])
              }
              console.log("________________________________")
          }
      };
      checkIt2(res.data,thisId);
      console.log(emptyArr)
        this.setState({ username: thisUsername,id:thisId, yourHostedEvents: emptyArr });
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
      const thisUsername = localStorage.getItem('thisUsername')
      console.log(thisUsername);
      const thisId = localStorage.getItem('_id')
      console.log('this is the id:', thisId);

      event.preventDefault();
      let newEvent = {
        name:this.state.name,
        date:this.state.date,
        time:this.state.time,
        attendees:this.state.attendees,
        type:this.state.type,
        locationAprox:this.state.locationAprox,
        actualLocation:this.state.actualLocation,
        hostId: thisId,
        interests: this.state.interests,
        Description: this.state.description,
        eventPhoto: this.state.eventPhoto
      };
      console.log(newEvent)

      axios.post("/api/event/", {
        params: {
          testParam: "test234",
          testParam1: 222,
          testParam2: newEvent,
        }
      })
      .then((response) => {
        console.log(response.data)
        var usersHostedEvents = [];
        function doesUserHostEvent(userid, events){
            for (let i=0; i<events.length; i++){
                if (events[i].hostId === userid){
                  usersHostedEvents.push(events[i])
                }
            }
        };
        
        doesUserHostEvent(thisId,response.data)
        this.submitEventToUser(usersHostedEvents)
        this.popYourEvents();
      })
      .catch(function (error) {
        console.log(error);
      });
    };

    submitEventToUser = (placeholder) => {
      const thisUsername = localStorage.getItem('thisUsername')
      console.log(thisUsername);
      const thisId = localStorage.getItem('_id')
      console.log('this is the id:', thisId);
      console.log(placeholder)
      axios.post("/api/user/" + thisId, {params: {yourHostedEvents1: placeholder,functionToRun:2}})
    };
  
  
    render() {
      return (
        <div>
        <Nav></Nav>
        <div>
          <Hero1></Hero1>
        <Container style={{ minHeight: "80%" }}>
        <h3 className="card-header" align="center">Your Hosted Events</h3>
      <EventAcord deleteAttendee={this.deleteAttendee} deleteEvent={this.deleteEvent} yourHE={this.state.yourHostedEvents} ></EventAcord>
        </Container>
        <Container  style={{ minHeight: "80%" }}>
        <h3 className="card-header" align="center">Host New Event</h3>
        <NewEventForm handleInputChange={this.handleInputChange} handleFormSubmit={this.handleFormSubmit}></NewEventForm>
        </Container>
      </div>
      </div>
      );
    }
  }

export default Host;