import CompanySetupView from "./CompanySetupView";
import RolesSetupView from "./RolesSetupView";
import UsersSetupView from "./UsersSetupView";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppsOutlined from "@material-ui/icons/AppsOutlined";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import React from "react";
import { connect } from "react-redux";
import { Link as RouterLink, Route, Switch } from "react-router-dom";
import { isNullOrUndefined } from "util";
import ManageUserView from "../User/ManageUserView";
import { ReactComponent as Logo } from "./../../../Application/Images/GraspLogo.svg";
import { authService } from "./../../../Application/Services/AuthService";
import history from "./../../../Application/Services/HistoryService";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  root: {
    display: "flex",
  },

  menuButton: {
    marginRight: theme.spacing(0),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(7, 3),
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

function SetupView(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(authService.currentUser);

  const menuItems = [
    {
      id: "1",
      caption: "Users",
      secondaryCaption: "Manage User Accounts",
      link: "/setup/users",
    },
    {
      id: "2",
      caption: "Roles",
      secondaryCaption: "Create Roles",
      link: "/setup/roles",
    },
    {
      id: "3",
      caption: "Positions",
      secondaryCaption: "Employee Positions",
      link: "/setup",
    },
    {
      id: "4",
      caption: "Companies",
      secondaryCaption: "Create & Manage Companies",
      link: "/setup/companies",
    },
    {
      id: "5",
      caption: "Departments",
      secondaryCaption: "",
      link: "/setup",
    },
    {
      id: "6",
      caption: "Salary Structure",
      secondaryCaption: "",
      link: "/setup",
    },
    {
      id: "7",
      caption: "Salary Components",
      secondaryCaption: "",
      link: "/setup",
    },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />

      <main className={classes.content}>
        <Switch>
          <Route path="/setup/users/user/:userId" component={ManageUserView} />
          <Route path="/setup/users" component={UsersSetupView} />
          <Route path="/setup/companies" component={CompanySetupView} />
          <Route path="/setup/roles" component={RolesSetupView} />
          <Route path="/setup/" component={UsersSetupView} />
        </Switch>
      </main>
    </div>
  );
}

//export {DrawerView}
const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps)(SetupView);
