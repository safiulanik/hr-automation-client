import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar/index';
import Button from '@material-ui/core/Button/index';
import CssBaseline from '@material-ui/core/CssBaseline/index';
import FormControl from '@material-ui/core/FormControl/index';
import Input from '@material-ui/core/Input/index';
import InputLabel from '@material-ui/core/InputLabel/index';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Add from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper/index';
import Typography from '@material-ui/core/Typography/index';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from "axios/index";
import settings from "../local_settings";
import history from './history';
import Grid from "@material-ui/core/Grid/index";
import {Link as RouterLink} from "react-router-dom";
import Cookies from 'js-cookie';

export const getAccessToken = () => Cookies.get('access_token');
export const getUser = () => Cookies.get('user');
export const isAuthenticated = () => !!getAccessToken();

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      token: "",
      email: "", firstName: ""
    };
    if(isAuthenticated()) history.push('/');
  }

  handleChange = event => {
      this.setState({
          [event.target.id]: event.target.value
      });
  };

  handleSubmit = event => {
    event.preventDefault();

    try {
      axios.post(settings.base_url + '/api/v1/login/', {
        username: this.state.username,
        password: this.state.password
      }).then(res => {
        console.log(res.data);
        this.setState({
            token: res.data.token,
            email: res.data.user.email,
            firstName: res.data.user.first_name,
            role: 'engineer',
        });
        Cookies.set('access_token', res.data.token);
        Cookies.set('user', res.data.user);
        this.props.userHasAuthenticated(true);
        history.push({
          pathname: "/",
          state: {
              isAuthenticated: this.props.isAuthenticated,
              firstName: this.state.firstName,
              token: this.state.token,
              role: this.state.role,
          }
        });
      }).catch(err => {
          alert('Login failed!');
          console.log('error loading data', err);
      });
    } catch (e) {
      alert(e.message);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
              Login
          </Typography>

          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
                <Input id="username" name="username" autoComplete="username"
                       autoFocus value={this.state.username}
                       onChange={this.handleChange} />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input name="password" type="password" id="password" autoComplete="current-password"
                       value={this.state.password} onChange={this.handleChange} />
            </FormControl>

            <Grid container spacing={24}>
                <Grid item xs={6}>
                    <Button type="submit" fullWidth variant="contained"
                            color="primary" className={classes.submit}
                    > Sign in</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button type="button" fullWidth variant="contained"
                            color="primary" className={classes.submit}
                            component={RouterLink} to="/sign-up"
                    > <Add /> Sign Up </Button>
                </Grid>
            </Grid>
          </form>
        </Paper>
      </main>
    );
  }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);