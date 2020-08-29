import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    width: "100%",
  },
}));

const HRMgtBackground = () => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      HUMAN RESOURCES BACKGROUND
    </Grid>
  );
};

export default HRMgtBackground;
