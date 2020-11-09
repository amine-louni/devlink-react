import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import PermIdentityIcon from '@material-ui/icons/PermIdentity';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  link: {
    textDecoration: 'none',
    color:
      theme.palette.type === 'dark'
        ? theme.palette.common.white
        : theme.palette.common.black,
  },
}));

export default function AccountMenu() {
  const classes = useStyles();

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
      className={classes.root}
    >
      <NavLink to="/my-account/infos" className={classes.link}>
        <ListItem button style={{ textDecoration: 'none' }}>
          <ListItemIcon>
            <PermIdentityIcon />
          </ListItemIcon>
          <ListItemText
            style={{ textDecoration: 'none' }}
            primary="My informations"
          />
        </ListItem>
      </NavLink>
      <NavLink to="/my-account/profile" className={classes.link}>
        <ListItem button style={{ textDecoration: 'none' }}>
          <ListItemIcon>
            <InfoOutlinedIcon />
          </ListItemIcon>
          <ListItemText style={{ textDecoration: 'none' }} primary="About me" />
        </ListItem>
      </NavLink>

      <NavLink to="/my-account/profile" className={classes.link}>
        <ListItem button style={{ textDecoration: 'none' }}>
          <ListItemIcon>
            <FolderOpenIcon />
          </ListItemIcon>
          <ListItemText
            style={{ textDecoration: 'none' }}
            primary="My profile"
          />
        </ListItem>
      </NavLink>
    </List>
  );
}
