import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

import PrivateRoute from './components/routing/PrivateRoute';
import Home from './views/Home';
import Profile from './views/Profile';
import Register from './views/Register';
import Login from './views/Login';
import ForgotPassword from './views/ForgotPassword';
import MyAccount from './views/Myaccount';
import ResetPassword from './views/ResetPassword';
import Article from './views/Article';
import NotFound from './views/Notfound';

import { indigo, teal } from '@material-ui/core/colors';
import Dashboard from './views/Dashboard';
import Toast from './components/common/Toast';
import { loadUser } from './actions/authHandler';
import { getCurrentUserProfile } from './actions';
import setAuthToken from './http/setAuthToken';
import UserProfile from './views/userProfile';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App({ isDark, loadUser, getCurrentUserProfile }) {
  const defaultTheme = createMuiTheme({
    palette: {
      type: 'light',
      primary: indigo,
      secondary: teal,
    },
    typography: {
      fontFamily: 'Inconsolata',
    },
  });

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: indigo,
      secondary: teal,
    },
    typography: {
      fontFamily: 'Inconsolata',
    },
  });
  let theme = isDark ? darkTheme : defaultTheme;
  React.useEffect(() => {
    loadUser();
    getCurrentUserProfile();
  }, [loadUser, getCurrentUserProfile]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Toast />
        <Switch>
          <PrivateRoute path="/me" component={Profile} />
          <PrivateRoute path="/my-account" component={MyAccount} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password/:resetToken" component={ResetPassword} />
          <Route path="/article/:slug" component={Article} />
          <Route path="/user/:id" component={UserProfile} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = ({ isDark }) => {
  return { isDark };
};
export default connect(mapStateToProps, { loadUser, getCurrentUserProfile })(
  App
);
