import React from 'react';
import { Typography, Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    padding: '30px',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.common.black
        : theme.palette.common.white,
  },
}));
export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Typography
        className={classes.footer}
        variant="body2"
        color="textSecondary"
        align="center"
      >
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          cveloper
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </footer>
  );
}
