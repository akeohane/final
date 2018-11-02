import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      name: '',
      avImgLink: '',
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
    console.log(state)
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, password, name, avImgLink } = this.state;
  

    axios.post('/api/auth/register', { username, password, name, avImgLink})
      .then((result) => {
        this.props.history.push("/login")
      });
  }

  render() {
    const { username, password, name, avImgLink } = this.state;
    return (
      <div class="container">
        <form class="form-signin" onSubmit={this.onSubmit}>
          <h2 class="form-signin-heading">Register</h2>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" class="form-control" placeholder="Email address" name="username" value={username} onChange={this.onChange} required/>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" class="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
          <label for="inputName" class="sr-only">Name</label>
          <input type="name" class="form-control" placeholder="Name" name="name" value={name} onChange={this.onChange} required/>
          <label for="inputPhoto" class="sr-only">Insert link to photo</label>
          <input type="avImgLink" class="form-control" placeholder="Link to an image for your av" name="avImgLink" value={avImgLink} onChange={this.onChange} required/>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Create;