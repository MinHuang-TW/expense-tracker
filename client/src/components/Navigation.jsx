import React, { useState, useContext, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import moment from 'moment';
import { GlobalContext } from '../context/GlobalState';
import { checkDayTime, getGreeting } from '../utils/calculation.js'
import { DayIcon, NightIcon } from '../images/daytimeIcon';
import { CssBaseline, AppBar, Drawer, Hidden, IconButton, Toolbar, Typography, MenuItem, MenuList, ListItemIcon } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import LibraryBooksSharpIcon from '@material-ui/icons/LibraryBooksSharp';
import EqualizerSharpIcon from '@material-ui/icons/EqualizerSharp';
import MeetingRoomSharpIcon from '@material-ui/icons/MeetingRoomSharp';
import { defaultMaterialTheme } from '../utils/colorTheme';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

const Navigation = ({ container, children, location: { pathname } }) => {
  const { getToken, getCurrentUser } = useContext(GlobalContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const token = getToken();
  const drawerWidth = 240;

  const now = new Date();
  const dayTime = checkDayTime(now);

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
    },
    content: {
      flexGrow: 1,
      marginTop: '55px',
      [theme.breakpoints.up('sm')]: {
        marginTop: 0,
      },
    },
    textColor: {
      color: dayTime ? '#232c2d' : 'white',
      opacity: 0.8,
    },
    selectedColor: {
      color: '#65bcbf',
      fontWeight: 800,
    },
    appbarTitle: {
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%)',
      margin: '0 auto',
      fontSize: '16px', 
      textTransform: 'uppercase',
    },
  }));

  const classes = useStyles();

  const iconSize = { fontSize: '20px' };
  const drawerList = [
    { name: 'Home', path: '/user', icon: <HomeSharpIcon style={iconSize} /> },
    { name: 'Report', path: '/report', icon: <LibraryBooksSharpIcon style={iconSize} /> },
    { name: 'Statistics', path: '/statistics', icon: <EqualizerSharpIcon style={iconSize} /> },
    { name: 'Logout', path: '/logout', icon: <MeetingRoomSharpIcon style={iconSize} /> },
  ]

  const getCurrentTitle = pathname => {
    for (let i = 0; i < drawerList.length; i++) {
      if (drawerList[i]['path'] === pathname) return drawerList[i]['name'];
    }
  }

  const drawer = (
    <Fragment>
      <div className='block-greeting'>
        <Typography variant='h6' className={classes.textColor} gutterBottom>
          <p style={{ opacity: 0.3 }}>{moment().format('ddd, DD MMM')}</p>
          Good {getGreeting(now)},
        </Typography>

        <Typography color='primary' variant='h4' className='username'>
          {token && getCurrentUser().name}
        </Typography>

        <div style={{ textAlign: 'right' }}>
          {dayTime ? <DayIcon width='40%' /> : <NightIcon width='40%' />}
        </div>
      </div>

      <MenuList id='menu'>
      {drawerList.map(list => (
        <MenuItem 
          key={list.name} 
          to={list.path} component={ NavLink } 
          selected={list.path === pathname} 
          style={{ minHeight: '48px' }}
        >
          <ListItemIcon
            style={{ minWidth: '35px' }}
            className={list.path === pathname ? classes.selectedColor : classes.textColor}
          >
            {list.icon}
          </ListItemIcon>
          <p 
            style={{ fontSize: '14px' }}
            className={list.path === pathname  ? classes.selectedColor : classes.textColor}
          >
            {list.name}
          </p>
        </MenuItem>
      ))}
      </MenuList>
    </Fragment>
  );

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            {token && 
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={() => setMobileOpen(!mobileOpen)}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>}

            {!token 
              ? <Typography variant="h6">Expense Tracker</Typography>
              : <Typography variant="h6" className={classes.appbarTitle}>
                  {getCurrentTitle(pathname)}
                </Typography>
            }
          </Toolbar>
        </AppBar>

        {token && 
        <nav className={classes.drawer} aria-label="navigation">
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
            <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
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

export default withRouter(Navigation);
