import React, { useState, useContext, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import { ThemeProvider } from '@material-ui/core/styles';
import { defaultMaterialTheme } from '../utils/colorTheme';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, AppBar, Drawer, Hidden, IconButton, Toolbar, Typography, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import MeetingRoomSharpIcon from '@material-ui/icons/MeetingRoomSharp';
// import ListAltIcon from '@material-ui/icons/ListAlt';

const Navigation = props => {
  const { getToken, getCurrentUser } = useContext(GlobalContext);
  const { container, children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const token = getToken();
  const drawerWidth = 240;

  const currentHours = new Date().getHours();
  const greeting = hour => {
    if (hour < 13) return 'morning';
    if (hour < 18) return 'afternoon';
    if (hour < 23) return 'evening';
    return 'day';
  };
  
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      boxShadow: 'none',
      [theme.breakpoints.up('sm')]: {
        width: token && `calc(100% - ${drawerWidth}px)`,
        marginLeft: token && drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      background: currentHours < 18 ? '#EAEBED' : '#232c2d',
      // background: '#F3F5F4',
    },
    content: {
      flexGrow: 1,
    },
    textColor: {
      opacity: 0.8,
      color: currentHours < 18 ? '#232c2d' : 'white',
      textDecoration: 'none',
    },
    menuIcon: {
      marginRight: '15px',
      opacity: 0.5,
    }
  }));

  const classes = useStyles();

  const drawer = (
    <Fragment>
      {/* <div className={classes.toolbar} /> */}
      <div style={{ margin: '48px 16px' }}>
        <Typography variant='h5' gutterBottom className={classes.textColor}>
          Good {greeting(currentHours)},
        </Typography>
        <Typography color='primary' variant='h4' style={{ textTransform: 'capitalize'}}>
          {token && getCurrentUser().name}
        </Typography>
      </div>

      <NavLink to='/user' className={classes.textColor}>
        <MenuItem>
          <HomeSharpIcon className={classes.menuIcon} />
          Home
        </MenuItem>
      </NavLink>
      {/* <NavLink>
        <ListAltIcon className={classes.menuIcon} />
        Report
      </NavLink> */}

      <NavLink to='/logout' className={classes.textColor}>
        <MenuItem>
          <MeetingRoomSharpIcon className={classes.menuIcon} />
          Logout
        </MenuItem>
      </NavLink>
    </Fragment>
  );

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <CssBaseline />
      <div className={classes.root}>

        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            {token && <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>}
            <Typography variant="h6" noWrap style={{ opacity: 0.8 }}>
              Expense Tracker
            </Typography>
          </Toolbar>
        </AppBar>

        {token && <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={() => setMobileOpen(!mobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>}
    
        <main className={classes.content}>
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Navigation;
