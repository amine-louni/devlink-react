import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { post } from "./../http";
import NavBar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Card, Container, Grid } from "@material-ui/core";

import Post from "../components/Post/Post";
import MyCard from "../components/common/myCard";
import MyAside from "../components/common/MyAside";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PostLists from "../components/dashboard/PostLists";
import PostCardSm from "../components/common/postCardSm";
import { Skeleton } from "@material-ui/lab";

function Home(props) {
  const [posts, setPosts] = React.useState([]);
  const [localLoading, setLocalLoading] = React.useState(true);
  const [myPosts, setMyPosts] = useState([]);
  dayjs.extend(relativeTime);

  useEffect(() => {
    (async () => {
      const res = await post.get("/reading-list");
      setMyPosts(res.data.data.docs);
    })();
  }, []);
  React.useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await post.get("/");
        setPosts(res.data.data.docs);
        setLocalLoading(false);
      } catch (err) {
        return (
          <h4>
            Ops some thing went wrong , refresh the page{" "}
            <span role="img" aria-label="why">
              🙄
            </span>
          </h4>
        );
      }
    };

    getPosts();
  }, []);
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: 27 }}>
        <Grid container spacing={3}>
          <Grid item md={4}>
            <MyCard />

            <MyAside />
          </Grid>

          <Grid item md={5}>
            <h3 style={{ marginTop: "0" }}>Posts</h3>
            {posts.map((post) => (
              <Post
                key={post._id}
                user={`${post.user.firstName}  ${post.user.lastName}`}
                slug={post.slug}
                userId={post.user._id}
                createdAt={dayjs(post.createdAt).from(dayjs())}
                cover={post.cover}
                title={post.title}
                tags={post.tags}
                likes={post.likes}
                comments={post.comments}
                parentLoading={localLoading}
                avatar={post.user.avatar}
              />
            ))}
          </Grid>
          <Grid md={3}>
            {props.loading ? (
              <Skeleton variant="rect" height="100" animation="wave" />
            ) : (
              <>
                <Card style={{ padding: 10 }}>
                  <h4>{props.isAuth ? "Reading list" : "Login"}</h4>
                  {props.isAuth &&
                    props.readingList.map((post) => (
                      <PostCardSm post={post} key={post._id} />
                    ))}
                </Card>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
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

export default connect(mapStateToProps)(Home);
