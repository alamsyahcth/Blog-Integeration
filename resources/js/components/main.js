import React, { Component, useState } from 'react';
import { Route, NavLink, HashRouter, BrowserRouter } from 'react-router-dom';
import { makeStyles, useTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core/';

import MailIcon from '@material-ui/icons/Mail';

import Post from './post';

const drawerWidth = 240;

function Main () {
  const classes = useStyles();

  return (
    <HashRouter>
      <BrowserRouter>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" noWrap>
                Tahta CMS
            </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            <div className={classes.drawerContainer}>
              <List component="nav" aria-label="main mailbox folders">
                <NavLink to="/" style={{ textDecoration: 'none' }}>
                  <ListItem button>
                    <ListItemIcon>
                      <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Post" />
                  </ListItem>
                </NavLink>
              </List>
              <Divider />
            </div>
          </Drawer>
          <main className={classes.content}>
            <div>
              <Toolbar />
              <Route exact path="/" component={Post} />
            </div>
          </main>
        </div>
      </BrowserRouter>
    </HashRouter>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor:'#0779e4',
    boxShadow:'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    borderWidth:0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default Main