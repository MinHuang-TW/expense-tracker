import React, { useState, useContext, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import { CssBaseline, AppBar, Drawer, Hidden, IconButton, Toolbar, Typography, MenuItem } from '@material-ui/core';
import { DayIcon, NightIcon } from '../images/daytimeIcon';
import MenuIcon from '@material-ui/icons/Menu';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import MeetingRoomSharpIcon from '@material-ui/icons/MeetingRoomSharp';
import { defaultMaterialTheme } from '../utils/colorTheme';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

const Navigation = ({ container, children }) => {
  const { getToken, getCurrentUser } = useContext(GlobalContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const token = getToken();
  const drawerWidth = 240;

  const currentHours = new Date().getHours();
  const dayTime = !currentHours < 4 && currentHours < 18;
  const greeting = hour => {
    if (hour < 4) return 'night';
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
        display: token ? 'none' : 'default',
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
      color: 'white',
    },
    drawerPaper: {
      width: drawerWidth,
      background: dayTime ? '#EAEBED' : '#232c2d',
      // background: '#F3F5F4',
    },
    content: {
      flexGrow: 1,
    },
    userName: {
      textTransform: 'capitalize', 
      minHeight: '82px',
    },
    textColor: {
      color: dayTime ? '#232c2d' : 'white',
      textDecoration: 'none',
    },
    menuIcon: {
      marginRight: '15px',
      opacity: 0.5,
      display: 'flex',
      justifyContent: 'center',
    },
  }));

  const classes = useStyles();

  const drawerList = [
    { name: 'Home', path: '/user', icon: <HomeSharpIcon /> },
    { name: 'Logout', path: '/logout', icon: <MeetingRoomSharpIcon /> },
  ]

  const drawer = (
    <Fragment>
      <div style={{ margin: '50px 16px' }}>
        <Typography variant='h6' gutterBottom className={classes.textColor}>
          Good {greeting(currentHours)},
        </Typography>

        <Typography color='primary' variant='h4' className={classes.userName}>
          {token && getCurrentUser().name}
        </Typography>

        <div style={{ textAlign: 'right' }}>
          {dayTime ? <DayIcon width='40%' /> : <NightIcon width='40%' />}
        </div>
      </div>

      {drawerList.map(list => 
        (<NavLink key={list.name} to={list.path} className={classes.textColor}>
          <MenuItem>
            <div className={classes.menuIcon}>{list.icon}</div>
            {list.name}
          </MenuItem>
        </NavLink>)
      )}

    </Fragment>
  );

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            {token && <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>}

            {!token && <Typography variant="h6" noWrap>
              Expense Tracker
            </Typography>}
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
