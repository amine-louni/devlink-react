import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from 'formik-material-ui';
import { Box, Button, Grid, IconButton } from '@material-ui/core';

import { Formik, Form, Field } from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DatePicker } from 'formik-material-ui-pickers';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import * as Yup from 'yup';
import defaultAvatar from '../../../assets/img/default.jpg';
export default function AddEducationDialog({
  openEdit,
  handleCloseEdit,
  openEditDialog,
}) {
  const initialValues = {
    file: null,
    cover: null,
    avatar: '',
    bio: '',
    location: '',
    dob: new Date(),
    website: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string(),
  });
  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      console.log(values);
      alert(values);
      handleCloseEdit();
    }, 500);
  };
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={openEditDialog}
      onClose={handleCloseEdit}
      aria-labelledby="form-dialog-title"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          submitForm,
          isSubmitting,
          touched,
          errors,
          values,
          handleSubmit,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DialogTitle id="form-dialog-title">Edit profile</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Add any title , add brief description for your workspace
                  {/* {values.current ? 'current' : 'false'} */}
                </DialogContentText>
                <div
                  style={{
                    height: 200,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottom: '3px solid',
                  }}
                >
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="cover"
                    name="cover"
                    type="file"
                    onChange={(event) => {
                      setFieldValue('cover', event.currentTarget.files[0]);
                    }}
                  />
                  <label htmlFor="cover">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <img
                        style={{
                          height: 100,
                          width: 100,
                          objectFit: 'cover',
                          position: 'absolute',
                          zIndex: 1,
                        }}
                        alt="user avatar"
                      />
                      <CameraAltOutlinedIcon style={{ zIndex: 2 }} />
                    </IconButton>
                  </label>
                </div>

                <div
                  style={{
                    height: 100,
                    width: 100,
                    marginTop: -50,
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid',
                    overflow: 'hidden',
                  }}
                >
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="avatar"
                    name="avatar"
                    type="file"
                    onChange={(event) => {
                      setFieldValue('avatar', event.currentTarget.files[0]);
                    }}
                  />
                  <label htmlFor="avatar">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <img
                        src={defaultAvatar}
                        style={{
                          height: 100,
                          width: 100,
                          objectFit: 'contain',
                          position: 'absolute',
                          zIndex: 1,
                        }}
                        alt="user avatar"
                      />
                      <CameraAltOutlinedIcon style={{ zIndex: 2 }} />
                    </IconButton>
                  </label>
                </div>
                <Box my={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      {' '}
                      <Field
                        style={{ width: '100%' }}
                        component={TextField}
                        type="text"
                        name="firstname"
                        label="First name"
                      ></Field>
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        style={{ width: '100%' }}
                        component={TextField}
                        type="text"
                        name="lastname"
                        label="Last name"
                      ></Field>
                    </Grid>
                  </Grid>
                </Box>

                <Box my={3}>
                  <Field
                    style={{ width: '100%' }}
                    component={TextField}
                    type="text"
                    name="bio"
                    label="Bio"
                    multiline
                    rows={4}
                  ></Field>
                </Box>

                <Box my={3}>
                  <Field
                    style={{ width: '100%' }}
                    component={TextField}
                    type="text"
                    name="location"
                    label="Location"
                  ></Field>
                </Box>

                <Box mt={3}>
                  <Field
                    disabled={values.current}
                    style={{ width: '100%' }}
                    component={DatePicker}
                    name="dob"
                    label="Date of birth"
                  />
                </Box>
                <Box my={3}>
                  <Field
                    style={{ width: '100%' }}
                    component={TextField}
                    type="text"
                    name="website"
                    label="website"
                  ></Field>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={handleCloseEdit}>
                  CANCEL
                </Button>
                <Button color="primary" type="submit">
                  ADD
                </Button>
              </DialogActions>
            </MuiPickersUtilsProvider>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
