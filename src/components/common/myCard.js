import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import Avatar from '@material-ui/core/Avatar';
import defaultAvatar from '../../assets/img/default.jpg';
const useStyles = makeStyles((theme) => ({}));

function MyCard(props) {
  const classes = useStyles();
  const { user } = props;
  return props.isAuth ? (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar variant="rounded" src={defaultAvatar} />}
        title={`${user && user.firstName} ${user && user.lastName}`}
        subheader={`@${user && user.userName}`}
      />
    </Card>
  ) : (
    ''
  );
}

const mapStateToProps = ({ isDark, isMainSideBarOpen, auth }) => {
  return {
    isAuth: auth.isAuth,
    user: auth.user,
  };
};
export default connect(mapStateToProps)(MyCard);
