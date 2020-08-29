import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as GraspLogo } from "../../../../../Application/Images/GraspLogo.svg";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // flexWrap: "wrap",
    // alignItems: "center",
    // justifyContent: "center",
    height: "100%",
    // "& > *": {
    //   margin: theme.spacing(3),
    // },
  },
}));

const PolicyAddViewWorkflow = () => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      justify="flex-start"
    >
      <Grid item container direction="column" justify="flex-start">
        <GraspLogo />
        <h1>COMPANY PAY POLICY</h1>
      </Grid>
      <Grid item container direction="column" justify="flex-start">
        <GraspLogo />
        <h1>COMPANY PAY POLICY</h1>
      </Grid>
      <Divider />
    </Grid>
  );
};

export default PolicyAddViewWorkflow;
