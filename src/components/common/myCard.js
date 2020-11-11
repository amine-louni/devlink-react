import React from "react";
import { connect } from "react-redux";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import Avatar from "@material-ui/core/Avatar";
import defaultAvatar from "../../assets/img/default.jpg";

function MyCard(props) {
  const { user } = props;
  return props.isAuth ? (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            variant="rounded"
            src={`http://wsl:3000/assets${user.avatar}`}
          />
        }
        title={`${user && user.firstName} ${user && user.lastName}`}
        subheader={`@${user && user.userName}`}
      />
    </Card>
  ) : (
    ""
  );
}

const mapStateToProps = ({ isDark, isMainSideBarOpen, auth }) => {
  return {
    isAuth: auth.isAuth,
    user: auth.user,
  };
};
export default connect(mapStateToProps)(MyCard);
