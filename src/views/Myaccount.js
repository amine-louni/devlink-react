import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NavBar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

import AccountMenu from '../components/myAccount/AccountMenu';
import { Grid, Container } from '@material-ui/core';

import AccountInfos from '../components/myAccount/AccountInfos';
import AccountProfile from '../components/myAccount/AccountProfile';

export default function MyAccount() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: 30 }}>
        <Grid container>
          <Grid item xs={4}>
            <AccountMenu />
          </Grid>
          <Grid item xs={8}>
            <Switch>
              <Route path="/my-account/infos" component={AccountInfos} exact />
              <Route
                path="/my-account/profile"
                component={AccountProfile}
                exact
              />
            </Switch>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
