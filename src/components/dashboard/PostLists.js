import React from "react";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import PostCardSm from "../common/postCardSm";
import { Typography } from "@material-ui/core";

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

export default function PostLists(props) {
  const classes = useStyles();
  console.log(props);
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent style={{ height: "100%" }}>
        {props.posts &&
          props.posts.map((post) => <PostCardSm post={post} key={post._id} />)}
        {!props.parentLoading && props.posts.length === 0 ? (
          <div className={classes.empty}>
            <Typography variant="h5"> 0 posts 🙄🙄</Typography>
          </div>
        ) : (
          ""
        )}
      </CardContent>
    </Card>
  );
}
