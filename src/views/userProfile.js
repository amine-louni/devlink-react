import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { user } from '../http/index';
import Intro from '../components/userProfile/Intro';
import NavBar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Bio from '../components/userProfile/Bio';
import History from '../components/userProfile/History';
import Repos from '../components/userProfile/Repos';

export default function UserProfile(props) {
  const [currentUser, setCurrentUser] = React.useState({});

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const resUser = await user.get(props.match.params.id);

      setCurrentUser(resUser.data.data.data);
      console.log(currentUser);
      setLoading(false);
    })();
  }, [currentUser, props.match.params.id]);
  return (
    <>
      <NavBar />
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Container>
            <Intro user={currentUser} loading={loading} />
            <Bio user={currentUser} loading={loading} />
            <History user={currentUser} />
            <Repos />
          </Container>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      <Footer />
    </>
  );
}
