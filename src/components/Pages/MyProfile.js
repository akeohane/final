import React, { Component } from "react";
import Nav from "../Nav";
import Container from "../Container";
import AddAnInterest from "../AddAnInterest";
import axios from 'axios';


class MyProfile extends Component {

    constructor(props) {
      super(props);
      // Don't call this.setState() here!
      this.state = {
          interest: "",
          interests:[],
          interestedEvents: [],
          events: [],
      };
    }
    logout = () => {
      localStorage.removeItem('jwtToken');
      window.location.reload();
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
            interests: response.data[0].interests
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
          <Container style={{ minHeight: "80%" }}>
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