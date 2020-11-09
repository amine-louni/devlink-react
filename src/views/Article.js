import React from 'react';
import { connect } from 'react-redux';
import { bookPost, unBookPost } from '../actions';
import { post } from '../http';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import PostPreview from '../components/common/postPreview/PostPreview';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ShareIcon from '@material-ui/icons/Share';
import defaultAvatar from '../assets/img/default.jpg';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import dayjs from 'dayjs';
import Skeleton from '@material-ui/lab/Skeleton';

import PostCommentComp from '../components/Post/PostComment';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
  media: {
    height: 340,
  },
  body: {
    fontFamily: 'Segoe UI',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

  action: {
    marginBottom: 15,
    cursor: 'pointer',
  },
}));

function Article(props) {
  const [loading, setLoading] = React.useState(true);
  const [article, setArticle] = React.useState({});
  const [liked, setLiked] = React.useState(false);

  const [comment, setComment] = React.useState('');

  React.useEffect(() => {
    (async () => {
      try {
        const res = await post.get(`/slug/${props.match.params.slug}`);

        const article = res.data.data.data;
        document.title = `DevLink 👩‍💻👩‍💻 | ${article.title}`;
        setArticle(article);
        setLoading(false);
        article.likes.some((like) => like.user._id === props.user._id)
          ? setLiked(true)
          : setLiked(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [props]);

  const likePost = async (id) => {
    //{{URL}}/posts/likes/5f4e2b2aa601e13e640b7cce
    try {
      await post.patch(`/likes/${id}`);
      setLiked(!liked);
    } catch (err) {
      console.log(err);
    }
  };

  const postComment = async (e, id) => {
    //{{URL}}/posts/comments/5f4e2b2aa601e13e640b7cce
    e.preventDefault();
    try {
      await post.post(`/comments/${id}`, { text: comment });
      setArticle({
        ...article,
        comments: [
          {
            user: { ...props.user },
            text: comment,
          },
          ...article.comments,
        ],
      });
      setComment('');
    } catch (err) {
      console.log(err);
    }
  };

  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Container className={classes.root}>
        <Grid container spacing={2}>
          <Grid item md={1}>
            <div className={classes.actions}>
              {liked ? (
                <IconButton
                  onClick={() => {
                    likePost(article._id);
                  }}
                  className={classes.action}
                  aria-label="unlike"
                >
                  <FavoriteIcon />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    likePost(article._id);
                  }}
                  aria-label="like"
                  className={classes.action}
                >
                  <FavoriteBorderIcon />
                </IconButton>
              )}
              {props.user && props.user.readingList.includes(article._id) ? (
                <IconButton
                  className={classes.action}
                  onClick={() => props.unBookPost(article._id)}
                >
                  <BookmarkIcon />
                </IconButton>
              ) : (
                <IconButton
                  className={classes.action}
                  onClick={() => props.bookPost(article._id)}
                >
                  <BookmarkBorderIcon />
                </IconButton>
              )}

              <ShareIcon className={classes.action} />
            </div>
          </Grid>

          <Grid item md={8}>
            <Card>
              {loading ? (
                <Skeleton variant="rect" height={340} />
              ) : (
                <CardMedia
                  className={classes.media}
                  image={`https://young-bayou-54809.herokuapp.com/assets${article.cover}`}
                  title="Contemplative Reptile"
                />
              )}
              <CardContent>
                <Box mb={4}>
                  {loading ? (
                    <Skeleton variant="text" />
                  ) : (
                    article.tags.map((tag, i) => (
                      <Chip
                        key={i}
                        className={classes.skill}
                        size="small"
                        label={tag}
                      />
                    ))
                  )}
                </Box>
                <Typography gutterBottom variant="h4" component="h1">
                  {loading ? <Skeleton variant="text" /> : article.title}
                </Typography>
                <Typography component="div" className={classes.body}>
                  {loading ? (
                    <Skeleton variant="text" />
                  ) : (
                    <PostPreview markdown={article.text} />
                  )}
                </Typography>
              </CardContent>
            </Card>

            <Card style={{ marginTop: 25 }}>
              <CardContent>
                {props.isAuth && (
                  <form onSubmit={(e) => postComment(e, article._id)}>
                    <TextField
                      fullWidth
                      name="comment"
                      onChange={(e) => setComment(e.currentTarget.value)}
                      value={comment}
                      id="comment"
                      label="Type your comment here ... 📝📝"
                      multiline
                      rows={4}
                      variant="outlined"
                    />
                    <Button
                      type="submit"
                      style={{ marginTop: 25 }}
                      variant="contained"
                      color="secondary"
                    >
                      Submit
                    </Button>
                  </form>
                )}

                <PostCommentComp
                  articleId={article && article._id}
                  comments={article.comments}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={3}>
            <Card>
              <CardHeader
                avatar={<Avatar variant="rounded" src={defaultAvatar} />}
                title={`${
                  loading ? <Skeleton variant="text" /> : article.user.firstName
                }   ${
                  loading ? <Skeleton variant="text" /> : article.user.lastName
                } `}
                subheader={
                  loading ? <Skeleton variant="text" /> : article.user.userName
                }
              />
              <CardActions>
                <Button variant="contained" color="primary" fullWidth>
                  Follow
                </Button>
              </CardActions>
              <CardContent>
                <span role="img" aria-label="calendar">
                  📅
                </span>{' '}
                Joined :{' '}
                {loading ? (
                  <Skeleton variant="text" />
                ) : (
                  dayjs(article.createdAt).format('DD/MM/YYYY')
                )}{' '}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
const mapStateToProps = ({ auth }) => {
  return {
    isAuth: auth.isAuth,
    user: auth.user,
    loading: auth.loading,
  };
};
export default connect(mapStateToProps, { bookPost, unBookPost })(Article);
