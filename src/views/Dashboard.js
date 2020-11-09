import React from 'react';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import { Container, Grid, Typography } from '@material-ui/core';
import StatCard from '../components/dashboard/StatCard';
import Aside from '../components/dashboard/Aside';
import MyPosts from '../components/dashboard/Myposts';

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <Container style={{ marginTop: 17 }}>
        <Grid container>
          <Grid container spacing={4}>
            <Grid item md={4}>
              <StatCard title="Total posts reactions" amount={454} />
            </Grid>
            <Grid item md={4}>
              <StatCard title="Saved posts" amount={7} />
            </Grid>
            <Grid item md={4}>
              <StatCard title="Total posts views" amount={954} />
            </Grid>
          </Grid>
        </Grid>

        <Grid container style={{ marginTop: 30 }}>
          <Grid item md={4}>
            <Aside />
          </Grid>
          <Grid item md={8}>
            <Typography variant="subtitle2">My posts</Typography>
            <MyPosts />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}
