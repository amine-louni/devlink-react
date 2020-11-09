import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
function PrivateRoute({ component: Component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth.isAuth && !auth.loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(PrivateRoute);
