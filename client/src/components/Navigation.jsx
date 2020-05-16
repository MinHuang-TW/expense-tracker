import React, { useState, useContext, useCallback, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import TransactionForm from './common/TransactionForm';
import { checkDayTime, getGreeting } from '../utils/calculation.js';
import { DayIcon, NightIcon } from '../images/daytimeIcon';
import { CssBaseline, AppBar, Drawer, Hidden, IconButton, Toolbar, Typography, MenuItem, MenuList, ListItemIcon, Fab, Zoom } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardSharpIcon from '@material-ui/icons/DashboardSharp';
import LibraryBooksSharpIcon from '@material-ui/icons/LibraryBooksSharp';
import EqualizerSharpIcon from '@material-ui/icons/EqualizerSharp';
import MeetingRoomSharpIcon from '@material-ui/icons/MeetingRoomSharp';
import AccountBoxSharpIcon from '@material-ui/icons/AccountBoxSharp';
import AddIcon from '@material-ui/icons/Add';
import { defaultMaterialTheme } from '../utils/colorTheme';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import moment from 'moment';

const Navigation = ({ container, children, location: { pathname } }) => {
  const { getToken, users, loadUser } = useContext(GlobalContext);
  const [mobileOpen, setMobileOpen] = useState(false),
        [open, setOpen] = useState(false);
  const token = getToken();
  const drawerWidth = 240;

  const now = new Date(),
        dayTime = checkDayTime(now);

  const useStyles = makeStyles((theme) => ({
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
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      boxShadow: 'none',
    },
  }));
  const theme = useTheme();
  const classes = useStyles();

  const transition = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  const showAddButton = 
    token !== null && pathname !== '/profile' && pathname !== '/statistics';
  const delay = {transitionDelay: `${showAddButton ? transition.exit : 0}ms`};

  const iconSize = { fontSize: '20px' };
  const drawerList = [
    {
      name: 'dashboard',
      icon: <DashboardSharpIcon style={iconSize} />,
    },
    {
      name: 'transactions',
      icon: <LibraryBooksSharpIcon style={iconSize} />,
    },
    {
      name: 'statistics',
      icon: <EqualizerSharpIcon style={iconSize} />,
    },
    {
      name: 'profile',
      icon: <AccountBoxSharpIcon style={iconSize} />,
    },
    {
      name: 'logout',
      icon: <MeetingRoomSharpIcon style={iconSize} />,
    },
  ];

  const getCurrentTitle = (pathname) => {
    for (let i = 0; i < drawerList.length; i++) {
      if ('/' + drawerList[i]['name'] === pathname)
        return drawerList[i]['name'];
    }
  };

  const handleClose = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  const handleForm = useCallback(() => {
    setOpen(true);
  }, []);

  const drawer = (<>
    <div className='block-greeting'>
      <Typography variant='h6' className={classes.textColor} gutterBottom>
        <p style={{ opacity: 0.3 }}>{moment().format('dddd, D MMMM')}</p>
        Good {getGreeting(now)},
      </Typography>

      <Typography color='primary' variant='h4' className='username'>
        {token && users.user && users.user.name}
      </Typography>

      <div style={{ textAlign: 'right' }}>
        {dayTime ? <DayIcon width='40%' /> : <NightIcon width='40%' />}
      </div>
    </div>

    <MenuList id='menu'>
      {drawerList.map(({ name, icon }) => {
        const path = '/' + name;
        const itemColor = (path) => {
          if (path === pathname) return classes.selectedColor;
          return classes.textColor;
        };
        return (
          <MenuItem
            key={name}
            to={path}
            component={NavLink}
            selected={path === pathname}
            style={{ minHeight: '48px' }}
            onClick={handleClose}
          >
            <ListItemIcon className={itemColor(path)} style={{ minWidth: '35px' }}>
              {icon}
            </ListItemIcon>
            <p className={itemColor(path)} style={{ fontSize: '14px' }}>
              {name}
            </p>
          </MenuItem>
        );
      })}
    </MenuList>
  </>);

  useEffect(() => {
    token && loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position='fixed' className={classes.appBar}>
          <Toolbar>
            {token && (
              <IconButton
                aria-label='open drawer'
                edge='start'
                onClick={handleOpen}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            )}

            {!token ? (
              <Typography variant='h6'>Expense Tracker</Typography>
            ) : (
              <Typography variant='h6' className={classes.appbarTitle}>
                {getCurrentTitle(pathname)}
              </Typography>
            )}
          </Toolbar>
        </AppBar>

        {token && (
          <nav className={classes.drawer} aria-label='navigation'>
            <Hidden smUp implementation='css'>
              <Drawer
                container={container}
                variant='temporary'
                open={mobileOpen}
                onClose={handleOpen}
                classes={{ paper: classes.drawerPaper }}
                ModalProps={{ keepMounted: true }}
              >
                {drawer}
              </Drawer>
            </Hidden>

            <Hidden xsDown implementation='css'>
              <Drawer
                classes={{ paper: classes.drawerPaper }}
                variant='permanent'
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
        )}

        <main className={classes.content}>{children}</main>

        <Zoom in={showAddButton} timeout={transition} style={delay} unmountOnExit>
          <Fab
            color='primary'
            aria-label='add'
            disableRipple
            className={`${classes.fab} no-outline`}
            onClick={handleForm}
          >
            <AddIcon />
          </Fab>
        </Zoom>

        <TransactionForm open={open} setOpen={setOpen} action='new' />
      </div>
    </ThemeProvider>
  );
};

export default withRouter(Navigation);