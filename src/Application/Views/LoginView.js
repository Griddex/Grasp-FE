import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import { ReactComponent as Logo } from "../../Application/Images/GraspLogo.svg";
import GraspFooter from "../../ProjectMgt/Components/GraspFooter";
import { LoginForm } from "../Components/LoginForm";
//backgroundColor: theme.palette.common.white,
//avatar: backgroundColor: "#ff9900"
const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "nowrap",
    height: "100%",
  },
  logo: {
    height: 230,
    width: 210,
  },
  "@global": {
    body: {
      backgroundColor: "#EFEFEF",
    },
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: { width: "30%" },
    [theme.breakpoints.between("xs", "sm")]: { width: "70%" },
    [theme.breakpoints.down("xs")]: { width: "80%" },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#0099FF", // theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize: "40px;",
  },
}));

const LoginView = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <div className={classes.paper}>
        <Logo className={classes.logo} />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <LoginForm />
      </div>
      <Box mt={5}>
        <GraspFooter />
      </Box>
    </Grid>
  );
};

export default LoginView;
