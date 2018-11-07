import React, { Component } from 'react';
import axios from 'axios';
import "./App.css";
import Container from "./components/Container";
import Row from "./components/Row";
import Col from "./components/Col";
import Nav from "./components/Nav";
import AllEventAcord from "./components/AllEventAcord";
import YourEventAcord from "./components/YourEventAcord";
import Hero from './components/Hero';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      test: "",
      books: "",
      events: [],
      username: "",
      name: "",
      id: "",
      acceptedIncomingInvites: [],
      declinedIncoimingInvites: [],
      pendingIncomingInvites: [],
      yourEvents: [],
      avImgLink: ""
    };
  }


  popYourEvents = ()=>{
    const thisId = localStorage.getItem('_id')
    axios.get('/api/event')
      .then(res => {
        let emptyArr = [];
        function containsId(eventToCheck, userId, arrayToAddTo) {
          for (let i=0; i< eventToCheck.attendees.length; i++){
              // console.log(eventToCheck.attendees[i]._id)
              if (eventToCheck.attendees[i]._id === userId){
                  // console.log(eventToCheck.attendees[i])
                  emptyArr.push(eventToCheck)
              }
          }
      };
      
      function checkIt2(events) {
          for (let p = 0; p < events.length; p++) {
              containsId(events[p],thisId,emptyArr)
          }
      };
      checkIt2(res.data);
      console.log(emptyArr)
        /// function that parses res.data for events with user id in the array. 
        this.setState({
          yourEvents: emptyArr,
          events: res.data
        });
        console.log(this.state.yourEvents);
        console.log("here2");        
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  bail = (attendeeName,attendeeId,allAttendees,hostId,eventId1)=> {
 
    const thisId = localStorage.getItem('_id')
    console.log('this is the id:', thisId);
    console.log('this is the name:', attendeeName);
    // console.log("func running" + attendeeName+attendeeId+"attendees" + allAttendees+ usersHostedEvents)
    console.log(allAttendees[0])
    console.log(allAttendees[0].name)

    console.log(eventId1)
    let eventId = eventId1;


    axios.get('/api/user/' +hostId)
    .then((response) => {
      console.log(response.data)  
      console.log(response);
      let usersHostedEvents = response.data[0].yourHostedEvents
      console.log(usersHostedEvents[0])
  
      var removeIndex = allAttendees.map((attendee) => { return attendee._id; })
                       .indexOf(attendeeId);
                       ~removeIndex && allAttendees.splice(removeIndex, 1);
                       console.log(allAttendees)

         axios.post("/api/event/" + eventId, {params: {_id: attendeeId,name: attendeeName,attendees: allAttendees,functionToRun:1}})
         .then((response) => {
          console.log(response.data)
          console.log(response);
          this.popYourEvents();
        })
        .catch(function (error) {
          console.log(error);
        });       
      
      
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  test1(){
    console.log("func running")
    let eventId = "5bcf70ef12fc0ba9a4bf05e6";
    axios.post("/api/event/" + eventId, {
      params: {
        testParam: "test234",
        testParam1: 222,
      }
    })
  };

  requestToAttend = (eventArray,eventId,hostId) =>{
    const thisUsername = localStorage.getItem('thisUsername')
    const thisId = localStorage.getItem('_id')
    console.log('this is the id:', thisId);
    console.log('this is the host id:', hostId);

    const newUser ={
      username: thisUsername,
      _id: thisId,
      name: this.state.name,
      avImgLink: this.state.avImgLink
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

  };


  updateState(){
    this.setState({books:"hello1"})
    console.log(this.state.books)
  };
  

  componentDidMount() {
    const thisUsername = localStorage.getItem('thisUsername')
    console.log(thisUsername);
    const thisId = localStorage.getItem('_id')
    console.log('this is the id:', thisId);
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/user/' +thisId)
    .then((response) => {
      console.log(response.data)
      console.log(response.data[0].username)
      let yourEvents1 = response.data[0].yourEvents;
      let name = response.data[0].name;
      let avImgLink = response.data[0].avImgLink;
      console.log(thisId,yourEvents1);
      this.setState({
        id:thisId,
        yourEvents:yourEvents1,
        name: name,
        avImgLink: avImgLink
      });
      console.log(this.state.yourEvents,this.state.name)
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get('/api/event')
      .then(res => {
        let emptyArr = [];
        function containsId(eventToCheck, userId, arrayToAddTo) {
          for (let i=0; i< eventToCheck.attendees.length; i++){
              // console.log(eventToCheck.attendees[i]._id)
              if (eventToCheck.attendees[i]._id === userId){
                  // console.log(eventToCheck.attendees[i])
                  emptyArr.push(eventToCheck)
              }
          }
      };
      
      function checkIt2(events) {
          for (let p = 0; p < events.length; p++) {
              containsId(events[p],thisId,emptyArr)
              console.log("________________________________")
          }
      };
      checkIt2(res.data);
      console.log(emptyArr)

        /// function that parses res.data for events with user id in the array. 
        this.setState({ events: res.data, username: thisUsername, yourEvents: emptyArr });
        console.log(this.state.events);
        console.log(this.state.username);
        console.log(this.state.yourEvents);
        console.log("here2");        
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.props.history.push("/login");
        }
      });    
  };

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  };

  render() {
    return (
      <div>
        <Nav >
        </Nav>
      <Hero></Hero>
      <Container>
        <Row>
        <Col size="lg-6" style={{ marginTop: 30,}}>
              <h3 className="card-header" align="center">All Events</h3>
              <AllEventAcord requestToAttend={this.requestToAttend} events={this.state.events} >
              </AllEventAcord>
          </Col>
          <Col size="lg-6" style={{ marginTop: 30,}}>
              <h3 className="card-header" align="center">Your Events</h3>
              <YourEventAcord id={this.state.id} bail={this.bail} yourName={this.state.name} events={this.state.yourEvents} >
              </YourEventAcord>
          </Col>
        </Row>
        
        <h3 className="card-header" align="center">&nbsp;
               {localStorage.getItem('jwtToken') &&
                <button class="btn btn-primary yellow" onClick={this.logout}>Logout</button>
              }</h3>
      </Container>
    </div>
    );
  }
}

export default App;