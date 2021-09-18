import React, { useEffect, useState } from "react";
import { post } from "../http";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { Container, Grid, Typography } from "@material-ui/core";
import StatCard from "../components/dashboard/StatCard";
import Aside from "../components/dashboard/Aside";
import MyPosts from "../components/dashboard/Myposts";

export default function Dashboard() {
  const [myPosts, setMyPosts] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const res = await post.get("/me");
      setMyPosts(res.data.data.docs);
      setLocalLoading(false);
    })();
  }, []);
  return (
    <div>
      <Navbar />
      <Container style={{ marginTop: 17 }}>
        <Grid container style={{ marginTop: 30 }}>
          <Grid item md={4}>
            <Aside posts={myPosts} />
          </Grid>
          <Grid item md={8}>
            <MyPosts posts={myPosts} parentLoading={localLoading} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}
