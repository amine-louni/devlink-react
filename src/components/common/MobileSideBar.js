import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MailIcon from '@material-ui/icons/Mail';
import { connect } from 'react-redux';
import { ToggleSideBar } from '../../actions';

const useStyles = makeStyles({
  list: {
    width: '85vw',
  },
  fullList: {
    width: 'auto',
  },
});

const MobileSideBar = (props) => {
  const { isMainSideBarOpen, ToggleSideBar } = props;
  const classes = useStyles();

  const list = () => (
    <div role="presentation">
      <List className={classes.list}>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary={'text here'} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <Drawer open={isMainSideBarOpen} onClose={ToggleSideBar}>
        {list()}
      </Drawer>
    </React.Fragment>
  );
};
const mapStateToProps = ({ isMainSideBarOpen }) => {
  return { isMainSideBarOpen };
};
export default connect(mapStateToProps, { ToggleSideBar })(MobileSideBar);
