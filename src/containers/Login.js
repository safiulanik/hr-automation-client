import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar/index';
import Button from '@material-ui/core/Button/index';
import CssBaseline from '@material-ui/core/CssBaseline/index';
import FormControl from '@material-ui/core/FormControl/index';
import FormControlLabel from '@material-ui/core/FormControlLabel/index';
import Checkbox from '@material-ui/core/Checkbox/index';
import Input from '@material-ui/core/Input/index';
import InputLabel from '@material-ui/core/InputLabel/index';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper/index';
import Typography from '@material-ui/core/Typography/index';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from "axios";
import settings from "../local_settings";
import history from '../components/history';

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
      email: ""
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
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
        this.setState({
            token: res.data.token,
            email: res.data.user.email
        });
        this.props.userHasAuthenticated(true);
        history.push({
          pathname: "/",
          state: {
              isAuthenticated: this.props.isAuthenticated
          }
        });
      }).catch(err => {
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

            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!this.validateForm()}
                className={classes.submit}
            >
                Sign in
            </Button>
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