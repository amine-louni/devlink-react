import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({});

export default function StatCard({ title, amount }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h3" component="h2">
          {amount}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
