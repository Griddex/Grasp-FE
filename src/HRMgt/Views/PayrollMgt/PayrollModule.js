import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import PayrollBackground from "./PayrollBackground";
import PolicyModule from "./Policy/PolicyModule";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    width: "100%",
  },
}));

const PayrollModule = (props) => {
  const classes = useStyles();
  const { path } = useRouteMatch();

  return (
    <Switch className={classes.root}>
      <Route exact path={path} component={PayrollBackground} />
      <Route
        path={`${path}/:payrollModule`}
        render={(props) => {
          const {
            match: {
              params: { payrollModule },
            },
          } = props;

          const PayrollModules = {
            Policy: <PolicyModule />,
            // Planning: <PlanningModule />,
            // Benefits: <BenefitsModule />,
            // Deductions: <DeductionsModule />,
            // Reports: <ReportsModule />,
            // Payslips: <PayslipsModule />,
          };

          return PayrollModules[payrollModule];
        }}
      />
      <Route
        path="*"
        render={(props) => <h1>No match for payroll module</h1>}
      />
    </Switch>
  );
};

export default PayrollModule;
