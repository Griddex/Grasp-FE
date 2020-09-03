import { makeStyles } from "@material-ui/core/styles";
import EmailIcon from "@material-ui/icons/Email";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ContextDrawer from "../../../../Application/Components/ContextDrawer";
import SubNavbar from "../../../../Application/Components/SubNavbar";
import WorkflowStepper from "./../../../../Application/Components/WorkflowStepper";
import PolicyAddView from "./AddWorkflow/PolicyAddView";
import PolicyImportView from "./ImportWorkflow/PolicyImportView";
import PolicyBackground from "./PolicyBackground";

const NavbarHeight = 45;
const SubNavbarHeight = 30;
const marginTop = NavbarHeight + SubNavbarHeight;
const useStyles = makeStyles((theme) => ({
  policyRoot: {
    display: "flex",
    height: "100%",
    width: "100%",
  },
  policyMain: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: marginTop,
    width: "100%",
    height: `calc(100% - ${marginTop}px)`,
    padding: theme.spacing(2),
  },
}));

const PolicyModule = (props) => {
  const classes = useStyles();
  const { url, path } = useRouteMatch();

  // const subNavbarPresent = useSelector(
  //   (state) => state.layoutReducer.subNavbarPresent
  // );

  const contextDrawerPresent = useSelector(
    (state) => state.layoutReducer.contextDrawerPresent
  );

  const subNavbarItems = [
    {
      name: "Import",
      route: `${url}/Import`,
      icon: <PersonAddIcon />,
    },
    {
      name: "Add",
      route: `${url}/Add`,
      icon: <PersonPinCircleIcon />,
    },
    {
      name: "View",
      route: `${url}/View`,
      icon: <RecentActorsIcon />,
    },
    {
      name: "Feedback",
      route: `${url}/Feedback`,
      icon: <EmailIcon />,
    },
    {
      name: "Poll",
      route: `${url}/Poll`,
      icon: <LibraryBooksIcon />,
    },
  ];

  const steps = ["Fill In Payroll Policy", "Send Policy"];
  const activeStep = 0;
  const skipped = new Set([]);
  const errorSteps = [4];

  const WorkflowStepperProps = { steps, activeStep, skipped, errorSteps };

  return (
    <div className={classes.policyRoot}>
      {/* {subNavbarPresent && <SubNavbar subNavbarItems={subNavbarItems} />} */}
      <SubNavbar subNavbarItems={subNavbarItems} />
      {contextDrawerPresent && (
        <ContextDrawer>
          <WorkflowStepper {...WorkflowStepperProps} />
        </ContextDrawer>
      )}
      <main className={classes.policyMain}>
        <Switch>
          <Route exact path={path} component={PolicyBackground} />
          <Route
            path={`${path}/:policyWorkflow`}
            render={(props) => {
              const {
                match: {
                  params: { policyWorkflow },
                },
              } = props;

              const PolicyWorkflows = {
                Import: <PolicyImportView />,
                Add: <PolicyAddView />,
                View: <PolicyImportView />,
                Feedback: <PolicyImportView />,
                Poll: <PolicyImportView />,
              };

              return PolicyWorkflows[policyWorkflow];
            }}
          />
        </Switch>
      </main>
    </div>
  );
};

export default PolicyModule;
