import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuDrawer from '../components/MenuDrawer';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Users from '../components/Users';
import Requests from '../components/Requests';
import Grid from '@material-ui/core/es/Grid/Grid';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class Layout extends React.Component {
  state = {
    mobileOpen: false,
  };
  constructor(props) {
    super(props)
    console.log(props);
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };


  render() {
    const { classes } = this.props;
    const layoutInitial  = (
      
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                HR Automation
              </Typography>
            </Toolbar>
          </AppBar>
          <MenuDrawer
            handleDrawerToggle={this.handleDrawerToggle}
            mobileOpen={this.state.mobileOpen} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container spacing={24}>
              <Grid item xs={12}>
              <Router>
                <Route exact path="/layouts/users" component={Users} />

              </Router>
              </Grid>
            </Grid>
          </main>
        </div>
        );


    return (
      <div>
      {
        this.props.location.pathname.split('/')[1] === 'layouts'? layoutInitial: null
      }
      </div>

      
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Layout);
