// React + Redux Dependencies
import React from 'react';

// MUI Dependencies
import { Card, makeStyles, Typography, CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(2) },
}));
function Bio(props) {
  const classes = useStyles();
  const [user, setUser] = React.useState({ ...props.user });

  React.useEffect(() => {
    setUser(props.user);
  }, [props.user]);
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Biography
        </Typography>
        <Typography variant="body2">
          {' '}
          {user.userProfile && user.userProfile[0].bio}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Bio;
