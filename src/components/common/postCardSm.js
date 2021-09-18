import React from "react";
import { Link as RouterLink } from "react-router-dom";

import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import { Avatar, Badge, Box, CardHeader, Chip } from "@material-ui/core";
import defaultAvatar from "../../assets/img/default.jpg";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 8,
    padding: 15,
    cursor: "pointer",
    "&:hover": {
      background: "#F4F5F6",
    },
  },

  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
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
    <Box className={classes.root}>
      <Link
        underline="none"
        component={RouterLink}
        to={`/article/${props.post && props.post.slug}`}
      >
        <Typography className={classes.title}>{props?.post?.title}</Typography>
        {props?.post?.tags?.map((tag) => (
          <Chip size="small" label={tag} />
        ))}
        {/* <CardActionArea>
          <CardHeader
          title={props?.post?.title}
          subheader={props?.post?.createdAt}
          />
        </CardActionArea> */}
      </Link>
    </Box>
  );
}
