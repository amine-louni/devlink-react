import React from "react";
import { Link as RouterLink } from "react-router-dom";

import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import { Avatar, CardHeader } from "@material-ui/core";
import defaultAvatar from "../../assets/img/default.jpg";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 8,
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  pos: {
    marginBottom: 12,
  },
  avatar: {
    height: 30,
    width: 30,
  },
});

export default function PostCardSm(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Link
        underline="none"
        component={RouterLink}
        to={`/article/${props.post && props.post.slug}`}
      >
        <CardActionArea>
          <CardHeader
            title={props.post && props.post.title}
            subheader={props.post && props.post.createdAt}
          />
        </CardActionArea>
      </Link>
    </Card>
  );
}
