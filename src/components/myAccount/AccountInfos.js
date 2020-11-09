import React from 'react';
import { connect } from 'react-redux';
import { updateMe, updateMyPassword } from '../../actions';

import { Card, CardContent, Button } from '@material-ui/core';
//import MUITextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Formik Dependencies
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

const infoValidationSchema = Yup.object({
  userName: Yup.string().required('Required field').min(3),
  firstName: Yup.string().required('Required field').min(3),
  lastName: Yup.string().required('Required field').min(3),
  email: Yup.string()
    .required('Email is a required field')
    .email('Please enter a valid email format 🙏'),
});

const passValidationSchema = Yup.object({
  password: Yup.string().required('Required field').min(8),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});
function AccountInfos(props) {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography align="center" variant="h5" component="h2">
            Personal informations
          </Typography>
        </CardContent>
      </Card>
      <div style={{ marginTop: 25, marginBottom: 25 }}></div>
      <Card>
        <CardContent>
          <Formik
            enableReinitialize={true}
            initialValues={{
              firstName:
                props.loading && props.user === null
                  ? ''
                  : props.user.firstName,
              lastName:
                props.loading && props.user === null ? '' : props.user.lastName,
              userName:
                props.loading && props.user === null ? '' : props.user.userName,
              email:
                props.loading && props.user === null ? '' : props.user.email,
            }}
            validationSchema={infoValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              await props.updateMe(JSON.stringify(values));
              setSubmitting(false);
            }}
          >
            {({ submitForm, isSubmitting, touched, errors, values }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      disabled={isSubmitting}
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      disabled={isSubmitting}
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Field
                      component={TextField}
                      disabled={isSubmitting}
                      variant="outlined"
                      required
                      fullWidth
                      id="userName"
                      label="User Name"
                      name="userName"
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      disabled={isSubmitting}
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                </Grid>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: 15,
                  }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="contained"
                    color="primary"
                  >
                    {isSubmitting ? 'Updating ... 🔃' : '  Update me'}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>

      <div style={{ marginTop: 25, marginBottom: 25 }}></div>
      <Card>
        <CardContent>
          <Formik
            initialValues={{
              password: '',
              passwordCurrent: '',
              passwordConfirm: '',
            }}
            validationSchema={passValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              console.log('submit update password');
              await props.updateMyPassword(JSON.stringify(values));
              setSubmitting(false);
            }}
          >
            {({ submitForm, isSubmitting, touched, errors, values }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <Field
                      component={TextField}
                      disabled={isSubmitting}
                      name="passwordCurrent"
                      variant="outlined"
                      required
                      type="password"
                      fullWidth
                      id="passwordCurrent"
                      label="Your current password 🔑"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      disabled={isSubmitting}
                      variant="outlined"
                      required
                      fullWidth
                      id="password"
                      label="New password"
                      name="password"
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      disabled={isSubmitting}
                      variant="outlined"
                      required
                      fullWidth
                      id="passwordConfirm"
                      label="Confirm your new password"
                      name="passwordConfirm"
                      autoComplete="lname"
                    />
                  </Grid>
                </Grid>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: 15,
                  }}
                >
                  <Button
                    type="submit"
                    onClick={() => submitForm()}
                    disabled={isSubmitting}
                    variant="contained"
                    color="primary"
                  >
                    {isSubmitting ? 'Updating ... 🔃' : '  Update password'}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loading: state.auth.loading,
  };
};
export default connect(mapStateToProps, { updateMe, updateMyPassword })(
  AccountInfos
);
