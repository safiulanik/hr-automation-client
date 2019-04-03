import React from 'react';
import Divider from '@material-ui/core/es/Divider/Divider';
import List from '@material-ui/core/es/List/List';
import ListItem from '@material-ui/core/es/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/es/ListItemIcon/ListItemIcon';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import ListItemText from '@material-ui/core/es/ListItemText/ListItemText';
import { withStyles } from '@material-ui/core/styles/index';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import RequestIcon from '@material-ui/icons/Assignment';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import Hidden from '@material-ui/core/es/Hidden/Hidden';
import Drawer from '@material-ui/core/es/Drawer/Drawer';

const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
});

class MenuDrawer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      const { classes, theme, mobileOpen } = this.props;

      const drawer = (
        <div>
          <div className={classes.toolbar} />
          <Divider />
          <List>
            {[
                { name: 'Home', url: '/', icon: <HomeIcon/> },
                { name: 'Requests', url: '/requests', icon: <RequestIcon/> },
                { name: 'Users', url: '/users', icon: <PeopleIcon/> },
                { name: 'Logout', url: '/logout', icon: <LogoutIcon/>}
            ].map((menu) => {
              return (
                <Link component={RouterLink}
                      to={menu.url}
                      key={menu.name}>
                  <ListItem button>
                    <ListItemIcon>{menu.icon}</ListItemIcon>
                    <ListItemText primary={menu.name} />
                  </ListItem>
                </Link>
              );
            })}

          </List>
        </div>
      );

      return (
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={this.props.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      )
    }
}

export default withStyles(styles, { withTheme: true })(MenuDrawer);
