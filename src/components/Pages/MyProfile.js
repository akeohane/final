import React, { Component } from "react";
import Nav from "../Nav";
import Container from "../Container";
import Hero1 from "../Hero1";
import AddAnInterest from "../AddAnInterest";
import UserProfile from "../UserProfile";
import axios from 'axios';
import Hero2 from "../Hero2";


class MyProfile extends Component {

    constructor(props) {
      super(props);
      // Don't call this.setState() here!
      this.state = {
          interest: "",
          interests:[],
          interestedEvents: [],
          events: [],
          name: "",
          photo: "",
      };
    }
    logout = () => {
      localStorage.removeItem('jwtToken');
      window.location.reload();
    };
    
    updateInterests = () => {
      const thisId = localStorage.getItem('_id')
      axios.get('/api/user/' +thisId)
      .then((response) => {
        console.log(response.data)
        console.log(response);
        this.setState({
          interests: response.data[0].interests,
          name: response.data[0].name,
          photo: response.data[0].avImgLink,
        });
        console.log(this.state)

      })
      .catch(function (error) {
        console.log(error);
      });
    };
  
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

    addInterestFunc = (newInterest) =>{
        const thisId = localStorage.getItem('_id')
        console.log('this is the id:', thisId);
        axios.post("/api/user/" + thisId, {
            params: {
              testParam: "test234",
              testParam1: 222,
              functionToRun: 4,
              interest: newInterest
            }
          })
          .then((response) => {
          this.updateInterests()
    
          })
          .catch(function (error) {
            console.log(error);
          });
    };
  
  
      // When the component mounts, get a list of all available base breeds and update this.state.breeds
      componentDidMount() {
        const thisUsername = localStorage.getItem('thisUsername')
        console.log(thisUsername);
        const thisId = localStorage.getItem('_id')
        console.log('this is the id:', thisId);
  
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/api/user/' +thisId)
        .then((response) => {
          console.log(response.data)
          console.log(response);
          this.setState({
            interests: response.data[0].interests,
            name: response.data[0].name,
            photo: response.data[0].avImgLink,
          });
          console.log(this.state)

        })
        .catch(function (error) {
          console.log(error);
        });

      };
    
      handleInputChange = event => {
          const { name, value } = event.target;
          this.setState({
            [name]: value
          });
          console.log(this.state)
      };
    
      handleFormSubmit = event => {
        const thisUsername = localStorage.getItem('thisUsername')
        console.log(thisUsername);
        const thisId = localStorage.getItem('_id')
        console.log('this is the id:', thisId);
        this.addInterestFunc(this.state.interest)
      };
  
    
      render() {
        return (
          <div>
          <Nav></Nav>
          <div>
          <Hero2></Hero2>
          <Container style={{ minHeight: "80%" }}>
          <h3 className="card-header" align="center">Your Profile</h3>
          <UserProfile name={this.state.name} avImgLink={this.state.photo} interests={this.state.interests}></UserProfile>
                <AddAnInterest  handleInputChange={this.handleInputChange} handleFormSubmit={this.handleFormSubmit}>

                </AddAnInterest>
                <h3 className="card-header" align="center">&nbsp;
               {localStorage.getItem('jwtToken') &&
                <button class="btn btn-primary" onClick={this.logout}>Logout</button>
              }</h3>
          </Container>
        </div>
        </div>
        );
      }
    }
  
  export default MyProfile;