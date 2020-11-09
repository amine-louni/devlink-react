import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  ListItemSecondaryAction,
  IconButton,
  MenuItem,
  Menu,
  TextField,
  Button,
} from '@material-ui/core';
import dayjs from 'dayjs';
import { MoreHoriz } from '@material-ui/icons';

import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { post } from '../../http';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  fonts: {
    fontWeight: 'bold',
  },
  inline: {
    display: 'inline',
  },
  commentText: {
    backgroundColor: theme.palette.type === 'dark' ? '#333' : '#EFEFEF',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    margin: 0,
  },
}));

function PostComment(props) {
  const classes = useStyles();
  const [myComments, setMyComments] = React.useState([]);
  const [commentOnEdit, setItemOnEdit] = React.useState(null);
  const [updatedComment, setUpdatedComment] = React.useState('');
  const handleSetItemOnEdit = (id, text) => {
    setItemOnEdit(id);
    setUpdatedComment(text);
  };

  const deleteComment = async (cb, commentId) => {
    // 'posts/:post_id/comments/:comment_id')

    try {
      const res = await post.delete(
        `/${props.articleId}/comments/${commentId}`
      );

      setMyComments(res.data.docs);
      cb();
    } catch (err) {
      console.log(err);
    }
  };
  const updateComment = async (commentId, commentText) => {
    // 'posts/:post_id/comments/:comment_id')

    try {
      const res = await post.patch(
        `/${props.articleId}/comments/${commentId}`,
        { text: commentText }
      );

      setMyComments(res.data.docs);
      setItemOnEdit(null);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    (async () => {
      const comments = await props.comments;
      await setMyComments(comments);
    })();
  }, [props]);
  return (
    <List className={classes.root}>
      {myComments &&
        myComments.map((comment) => {
          return (
            <React.Fragment key={comment._id}>
              {commentOnEdit === comment._id ? (
                <ListItem
                  key={comment._id}
                  id={comment._id}
                  alignItems="flex-start"
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={comment.user.userName}
                      src={comment.user.avatar}
                    />
                  </ListItemAvatar>

                  <ListItemText
                    className={classes.commentText}
                    primary={
                      <Typography className={classes.fonts}>
                        @{comment.user.userName}
                        <Typography
                          component="span"
                          variant="caption"
                          color="textPrimary"
                        >
                          <Box mx={1} component="span">
                            |
                          </Box>{' '}
                          {dayjs(comment.createdAt).format('DD/MM/YYYY')}
                        </Typography>
                      </Typography>
                    }
                    secondary={
                      <>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            updateComment(comment._id, updatedComment);
                          }}
                        >
                          <TextField
                            fullWidth
                            multiline
                            onChange={(e) => {
                              setUpdatedComment(e.currentTarget.value);
                            }}
                            variant="outlined"
                            value={updatedComment}
                          />
                          <Button type="submit">update</Button>
                        </form>
                      </>
                    }
                  />
                  {!props.loading && comment.user._id === props.user._id && (
                    <ListItemSecondaryAction style={{ right: '-4px' }}>
                      <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                          <React.Fragment>
                            <IconButton {...bindTrigger(popupState)}>
                              <MoreHoriz />
                            </IconButton>
                            <Menu {...bindMenu(popupState)}>
                              <MenuItem
                                onClick={() => {
                                  deleteComment(popupState.close, comment._id);
                                }}
                              >
                                Delete
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  handleSetItemOnEdit(
                                    comment._id,
                                    comment.text
                                  );

                                  popupState.close();
                                }}
                              >
                                Edit
                              </MenuItem>
                            </Menu>
                          </React.Fragment>
                        )}
                      </PopupState>
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
              ) : (
                <ListItem
                  key={comment._id}
                  id={comment._id}
                  alignItems="flex-start"
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={comment.user.userName}
                      src={comment.user.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    className={classes.commentText}
                    primary={
                      <Typography className={classes.fonts}>
                        @{comment.user.userName}
                        <Typography
                          component="span"
                          variant="caption"
                          color="textPrimary"
                        >
                          <Box mx={1} component="span">
                            |
                          </Box>{' '}
                          {dayjs(comment.createdAt).format('DD/MM/YYYY')}
                        </Typography>
                      </Typography>
                    }
                    secondary={<>{`   ${comment.text}`}</>}
                  />
                  {!props.loading && comment.user._id === props.user._id && (
                    <ListItemSecondaryAction style={{ right: '-4px' }}>
                      <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                          <React.Fragment>
                            <IconButton {...bindTrigger(popupState)}>
                              <MoreHoriz />
                            </IconButton>
                            <Menu {...bindMenu(popupState)}>
                              <MenuItem
                                onClick={() => {
                                  deleteComment(popupState.close, comment._id);
                                }}
                              >
                                Delete
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  handleSetItemOnEdit(
                                    comment._id,
                                    comment.text
                                  );
                                  popupState.close();
                                }}
                              >
                                Edit
                              </MenuItem>
                            </Menu>
                          </React.Fragment>
                        )}
                      </PopupState>
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
              )}
            </React.Fragment>
          );
        })}
    </List>
  );
}
const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
    loading: auth.loading,
  };
};
export default connect(mapStateToProps)(PostComment);
