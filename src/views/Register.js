import React from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../actions';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import Footer from '../components/common/Footer';

import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = (props) => {
  const classes = useStyles();

  const validationSchema = Yup.object({
    userName: Yup.string().required('Required field').min(3),
    firstName: Yup.string().required('Required field').min(3),
    lastName: Yup.string().required('Required field').min(3),
    email: Yup.string().email('Enter valid email').required('Required field'),
    password: Yup.string().required('Required field').min(8),
    passwordConfirm: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
  });
  // Redirect if logged in
  if (props.isAuth) {
    return <Redirect to="/" />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            passwordConfirm: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await props.register(values);
            setSubmitting(false);
          }}
        >
          {({ submitForm, isSubmitting, touched, errors }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Field
                    disabled={isSubmitting}
                    component={TextField}
                    name="userName"
                    variant="outlined"
                    fullWidth
                    id="userName"
                    label="User Name (unique)"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    disabled={isSubmitting}
                    component={TextField}
                    name="firstName"
                    variant="outlined"
                    fullWidth
                    id="firstName"
                    label="First Name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    disabled={isSubmitting}
                    component={TextField}
                    variant="outlined"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    disabled={isSubmitting}
                    component={TextField}
                    variant="outlined"
                    fullWidth
                    label="Email Address"
                    name="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    disabled={isSubmitting}
                    component={TextField}
                    variant="outlined"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    disabled={isSubmitting}
                    component={TextField}
                    variant="outlined"
                    fullWidth
                    name="passwordConfirm"
                    label="Password confirmation"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="Remember me ?"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={24} /> : 'Register'}
              </Button>
              {isSubmitting ? 'true' : 'false'}
              <Grid container justify="flex-end">
                <Grid item>
                  <RouterLink to="/login">
                    <Typography variant="body2">
                      Already have an account? Sign in
                    </Typography>
                  </RouterLink>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>

      <Box mt={5}>
        <Footer />
      </Box>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return { isAuth: state.auth.isAuth };
};
export default connect(mapStateToProps, { register })(Register);
