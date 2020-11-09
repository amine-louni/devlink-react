import React from 'react';
import { connect } from 'react-redux';
import { addExp, putExp } from '../../../actions/';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, Switch } from 'formik-material-ui';
import { Box, Button, FormControlLabel } from '@material-ui/core';

import { Formik, Form, Field } from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DatePicker } from 'formik-material-ui-pickers';

import * as Yup from 'yup';

function AddExperienceDialog(props) {
  const { closeExp, openExpDialog, update, prevValues } = props;

  const initialValues = prevValues || {
    title: '',
    company: '',
    location: '',
    from: new Date(),
    to: new Date(),
    description: '',
    current: false,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Job title is required'),
    company: Yup.string().required('Company title is required'),
    location: Yup.string(),
    from: Yup.date(),
    description: Yup.string(),
    current: Yup.boolean(),
  });
  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);

      //  alert(JSON.stringify(values, null, 2));
      if (update) {
        props.putExp(prevValues._id, values);
      } else {
        props.addExp(values);
      }

      closeExp();
    }, 500);
  };

  return (
    <Dialog
      open={openExpDialog}
      onClose={closeExp}
      aria-labelledby="form-dialog-title"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ submitForm, isSubmitting, touched, errors, values }) => (
          <Form>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DialogTitle id="form-dialog-title">
                {update ? 'Edit ' : 'Add '} an experience
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Add any title , add brief description for your workspace
                  {/* {values.current ? 'current' : 'false'} */}
                </DialogContentText>
                <Box my={3}>
                  <Field
                    style={{ width: '100%' }}
                    component={TextField}
                    type="text"
                    name="title"
                    label="title"
                  ></Field>
                </Box>

                <Box my={3}>
                  <Field
                    style={{ width: '100%' }}
                    component={TextField}
                    type="text"
                    name="company"
                    label="company"
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
                    style={{ width: '100%' }}
                    component={DatePicker}
                    name="from"
                    label="From"
                  />
                </Box>
                <Box mb={3}>
                  <FormControlLabel
                    control={
                      <Field
                        component={Switch}
                        type="checkbox"
                        name="current"
                      />
                    }
                    label="Currently here"
                  />
                </Box>
                <Box mt={3}>
                  <Field
                    disabled={values.current}
                    style={{ width: '100%' }}
                    component={DatePicker}
                    name="to"
                    label="to"
                  />
                </Box>
                <Box my={3}>
                  <Field
                    style={{ width: '100%' }}
                    component={TextField}
                    multiline
                    rows={4}
                    type="text"
                    name="description"
                    label="Description"
                  ></Field>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={closeExp}>
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

export default connect(null, { addExp, putExp })(AddExperienceDialog);
