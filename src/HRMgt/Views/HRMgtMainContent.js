import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import HRMgtBackground from "./Backgrounds/HRMgtBackground";
import PayrollModule from "./PayrollMgt/PayrollModule";
import { useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    width: "100%",
  },
}));

const HRMgtMainContent = () => {
  const classes = useStyles();
  const { url, path } = useRouteMatch();

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Switch>
        <Route
          path={`${path}/:HRModule`}
          render={(props) => {
            const {
              match: {
                params: { HRModule },
              },
            } = props;

            const HRModules = {
              PayrollManagement: <PayrollModule />,
              CompensationManagement: <PayrollModule />,
            };

            return HRModules[HRModule];
          }}
        />
        <Route exact path={url} component={HRMgtBackground} />
        <Route
          path="*"
          render={(props) => <h1>Not found in HRMgtMainContent</h1>}
        />
      </Switch>
    </Grid>
  );
};

export default HRMgtMainContent;
