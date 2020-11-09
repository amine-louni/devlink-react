import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import PostLists from "./PostLists";

const useStyles = makeStyles({
  root: {
    minHeight: 400,
  },
  empty: {
    height: 400,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

function MyPosts(props) {
  return (
    <Switch>
      <Route
        path="/dashboard/"
        component={() => (
          <PostLists posts={props.posts} parentLoading={props.parentLoading} />
        )}
        exact
      />
      <Route
        path="/dashboard/reading-list/"
        component={() => (
          <PostLists
            posts={props.readingList}
            parentLoading={props.parentLoading}
          />
        )}
        exact
      />
    </Switch>
  );
}
const mapStateToProps = (state) => {
  return {
    readingList:
      state && state.auth && state.auth.user && state.auth.user.readingList,
  };
};

export default connect(mapStateToProps)(MyPosts);
