import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";

import { Chip, ListItemSecondaryAction } from "@material-ui/core";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  link: {
    textDecoration: "none",
    color:
      theme.palette.type === "dark"
        ? theme.palette.common.white
        : theme.palette.common.black,
  },
}));

function Aside(props) {
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
      <NavLink to="/dashboard/" className={classes.link}>
        <ListItem button>
          <ListItemText primary="My posts" />
          <ListItemSecondaryAction>
            <Chip label={props.posts && props.posts.length} />
          </ListItemSecondaryAction>
        </ListItem>
      </NavLink>

      <NavLink to="/dashboard/reading-list" className={classes.link}>
        <ListItem button>
          <ListItemText primary="Reading list" />
          <ListItemSecondaryAction>
            <Chip label={props?.readingList?.length} />
          </ListItemSecondaryAction>
        </ListItem>
      </NavLink>
    </List>
  );
}
const mapStateToProps = (state) => {
  return {
    readingList:
      state && state.auth && state.auth.user && state.auth.user.readingList,
    isAuth: state && state.auth && state.auth.isAuth,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps)(Aside);
