import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import { Grid, Chip } from '@material-ui/core';

import CallSplitIcon from '@material-ui/icons/CallSplit';
import StarIcon from '@material-ui/icons/Star';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(2) },
}));

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Most starred github repositories
        </Typography>

        <Grid container>
          <Grid item md={6}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="subtitle1" component="h2">
                    Githun repo title
                  </Typography>
                  <Chip
                    variant="outlined"
                    size="small"
                    color="primary"
                    icon={<StarIcon />}
                    label="30"
                    style={{ marginRight: 7 }}
                  />
                  <Chip
                    style={{ marginRight: 7 }}
                    variant="outlined"
                    size="small"
                    color="primary"
                    icon={<VisibilityIcon />}
                    label="7"
                  />

                  <Chip
                    variant="outlined"
                    size="small"
                    color="primary"
                    icon={<CallSplitIcon />}
                    label="22"
                  />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{ marginTop: 22 }}
                  >
                    Lizards are a widespread group of squamate reptiles, with
                    over
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
