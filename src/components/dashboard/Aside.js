import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';

import { Chip, ListItemSecondaryAction } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Aside() {
  const classes = useStyles();

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          My statistics
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button>
        <ListItemText primary="My posts" />
        <ListItemSecondaryAction>
          <Chip label="15" />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button>
        <ListItemText primary="Followers" />
        <ListItemSecondaryAction>
          <Chip label="107" />
        </ListItemSecondaryAction>
      </ListItem>

      <ListItem button>
        <ListItemText primary="Following users" />
        <ListItemSecondaryAction>
          <Chip label="7" />
        </ListItemSecondaryAction>
      </ListItem>

      <ListItem button>
        <ListItemText primary="Following hashtags" />
        <ListItemSecondaryAction>
          <Chip label="9" />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}
