import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPassword } from '../actions';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

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

const ResetPassword = (props) => {
  const classes = useStyles();

  const validationSchema = Yup.object({
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
  console.log(props.match.params.resetToken);
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset your password
        </Typography>
        <Formik
          initialValues={{
            password: '',
            passwordConfirm: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await props.resetPassword(values, props.match.params.resetToken);
              setSubmitting(false);
              return <Redirect to="/" />;
            } catch (err) {
              console.log(err);
            }
          }}
        >
          {({ submitForm, isSubmitting, touched, errors }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
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
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} />
                ) : (
                  'update password'
                )}
              </Button>
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
export default connect(mapStateToProps, { resetPassword })(ResetPassword);
