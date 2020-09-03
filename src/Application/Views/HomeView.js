import React from "react";
import { Button, Hidden } from "@material-ui/core";
import { ReactComponent as HomeViewBackgroundLogo } from "../Images/HomeViewImages/HomeViewBackground.svg";
import { ReactComponent as Grasptitlelogo } from "../Images/Grasptitlelogo.svg";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    "& > *": {
      margin: "0px",
      padding: "0px",
    },
  },
  leftColumn: {
    display: "flex",
    height: "60%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& > *": {
      margin: "30px",
    },
  },
  rightColumn: {
    display: "flex",
    height: "100%",
    flexDirection: "column-reverse",
    margin: "0px",
  },
  rightColumnGrid: {
    padding: "0px",
  },
  logo: {
    height: 230,
    width: 210,
  },
  button: {
    width: 270,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
}));

const HomeView = (props) => {
  const { history } = props;
  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={3}>
      <Grid container item alignItems="center" direction="column" sm={4}>
        <div className={classes.leftColumn}>
          <Grasptitlelogo className={classes.logo} />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => history.push("/login")}
          >
            Login
          </Button>
        </div>
      </Grid>
      <Hidden xsDown>
        <Grid container item direction="column" alignItems="flex-end" sm={8}>
          <div className={classes.rightColumn}>
            <HomeViewBackgroundLogo />
          </div>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default HomeView;
