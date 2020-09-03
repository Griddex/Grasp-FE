import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import { ReactComponent as Grasptitlelogo } from "../../Application/Images/Grasptitlelogo.svg";
import GraspFooter from "../../ProjectMgt/Components/GraspFooter";
import { LoginForm } from "../Components/LoginForm";
//backgroundColor: theme.palette.common.white,
//avatar: backgroundColor: "#ff9900"
//lockicon color: "#0099FF"
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    [theme.breakpoints.up("md")]: { width: 557 },
    [theme.breakpoints.between("xs", "md")]: { width: 557 },
    [theme.breakpoints.down("xs")]: { width: "100%" },
  },
  grasptitlelogoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "35%",
  },
  grasptitlelogo: {
    height: 230,
    width: 210,
    alignSelf: "center",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "60%",
    "& > *": { marginTop: 40 },
  },
  footerContainer: { height: "5%" },
  loginForm: {
    "& > *": {
      marginLeft: 0,
      marginTop: 25,
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize: "40px;",
  },
}));

const LoginView = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.grasptitlelogoContainer}>
          <Grasptitlelogo className={classes.grasptitlelogo} />
        </div>
        <div className={classes.formContainer}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <LoginForm />
        </div>
        <div className={classes.footerContainer}>
          <GraspFooter />
        </div>
      </div>
    </div>
  );
};

export default LoginView;
