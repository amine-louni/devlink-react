import React from "react";
import { Grid, Container } from "@material-ui/core";

import Intro from "../components/profile/Intro";
import NavBar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Bio from "../components/profile/Bio";
import History from "../components/profile/History";

export default function Profile() {
  return (
    <>
      <NavBar />
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Container>
            <Intro />
            <Bio />
            <History />
          </Container>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      <Footer />
    </>
  );
}
