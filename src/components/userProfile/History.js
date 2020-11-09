// React + Redux Dependencies
import React from 'react';

// 3rd party Dependencies
import dayjs from 'dayjs';
// MUI Dependencies
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(2), position: 'relative' },
  MoreVert: {
    position: 'absolute',
    right: 0,
    top: 0,
    margin: '7px 14px',
  },
  LeftTimeLine: {
    '&:before': {
      flex: 0,
      padding: 0,
    },
  },
  cardTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
function History(props) {
  const classes = useStyles();
  const [user, setUser] = React.useState({ ...props.user });

  React.useEffect(() => {
    setUser(props.user);
  }, [props.user]);
  return (
    <div className={classes.root}>
      <Card>
        <CardContent>
          <div className={classes.cardTitle}>
            <Typography variant="h5">Experience</Typography>
          </div>

          <Timeline>
            {/* const sortedActivities = activities.sort((a, b) => b.date - a.date) */}
            {user &&
            user.userProfile &&
            user.userProfile[0].experience &&
            user.userProfile[0].experience.length > 0
              ? user.userProfile[0].experience
                  .sort((a, b) => b.from - a.from)
                  .map((exp, i) => {
                    return (
                      <TimelineItem key={i} className={classes.LeftTimeLine}>
                        <TimelineSeparator>
                          <TimelineDot />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Card key={i}>
                            <CardContent>
                              <Typography component="h4" variant="subtitle1">
                                {exp.company}
                                {' - '} {exp.location}
                              </Typography>

                              <Typography component="h4" variant="caption">
                                {` ${dayjs(exp.from).format('MMMM , YYYY')} - 
                              ${
                                exp.current
                                  ? 'current'
                                  : dayjs(exp.to).format('MMMM , YYYY')
                              }`}
                              </Typography>
                              <Typography component="h4" variant="subtitle2">
                                {exp.title}
                              </Typography>

                              <Typography
                                component="p"
                                variant="body1"
                                color="textSecondary"
                              >
                                {exp.description}
                              </Typography>
                            </CardContent>
                          </Card>
                        </TimelineContent>
                      </TimelineItem>
                    );
                  })
              : 'No experience has been added yet 👻'}
          </Timeline>
        </CardContent>
      </Card>

      <Card className={classes.root}>
        <CardContent>
          <div className={classes.cardTitle}>
            <Typography variant="h5">Education</Typography>
          </div>

          <Timeline>
            {user &&
            user.userProfile &&
            user.userProfile[0].experience &&
            user.userProfile[0].education.length > 0
              ? user.userProfile[0].education
                  .sort((a, b) => b.from - a.from)
                  .map((edu, i) => {
                    return (
                      <TimelineItem key={i} className={classes.LeftTimeLine}>
                        <TimelineSeparator>
                          <TimelineDot />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Card>
                            <CardContent>
                              <Typography display="block" variant="subtitle1">
                                {edu.school}
                              </Typography>
                              <Typography variant="subtitle2">
                                {edu.degree} degree at {edu.fieldofstudy}
                              </Typography>
                              <Typography variant="caption" gutterBottom>
                                {dayjs(edu.from).format('MMMM , YYYY')} -{' '}
                                {edu.current
                                  ? 'current'
                                  : dayjs(edu.to).format('MMMM , YYYY')}
                              </Typography>

                              <Typography
                                component="p"
                                variant="body1"
                                color="textSecondary"
                              >
                                {edu.description}
                              </Typography>
                            </CardContent>
                          </Card>
                        </TimelineContent>
                      </TimelineItem>
                    );
                  })
              : 'No education has been added yet 👻'}
          </Timeline>
        </CardContent>
      </Card>
    </div>
  );
}

export default History;
