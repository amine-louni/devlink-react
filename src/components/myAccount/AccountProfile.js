import React from 'react';
import { connect } from 'react-redux';
import { updateMyProfile } from '../../actions';
// Formik Dependencies
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Card, CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function AccountProfile(props) {
  const classes = useStyles();

  const validationSchema = Yup.object({
    website: Yup.string().matches(
      /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!'
    ),
  });
  const onSubmit = async (values, { setSubmitting }) => {
    await props.updateMyProfile(values, props.profile.profile._id);
    setSubmitting(false);
  };
  return (
    <div>
      <Card>
        <CardContent>
          <Typography align="center" variant="h5" component="h2">
            About me
          </Typography>
          <Typography align="center" variant="body2">
            Let's get some information to make your profile stand out
          </Typography>
        </CardContent>
      </Card>
      <div style={{ marginTop: 25, marginBottom: 25 }}></div>
      <Card>
        <CardContent>
          <Formik
            enableReinitialize={true}
            initialValues={{
              website: !props.loading ? props.profile.profile.website : '',
              bio: !props.loading ? props.profile.profile.bio : '',
              location: !props.loading ? props.profile.profile.location : '',
              skills: !props.loading
                ? props.profile.profile.skills.join(', ')
                : '',
              githubUsername: !props.loading
                ? props.profile.profile.githubUsername
                : '',
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ submitForm, isSubmitting, touched, errors }) => (
              <Form>
                <FormControl className={classes.formControl}>
                  <Field
                    disabled={isSubmitting}
                    variant="outlined"
                    component={TextField}
                    type="location"
                    label="location"
                    name="location"
                    helperText="City & state suggested (eg. Boston, MA)"
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Field
                    disabled={isSubmitting}
                    variant="outlined"
                    component={TextField}
                    type="website"
                    label="website"
                    name="website"
                    helperText="Your website URL 🔗"
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Field
                    disabled={isSubmitting}
                    variant="outlined"
                    component={TextField}
                    label="Github user name  👩‍💻"
                    name="githubUsername"
                    helperText="Please enter your github user name"
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Field
                    disabled={isSubmitting}
                    component={TextField}
                    label="Bio"
                    name="bio"
                    multiline
                    rows={3}
                    helperText="A short bio"
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Field
                    component={TextField}
                    label="Skills"
                    name="skills"
                    multiline
                    disabled={isSubmitting}
                    rows={3}
                    helperText="Write a comma between the skills , Example 💁‍♂️ => (html, css, javascript)"
                  />
                </FormControl>

                <Box mt={4}>
                  <Button
                    variant="contained"
                    disabled={isSubmitting}
                    color="primary"
                    type="submit"
                  >
                    {isSubmitting ? 'updating' : 'update'}
                  </Button>
                </Box>
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
    profile: state.userProfile,
    loading: state.userProfile.loading,
  };
};
export default connect(mapStateToProps, {
  updateMyProfile,
})(AccountProfile);
