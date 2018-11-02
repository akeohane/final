import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Login from './components/Login';
import Register from './components/Register';
import Discover from './components/Pages/Discover';
import Host from './components/Pages/Host';
import MyProfile from './components/Pages/MyProfile';

ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/discover' component={Discover} />
        <Route path='/host' component={Host} />
        <Route path='/myprofile' component={MyProfile} />
      </div>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();