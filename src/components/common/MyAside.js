import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import LiveHelpOutlinedIcon from '@material-ui/icons/LiveHelpOutlined';

import BookmarkIcon from '@material-ui/icons/Bookmark';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',

    backgroundColor: theme.palette.background.paper,
    marginTop: '1rem',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function MyAside() {
  const classes = useStyles();

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          My actions
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button>
        <ListItemIcon>
          <BookmarkIcon />
        </ListItemIcon>
        <ListItemText primary="Reading list" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LiveHelpOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="FAQ" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <InfoOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItem>
    </List>
  );
}
