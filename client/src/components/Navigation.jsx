import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { ThemeProvider } from '@material-ui/core/styles';
import { defaultMaterialTheme } from '../utils/colorTheme';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, AppBar, Divider, Drawer, Hidden, IconButton, Toolbar, Typography} from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
// import MailIcon from '@material-ui/icons/Mail';
// import InboxIcon from '@material-ui/icons/MoveToInbox';

const token = localStorage.getItem('token');
const drawerWidth = 240;

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
    background: '#EAEBED',
    // background: '#F3F5F4',
  },
  content: {
    flexGrow: 1,
  },
}));

const Navigation = props => {
  const { logoutUser } = useContext(GlobalContext);
  const { container, children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();

  // const token = localStorage.getItem('token');

  const drawer = (
    <div>
        <div className={classes.toolbar} />
        <Divider />
        {/* <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
        <Divider />
        <List>
          <ListItem button onClick={logoutUser}>
            <ListItemText primary='Logout' />
          </ListItem>
        </List>
      </div>
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
