// React + Redux Dependencies
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions';
import { changeTheme, ToggleSideBar } from '../../actions/';

import MobileSideBar from './MobileSideBar';
import CreatePost from './CreatePost';
// 3rd party Dependencies

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { Search, NotificationsOutlined, MailOutline } from '@material-ui/icons';
import {
  Avatar,
  Badge,
  Switch,
  Button,
  MenuItem,
  ClickAwayListener,
  Popper,
  Grow,
  Paper,
  MenuList,
  Divider,
} from '@material-ui/core';
import defaultAvatar from '../../assets/img/default.jpg';

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    display: 'none',
    textDecoration: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  cta: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(3),
      maxWidth: '500px',
      display: 'flex',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: '100%',

    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(3),
      maxWidth: '500px',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(2),
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  userInfos: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 30,
    [theme.breakpoints.down('md')]: {
      marginLeft: theme.spacing(1),
    },
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  const { isDark, ToggleSideBar, isAuth, user } = props;

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [props, open]);

  const [openCreate, setOpenCreate] = React.useState(false);

  const handleOpenCreatePostDialogFn = () => {
    setOpenCreate(true);
  };

  const handleCloseCreatePostDialogFn = () => {
    setOpenCreate(false);
  };

  return (
    <>
      <div className={classes.grow}>
        <HideOnScroll {...props}>
          <AppBar color="default">
            <Toolbar>
              <IconButton
                onClick={ToggleSideBar}
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>
              <MobileSideBar />
              <Link to="/">
                <Typography className={classes.title} variant="h6" noWrap>
                  devLink
                </Typography>
              </Link>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <Search />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
              <div className={classes.grow} />
              {isAuth ? (
                <>
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.cta}
                    style={{ marginRight: 30 }}
                    size="small"
                    endIcon={<AddCircleOutlineOutlinedIcon />}
                    onClick={handleOpenCreatePostDialogFn}
                  >
                    write a post
                  </Button>
                  <IconButton>
                    <Badge badgeContent={4} color="error">
                      <MailOutline />
                    </Badge>
                  </IconButton>
                  <IconButton>
                    <Badge badgeContent={3} color="error">
                      <NotificationsOutlined />
                    </Badge>
                  </IconButton>

                  <div className={classes.userInfos}>
                    <IconButton
                      disableRipple
                      edge={false}
                      ref={anchorRef}
                      aria-controls={open ? 'menu-list-grow' : undefined}
                      aria-haspopup="true"
                      onClick={handleToggle}
                    >
                      <Avatar src={defaultAvatar} />
                    </IconButton>
                    <Popper
                      open={open}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      transition
                      disablePortal
                      style={{ minWidth: 270 }}
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin: placement === 'left top',
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList
                                autoFocusItem={open}
                                id="menu-list-grow"
                                onKeyDown={handleListKeyDown}
                              >
                                <MenuItem
                                  component={Link}
                                  to={'/me'}
                                  style={{ display: 'block' }}
                                >
                                  <Typography
                                    display="block"
                                    style={{ width: '100%' }}
                                    variant="subtitle1"
                                  >
                                    {`${user.firstName}  ${user.lastName}`}
                                  </Typography>{' '}
                                  <Typography display="block" variant="caption">
                                    @{user.userName}
                                  </Typography>
                                </MenuItem>
                                <Divider />
                                <MenuItem
                                  component={Link}
                                  to={'/my-account/infos'}
                                  style={{ display: 'block' }}
                                >
                                  My Account
                                </MenuItem>
                                <MenuItem
                                  component={Link}
                                  to={'/dashboard'}
                                  style={{ display: 'block' }}
                                >
                                  My Dashboard
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                  Write a post
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                  Reading a list
                                </MenuItem>
                                <MenuItem onClick={props.changeTheme}>
                                  Dark mode
                                  <Switch checked={isDark} />
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={props.logout}>
                                  Logout{' '}
                                </MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </div>
                  <div className={classes.sectionDesktop}></div>
                  <div className={classes.sectionMobile}></div>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.cta}
                    size="small"
                    component={Link}
                    to={'/login'}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.cta}
                    size="small"
                    component={Link}
                    to={'/register'}
                  >
                    Register
                  </Button>
                </>
              )}
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Toolbar />
      </div>

      <CreatePost open={openCreate} onClose={handleCloseCreatePostDialogFn} />
    </>
  );
};

const mapStateToProps = ({ isDark, isMainSideBarOpen, auth }) => {
  return {
    isDark,
    isMainSideBarOpen,
    isAuth: auth.isAuth,
    user: auth.user,
    loading: auth.loading,
  };
};
export default connect(mapStateToProps, { changeTheme, ToggleSideBar, logout })(
  Navbar
);
