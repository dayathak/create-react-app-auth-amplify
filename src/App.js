import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import {API, Auth} from 'aws-amplify';
import CreateCase from './CreateCase';
import ViewCase from './ViewCase';
import MyCases from './MyCases';
import Home from './Home';

Amplify.configure(aws_exports);

 

  Auth.currentAuthenticatedUser().then(user => console.log(user.username));
 //console.log(Auth.currentSession().idToken);
  Auth.currentSession().then(session => console.log(session.accessToken.jwtToken));




class App extends Component {
  render() {
    return (
      <div className="App">

        <AmplifySignOut />
        
        <Router>

      <div>     
        <nav>
          <ul>
          <li>
              <NavLink exact to="/" activeClassName="active">CaseManager</NavLink>
            </li>
            <li>
              <NavLink to="/mycases" activeClassName="active">MyCases</NavLink>             
            </li>
            <li>
              <NavLink to="/viewcase" activeClassName="active">ViewCase</NavLink>
            </li>
            <li>
              <NavLink to="/createcase" activeClassName="active">CreateCase</NavLink>
            </li> 
                     
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route exact path="/"  component={Home}/>
          <Route exact path="/mycases" component={MyCases}/>
          <Route exact path="/viewcase" component={ViewCase}/>
          <Route exact path="/createcase" component={CreateCase} />
          
        </Switch>
      </div>
    </Router>
    
 { /*      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          </header> */}
      </div>
    );
  }
}


export default withAuthenticator(App, {

});
