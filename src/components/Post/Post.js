import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { CardActionArea, CardMedia } from '@material-ui/core';

import defaultAvatar from '../../assets/img/default.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
  commentField: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    border: '1px solid #eee',
    backgroundColor: theme.palette.type === 'dark' ? '#333' : '#EFEFEF',
  },

  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  avatar: {
    backgroundColor: theme.palette.secondary,
    height: theme.spacing(5),
    width: theme.spacing(5),
  },
  postActions: {
    display: 'flex',

    alignItems: 'center',
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
  actionBtnLove: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      color: red[900],
      backgroundColor: 'transparent',
    },
  },
  actionBtnComment: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      color: theme.palette.primary.light,
      backgroundColor: 'transparent',
    },
  },
  commenter: {
    display: 'flex',
    padding: theme.spacing(2),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    color: theme.palette.type === 'dark' ? '#FFF' : '#000',
  },
}));

export default function Post(props) {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              variant="rounded"
              aria-label="article"
              className={classes.avatar}
              src={defaultAvatar}
            />
          }
          title={
            <Link to={`/user/${props.userId}`} component={RouterLink}>
              {props.user}
            </Link>
          }
          subheader={props.createdAt}
        />
        <Link
          underline="none"
          component={RouterLink}
          to={`/article/${props.slug}`}
        >
          <CardActionArea style={{ textDecoration: 'none' }}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="200"
              image={`https://young-bayou-54809.herokuapp.com/assets${props.cover}`}
              title="Contemplative Reptile"
            />

            <CardContent>
              <Typography
                variant="h5"
                className={classes.title}
                color="textSecondary"
                component="h2"
              >
                {props.title}
              </Typography>
              <div style={{ textDecoration: 'none', color: '#333' }}>
                {props.tags}
              </div>
            </CardContent>
            <CardActions
              style={{ textDecoration: 'none', color: '#333' }}
              className={classes.postActions}
            >
              <div
                aria-label="add to favorites"
                className={classes.actionBtnLove}
              >
                <FavoriteBorder className={classes.marginRight} />
                <Typography variant="subtitle1">
                  {props.likes.length}
                </Typography>
              </div>
              <div className={classes.actionBtnComment} aria-label="share">
                <ChatBubbleOutlineIcon className={classes.marginRight} />
                <Typography variant="subtitle1">
                  {props.comments.length}
                </Typography>
              </div>
            </CardActions>
          </CardActionArea>
        </Link>
      </Card>
    </>
  );
}
