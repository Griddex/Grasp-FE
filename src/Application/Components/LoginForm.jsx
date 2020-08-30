import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { ErrorMessage, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { loginAction } from "./../Redux/Actions/LoginActions";
import loginState from "../Redux/State/LoginState";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    "& > *": { marginLeft: 0 },
  },
  button: {
    height: 36,
    marginTop: 20,
    marginBottom: 10,
  },
}));

export const LoginForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pending = useSelector((state) => state.uiSpinnerReducer.pending);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.form}>
      <Formik
        className={classes.form}
        initialValues={loginState}
        validationSchema={Yup.object().shape({
          companyIdentifier: Yup.string(),
          userName: Yup.string().required("Username is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={({ companyIdentifier, userName, password }) => {
          dispatch(loginAction(companyIdentifier, userName, password));
        }}
      >
        {(props) => {
          const {
            values: { companyIdentifier, userName, password },
            errors,
            touched,
            handleChange,
            isValid,
            handleSubmit,
            status,
          } = props;

          return (
            <form onSubmit={handleSubmit}>
              <TextField
                name="companyIdentifier"
                helperText={
                  touched.companyIdentifier ? errors.companyIdentifier : ""
                }
                error={Boolean(errors.companyIdentifier)}
                label="Company Identifier"
                margin="normal"
                variant="outlined"
                value={companyIdentifier}
                onChange={handleChange}
                autoFocus
                fullWidth
              />
              <ErrorMessage
                name="companyIdentifier"
                component="div"
                className="invalid-feedback"
              />
              <TextField
                name="userName"
                helperText={touched.userName ? errors.userName : ""}
                error={Boolean(errors.userName)}
                label="userName"
                margin="normal"
                variant="outlined"
                value={userName}
                onChange={handleChange}
                autoFocus
                fullWidth
              />
              <ErrorMessage
                name="userName"
                component="div"
                className="invalid-feedback"
              />
              <TextField
                name="password"
                helperText={touched.password ? errors.password : ""}
                error={Boolean(errors.password)}
                label="Password"
                margin="normal"
                autoComplete="current-password"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={setShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleChange}
                fullWidth
              />
              <div>{errors.password}</div>
              {pending && (
                <img
                  alt="loading..."
                  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                />
              )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid}
                fullWidth
              >
                Submit
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {" Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {status && <div className={"alert alert-danger"}>{status}</div>}
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
