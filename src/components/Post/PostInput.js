import React from 'react';
import { makeStyles, Paper, Chip, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  innerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    marginRight: theme.spacing(3),
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  btnRight: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  inputPaper: {
    width: '100%',
    border: '1px solid #777',
  },
}));

export default function PostInput() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="subtitle1" gutterBottom>
        Most popular tags{' '}
        <span role="img" aria-label="fire">
          💥💥
        </span>
      </Typography>
      <Chip label="#html" />
      <Chip label="#css" />
      <Chip label="#javascript" />
      <Chip label="#react" />
      <Chip label="#angular" />
      <Chip label="#expressjs" />
    </Paper>
  );
}
