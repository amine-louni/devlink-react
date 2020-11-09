// React + Redux Dependencies
import React from 'react';
import { connect } from 'react-redux';

// MUI Dependencies
import { Card, makeStyles, Typography, CardContent } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';

const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(2) },
}));
function Bio(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Biography
        </Typography>
        <Typography variant="body2">
          {props.loading && props.profile === null ? (
            <Skeleton />
          ) : (
          props.profile &&  props.profile.bio || '404 Bio not found ⚠'
          )}
        </Typography>
      </CardContent>
    </Card>
  );
}
const mapStateToProps = (state) => {
  return {
    profile: state.userProfile.profile,
    loading: state.userProfile.loading,
  };
};
export default connect(mapStateToProps)(Bio);
