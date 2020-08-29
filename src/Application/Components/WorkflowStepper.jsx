import { makeStyles } from "@material-ui/core";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import React from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 0,
    "& > *": {
      alignItems: "center",
    },
  },
}));

const WorkflowStepper = (props) => {
  const classes = useStyles();

  const { steps, activeStep, skipped, errorSteps } = props;

  //   const steps = useSelector(
  //     (state) => state.layoutReducer.contextWorkflow.steps
  //   );
  //   const activeStep = useSelector(
  //     (state) => state.layoutReducer.contextWorkflow.activeStep
  //   );
  //   const skipped = useSelector(
  //     (state) => state.layoutReducer.contextWorkflow.skipped
  //   );
  //   const errorSteps = useSelector(
  //     (state) => state.layoutReducer.contextWorkflow.errorSteps
  //   );
  const contextDrawerExpanded = useSelector(
    (state) => state.layoutReducer.contextDrawerExpanded
  );

  return (
    <Stepper
      className={classes.root}
      activeStep={activeStep}
      orientation="vertical"
    >
      {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};

        if (errorSteps.includes(index)) {
          labelProps.error = true;
        }
        if (skipped.has(index)) {
          stepProps.completed = false;
        }

        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>
              {contextDrawerExpanded && label}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default WorkflowStepper;
