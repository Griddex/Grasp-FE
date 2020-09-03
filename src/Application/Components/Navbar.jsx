import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import NotificationsIcon from "@material-ui/icons/Notifications";
import TuneIcon from "@material-ui/icons/Tune";
import React from "react";
import { ReactComponent as Logo } from "../Images/GraspLogo.svg";

const NavbarHeight = 45;
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
    height: 28,
    width: 28,
  },
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 10,
    backgroundColor: "rgba(250,250,250, 1)",
    color: "#555555",
    height: NavbarHeight,
  },
  menuButton: {
    marginRight: theme.spacing(0),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: { paddingLeft: 4, paddingRight: 0, minHeight: 45 },
  toolbarTitle: {
    flexGrow: 1,
    verticalAlign: "middle",
    alignItems: "center",
  },
  smallAvatar: {
    margin: 4,
    width: 32,
    height: 32,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  firstLastName: { fontSize: 14, marginTop: 0, marginBottom: 0 },
  jobTitle: { fontSize: 10, marginTop: 0 },
}));

const UserAvatar = (props) => {
  const { currentUser, classes } = props;

  if (currentUser && currentUser.profilePictureUrl) {
    return (
      <Avatar
        alt="Remy Sharp"
        src={currentUser.profilePictureUrl}
        className={classes.smallAvatar}
      />
    );
  } else {
    return (
      <Avatar alt="Remy Sharp" className={classes.smallAvatar}>
        KN
      </Avatar>
    );
  }
};

export const Navbar = () => {
  const classes = useStyles();
  const currentUser = {
    firstName: "Gideon",
    lastName: "Sanni",
    jobTitle: "Full-Stack Developer",
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.toolbarTitle}>
          <Logo className={classes.icon} />
        </div>
        <TuneIcon />
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <UserAvatar currentUser={currentUser} classes={classes} />
        <Box>
          <Typography
            className={classes.firstLastName}
            variant="h6"
            color="inherit"
          >
            {currentUser.firstName} {currentUser.lastName}
          </Typography>
          <Typography className={classes.jobTitle} variant="h6" color="inherit">
            {currentUser.jobTitle}
          </Typography>
        </Box>
        <Button
          size="small"
          className={classes.link}
          variant="outlined"
          color="inherit"
          component={Link}
          to={"/logout"}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
