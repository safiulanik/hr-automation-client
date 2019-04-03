import React, {Component} from 'react';
import Login from "./components/Login";
import Requests from "./components/Requests";
import Users from "./components/Users";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import NotFound from "./containers/NotFound";
import axios from "axios";
import settings from "./local_settings";
import history from "./components/history";
import Home from "./components/Home";
import Logout from "./components/Logout";
import SignUp from "./components/SignUp";
import Cookies from 'js-cookie';

export const getAccessToken = () => Cookies.get('access_token');
export const getUser = () => Cookies.get('user');
export const isAuthenticated = () => !!getAccessToken();

class App extends Component {
  constructor(props) {
    super(props);
    console.log(getAccessToken());
    console.log(isAuthenticated());

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      firstName: '',
      role: '',
      token: '',
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
      firstName: this.state.firstName,
      role: this.state.role,
      token: this.state.token,
      userHasAuthenticated: this.userHasAuthenticated
    };
    console.log(this.props);

    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            isAuthenticated() === true
                ? <Component {...props} />
                : <Redirect to='/login' />
        )} />
    );

    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/" component={Home} props={childProps} />
            <AppliedRoute path="/login" exact component={Login} props={childProps} />
            <PrivateRoute exact path="/requests" component={Requests} />
            <PrivateRoute exact path="/users" component={Users} props={childProps} />
            <PrivateRoute exact path="/logout" component={Logout} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default (App);
