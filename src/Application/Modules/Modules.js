import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import HRMgtMainContent from "../../HRMgt/Views/HRMgtMainContent";
import ProjectMgtMainContent from "../../ProjectMgt/Views/ProjectMgtMainContent";
import { MainDrawer } from "../Components/MainDrawer";
import { Navbar } from "../Components/Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    width: "100%",
  },
  main: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Modules = (props) => {
  const classes = useStyles();
  const { path } = useRouteMatch();
  const { activeModule } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <MainDrawer />
      <main className={classes.main}>
        <Route
          path={path}
          render={(props) => {
            const MainContents = {
              ProjectManagement: <ProjectMgtMainContent />,
              HumanResources: <HRMgtMainContent />,
            };

            return MainContents[activeModule];
          }}
        />
      </main>
    </div>
  );
};

export default Modules;
