import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar/index';
import Button from '@material-ui/core/Button/index';
import CssBaseline from '@material-ui/core/CssBaseline/index';
import FormControl from '@material-ui/core/FormControl/index';
import Input from '@material-ui/core/Input/index';
import InputLabel from '@material-ui/core/InputLabel/index';
import PersonAdd from '@material-ui/icons/PersonAdd';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import Paper from '@material-ui/core/Paper/index';
import Typography from '@material-ui/core/Typography/index';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from "axios/index";
import settings from "../local_settings";
import history from './history';
import Grid from "@material-ui/core/Grid/index";
import {Link as RouterLink} from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      token: "",
      email: "",
      firstName: "",
      lastName: "",
      role: ""
    };
  }

  handleChange = event => {
      console.log(event.target);
      this.setState({
          [event.target.name]: event.target.value
      });
  };

  handleSubmit = event => {
    event.preventDefault();

    try {
      axios.post(settings.base_url + '/api/v1/signup/', {
        username: this.state.email,
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        role: this.state.role,
      }).then(res => {
        console.log(res.data);
        this.setState({
            token: res.data.token,
            email: res.data.email,
            username: res.data.email,
        });
        // this.props.userHasAuthenticated(true);
        alert('Registration successful! You can login now.');
        history.push("/");
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
              <PersonAdd />
          </Avatar>
          <Typography component="h1" variant="h5">
              Sign up
          </Typography>

          <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="firstName">First Name</InputLabel>
                  <Input id="firstName" name="firstName" value={this.state.firstName}
                         autoFocus onChange={this.handleChange} />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="lastName">Last Name</InputLabel>
                  <Input id="lastName" name="lastName" value={this.state.lastName}
                         onChange={this.handleChange} />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input id="email" name="email" value={this.state.email}
                         onChange={this.handleChange} />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="role">Employee Role</InputLabel>
                  <Select
                      value={this.state.role}
                      onChange={this.handleChange}
                      inputProps={{
                          name: 'role',
                          id: 'role',
                      }}
                  >
                      <MenuItem value={'engineer'}>Engineer</MenuItem>
                      <MenuItem value={'hr'}>HR</MenuItem>
                      <MenuItem value={'manager'}>Manager</MenuItem>
                  </Select>
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
                    > Register</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button type="button" fullWidth variant="contained"
                            color="primary" className={classes.submit}
                            component={RouterLink} to='/login'
                    > <ArrowBack /> Login </Button>
                </Grid>
            </Grid>
          </form>
        </Paper>
      </main>
    );
  }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);