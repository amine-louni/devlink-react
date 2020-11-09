import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import Footer from '../components/common/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  alert: {
    marginTop: theme.spacing(3),
    width: '100%',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function SignInSide(props) {
  const classes = useStyles();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Required field')
      .email('Enter a valid email please'),
    password: Yup.string().required('Required field').min(8),
  });
  // Redirect if logged in
  if (props.isAuth) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                await props.login(values);
                setSubmitting(false);
              }}
            >
              {({ submitForm, isSubmitting, touched, errors }) => (
                <Form className={classes.form} noValidate>
                  <Field
                    component={TextField}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <Field
                    component={TextField}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />

                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={submitForm}
                    className={classes.submit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <CircularProgress size={24} /> : 'Login'}
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <RouterLink to="/forgot-password">
                        <Link variant="body2">{'Forgot password?'}</Link>
                      </RouterLink>
                    </Grid>
                    <Grid item>
                      <RouterLink to="/register">
                        <Link variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </RouterLink>
                    </Grid>
                  </Grid>
                  <Box mt={5}>
                    <Footer />
                  </Box>
                </Form>
              )}
            </Formik>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
const mapStateToProps = (state) => {
  return { isAuth: state.auth.isAuth };
};
export default connect(mapStateToProps, { login })(SignInSide);
