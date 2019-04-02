import React, {Component} from 'react';
import Login from "./containers/Login";
import Requests from "./components/Requests";
import Users from "./components/Users";
import Layout from "./containers/Layout";
import {Router, Route, Switch} from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import NotFound from "./containers/NotFound";
import axios from "axios";
import settings from "./local_settings";
import history from "./components/history";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  componentDidMount() {
    try {
      axios.get(settings.base_url + '/api/v1/get-user/')
        .then(res => {
          console.log(res.data);
          if (res.data)
            this.userHasAuthenticated(true);
        }).catch(err => {
          console.log('error loading data', err);
        });
    }
    catch(e) {
      if (e !== 'No current user') {
        console.log(e);
      }
    }
    this.setState({ isAuthenticating: false });
  };

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  handleLogout = event => {
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Layout} props={childProps} />
            <AppliedRoute path="/login" exact component={Login} props={childProps} />
            <Route exact path="/requests" component={Requests} props={childProps} />
            <Route exact path="/users" component={Users} props={childProps} />
            <Route exact path="/logout" component={Login} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default (App);

{/*{this.state.isAuthenticated*/}
{/*    ? <NavItem onClick={this.handleLogout}>Logout</NavItem>*/}
{/*    : <Fragment>*/}
{/*      <LinkContainer to="/signup">*/}
{/*        <NavItem>Signup</NavItem>*/}
{/*      </LinkContainer>*/}
{/*      <LinkContainer to="/login">*/}
{/*        <NavItem>Login</NavItem>*/}
{/*      </LinkContainer>*/}
{/*    </Fragment>*/}
{/*}*/}