import React from 'react';
import { connect } from 'react-redux';
import { post } from '../../http';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import { Card, CardContent, Container, Grid } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';

import PostPreview from './postPreview/PostPreview';
import { setAlert } from '../../actions';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    marginBottom: theme.spacing(7),
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  input: {
    display: 'none',
  },
  updateCover: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      height: '4em',
      marginLeft: '2em',
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function CreatePostDialog(props) {
  const { open, onClose } = props;

  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleTab = (event, newValue) => {
    setValue(newValue);
  };
  const [markdown, setMarkdown] = React.useState('');
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <Formik
          initialValues={{
            cover: '',
            title: '',
            tags: '',
            text: markdown,
          }}
          //validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            // await props.login(values);
            try {
              await post.post('/', values);
              setSubmitting(false);

              onClose();
              resetForm();
            } catch (err) {
              props.setAlert(`Ops! ${err.response.data.message}`, 'error');
            }
          }}
        >
          {({
            submitForm,
            isSubmitting,
            touched,
            errors,
            setFieldValue,

            values,
          }) => (
            <>
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={onClose}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    Create a post{' '}
                    <span role="img" aria-label="pen">
                      📝
                    </span>
                  </Typography>
                  <Button
                    autoFocus
                    type="submit"
                    color="inherit"
                    onClick={() => {
                      submitForm();
                    }}
                  >
                    save
                  </Button>
                </Toolbar>
              </AppBar>

              <Container>
                <AppBar position="static" variant="outlined" color="default">
                  <Tabs
                    value={value}
                    onChange={handleTab}
                    aria-label="simple tabs example"
                    centered
                  >
                    <Tab label="Write" {...a11yProps(0)} />
                    <Tab label="Preview" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                  <Grid container>
                    <Grid item md={9}>
                      <Card variant="outlined">
                        <CardContent>
                          <Form className={classes.form} noValidate>
                            <div className={classes.updateCover}>
                              {values.cover ? (
                                <img
                                  style={{ marginRight: 40 }}
                                  src={`https://young-bayou-54809.herokuapp.com/${values.cover}`}
                                  alt="cover"
                                />
                              ) : (
                                ''
                              )}

                              {!values.cover ? (
                                <>
                                  <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="img-cover"
                                    name="cover"
                                    type="file"
                                    onChange={async (event) => {
                                      const form = new FormData();

                                      form.append(
                                        'cover',
                                        event.target.files[0]
                                      );
                                      const res = await post.post(
                                        'update-post-cover',
                                        form
                                      );
                                      setFieldValue(
                                        'cover',
                                        res.data.data.replace('public', '')
                                      );
                                    }}
                                  />
                                  <label htmlFor="img-cover">
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      component="span"
                                    >
                                      Upload a cover image
                                    </Button>
                                  </label>
                                </>
                              ) : (
                                <Button
                                  variant="contained"
                                  color="error"
                                  component="span"
                                  onClick={() => {
                                    setFieldValue('cover', '');
                                  }}
                                >
                                  remove
                                </Button>
                              )}
                            </div>
                            <Field
                              component={TextField}
                              margin="normal"
                              required
                              fullWidth
                              id="title"
                              label="Title"
                              name="title"
                              autoComplete="title"
                              autoFocus
                            />
                            <Field
                              component={TextField}
                              margin="normal"
                              required
                              fullWidth
                              id="tags"
                              label="Tags"
                              helperText="Tags [Add up to 4 tags]"
                              name="tags"
                              autoComplete="tags"
                              autoFocus
                            />
                            <Field
                              component={TextField}
                              margin="normal"
                              required
                              fullWidth
                              style={{ height: 600 }}
                              multiline
                              id="post"
                              rows={30}
                              label="Type here ... ✍"
                              name="text"
                              autoComplete="post"
                              autoFocus
                            />
                            <div style={{ display: 'none' }}>
                              {setTimeout(() => setMarkdown(values.text), 0)}
                            </div>
                          </Form>
                        </CardContent>
                      </Card>
                      <Grid item md={3}></Grid>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <PostPreview markdown={markdown} />
                </TabPanel>
              </Container>
            </>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}

export default connect(null, { setAlert })(CreatePostDialog);
