import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { Avatar, CardHeader } from '@material-ui/core';
import defaultAvatar from '../../assets/img/default.jpg';
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 8,
  },

  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  pos: {
    marginBottom: 12,
  },
  avatar: {
    height: 30,
    width: 30,
  },
});

export default function PostCardSm() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography
            className={classes.title}
            variant="subtitle1"
            component="h2"
          >
            Where do you host your website server side code ?
          </Typography>
        </CardContent>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={defaultAvatar}
            />
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
      </CardActionArea>
    </Card>
  );
}
