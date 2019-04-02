import React, { Component } from 'react';
import Layout from './containers/Layout';
import Users from './components/Users';
import Requests from './components/Requests';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Router>
        <Switch>
        	<Route exact path="/requests" component={Requests} />
        	<Layout />
        </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
