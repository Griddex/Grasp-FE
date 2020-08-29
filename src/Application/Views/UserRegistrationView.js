import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import { Formik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import GraspFooter from "./../../ProjectMgt/Components/GraspFooter";
import { authService } from "./../Services/AuthService";
import history from "./../Services/HistoryService";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#FF9900",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UserRegistrationView = () => {
  const classes = useStyles();

  useEffect(() => {
    document.title = `Grasp ERP - Create Account`;
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography style={{ margin: 5 }} component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={{
            companyidentifier: "",
            firstname: "",
            lastname: "",
            userName: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            companyidentifier: Yup.string().required(
              "Company identifier is required"
            ),
            firstname: Yup.string().required("First Name is required"),
            lastname: Yup.string().required("Last Name is required"),
            userName: Yup.string().required("userName is required").email(),
            password: Yup.string().required("Password is required"),
          })}
          onSubmit={(
            { companyidentifier, firstname, lastname, userName, password },
            { setStatus, setSubmitting }
          ) => {
            setStatus();

            const requestOptions = {
              url: `http://localhost:56941/users/register`,
              method: "POST",
              headers: { "Content-Type": "application/json" },
              data: {
                companyidentifier,
                firstname,
                lastname,
                userName,
                password,
              },
            };

            axios(requestOptions)
              .then((response) => {
                setDialogOpen(true);
              })
              .catch((e) => {
                setSubmitting(false);
                setStatus(e);
              });
          }}
          render={(props) => {
            const {
              values: {
                companyidentifier,
                firstname,
                lastname,
                userName,
                password,
              },
              errors,
              touched,
              handleSubmit,
              handleChange,
              isValid,
              setFieldTouched,
              isSubmitting,
              status,
              style,
            } = props;

            const change = (name, e) => {
              e.persist();
              handleChange(e);
              setFieldTouched(name, true, false);
            };

            return (
              <form onSubmit={handleSubmit} style={classes}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="companyidentifier"
                      name="companyidentifier"
                      variant="outlined"
                      required
                      fullWidth
                      value={companyidentifier}
                      onChange={handleChange}
                      id="companyidentifier"
                      label="Company Identifier"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstname"
                      variant="outlined"
                      required
                      fullWidth
                      value={firstname}
                      onChange={handleChange}
                      id="firstname"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastname"
                      label="Last Name"
                      value={lastname}
                      onChange={handleChange}
                      name="lastname"
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="userName"
                      label="Email Address"
                      name="userName"
                      value={userName}
                      onChange={handleChange}
                      autoComplete="userName"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      value={password}
                      onChange={handleChange}
                      autoComplete="current-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="#/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        />
      </div>
      <Box mt={5}>
        <GraspFooter />
      </Box>
    </Container>
  );
};

export default UserRegistrationView;
