import { Divider, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import LiveHelpOutlinedIcon from "@material-ui/icons/LiveHelpOutlined";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import OpenInNewOutlinedIcon from "@material-ui/icons/OpenInNewOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import clsx from "clsx";
import { Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  addPolicyInitiatorAction,
  hideResetPolicyDialogAction,
  hideSavePolicyDialogAction,
  hideSendPolicyDialogAction,
  resetPolicyAction,
  savePolicyAction,
  sendPolicyAction,
  showResetPolicyDialogAction,
  showSavePolicyDialogAction,
  showSendPolicyDialogAction,
} from "../../../../Redux/Actions/PayrollActions";
import MainDialog from "./../../../../Components/MainDialog";
import payrollState from "./../../../../Redux/State/PayrollState";

const ContextDrawerWidthExpanded = 150;
const ContextDrawerWidthCollapsed = 40;
const TextFieldWidth = 250;
const policyStatementTextFieldHeight = 250;

const useStyles = makeStyles((theme) => ({
  policyAddMain: {
    height: "100%",
    border: "0.5px solid #EFEFEF",
    padding: theme.spacing(0, 2, 0, 2),
  },
  policyAddMainCollapsed: {
    width: `calc(100% - ${ContextDrawerWidthCollapsed}px)`,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: ContextDrawerWidthCollapsed,
  },
  policyAddMainExpanded: {
    width: `calc(100% - ${ContextDrawerWidthExpanded}px)`,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: ContextDrawerWidthExpanded,
  },
  textField: { height: 32, width: TextFieldWidth },
  graspLogo: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    height: "5%",
  },
  title: { letterSpacing: 3 },
  form: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  formInputs: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "column",
    height: "85%",
    "& > *": {
      marginTop: theme.spacing(4),
    },
  },
  dividerButtons: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    "& > *": { margin: theme.spacing(1) },
  },
  policyOwnerDate: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  policyDate: { width: TextFieldWidth },
  policyOriginAudience: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "65%",
    "& > *": { width: TextFieldWidth },
  },
  policyName: { width: TextFieldWidth },
  policyStatement: {
    width: "100%",
    "& .MuiInputBase-root": { height: policyStatementTextFieldHeight },
  },
  policyInitiator: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 52,
    width: "50%",
  },
  policyInitiatorInput: { width: TextFieldWidth },
  policyInitiatorButton: { alignSelf: "flex-end" },
  button: {
    width: 162,
    fontSize: 14,
  },
  sideBySide: {
    display: "flex",
  },
  openInNewOutlinedIcon: {
    height: 24,
    width: 24,
    color: theme.palette.primary.main,
  },
  questionIcon: { height: 40, width: 40, color: "#FD8C2A" },
  cautionIcon: { height: 40, width: 40, color: theme.palette.secondary.main },
}));

const PolicyAddViewWorkflow = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const contextDrawerExpanded = useSelector(
    (state) => state.layoutReducer.contextDrawerExpanded
  );
  const policyData = useSelector((state) => state.payrollReducer.policy);
  const {
    resetPolicyDialogShow,
    savePolicyDialogShow,
    sendPolicyDialogShow,
  } = policyData;

  const values = ["hello", "Hi", "Welcome"];
  const sendSaveDialogContent = (props) => {
    const {
      policyOwner,
      policyOrigin,
      policyAudience,
      policyName,
      policyInitiator,
    } = props;

    return (
      <>
        <div className={classes.sideBySide}>
          <h4>Policy Owner:</h4>
          <h4>{policyOwner}</h4>
        </div>
        <div className={classes.sideBySide}>
          <h4>Policy Origin:</h4>
          <h4>{policyOrigin}</h4>
        </div>
        <div className={classes.sideBySide}>
          <h4>Policy Audience:</h4>
          <h4>{policyAudience}</h4>
        </div>
        <div className={classes.sideBySide}>
          <h4>Policy Name:</h4>
          <h4>{policyName}</h4>
        </div>
        <div className={classes.sideBySide}>
          <h4>Policy Statement:</h4>
          <OpenInNewOutlinedIcon className={classes.openInNewOutlinedIcon} />
        </div>
        <div className={classes.sideBySide}>
          <h4>Policy Owner:</h4>
          <h4>{policyInitiator}</h4>
        </div>
        <div className={classes.sideBySide}>
          <h4>Policy Owner:</h4>
          <h4>{policyInitiator}</h4>
        </div>
      </>
    );
  };

  const ResetPolicyDialogContent = () => {
    return (
      <div>
        <h4>Do you want to reset the current draft pay policy?</h4>
      </div>
    );
  };

  const ResetPolicyDialogActions = () => {
    const buttonsData = [
      {
        title: "Cancel",
        variant: "contained",
        color: "secondary",
        startIcon: <CloseOutlinedIcon />,
        handleAction: () => dispatch(hideResetPolicyDialogAction()),
      },
      {
        title: "Reset",
        variant: "contained",
        color: "primary",
        startIcon: <SaveOutlinedIcon />,
        handleAction: () => dispatch(resetPolicyAction()),
      },
    ];

    return buttonsData.map((button) => (
      <Button
        variant={button.variant}
        color={button.color}
        onClick={button.handleAction}
        startIcon={button.startIcon}
      >
        {button.title}
      </Button>
    ));
  };

  const SavePolicyDialogContent = (props) => {
    return (
      <div>
        <h4>Do you want to save the following draft pay policy?</h4>
        <h4>Summary</h4>
        {sendSaveDialogContent(props)}
      </div>
    );
  };

  const SavePolicyDialogActions = () => {
    const buttonsData = [
      {
        title: "Cancel",
        variant: "contained",
        color: "secondary",
        startIcon: <CloseOutlinedIcon />,
        handleAction: () => dispatch(hideSavePolicyDialogAction()),
      },
      {
        title: "Save",
        variant: "contained",
        color: "primary",
        startIcon: <SaveOutlinedIcon />,
        handleAction: () => dispatch(savePolicyAction()),
      },
    ];

    return buttonsData.map((button) => (
      <Button
        variant={button.variant}
        color={button.color}
        onClick={button.handleAction}
        startIcon={button.startIcon}
      >
        {button.title}
      </Button>
    ));
  };

  const SendPolicyDialogContent = (props) => {
    return (
      <div>
        <h4>Do you want to save the following draft pay policy?</h4>
        {sendSaveDialogContent(props)}
      </div>
    );
  };

  const SendPolicyDialogActions = () => {
    const buttonsData = [
      {
        title: "Cancel",
        variant: "contained",
        color: "secondary",
        startIcon: <CloseOutlinedIcon />,
        handleAction: () => dispatch(hideSendPolicyDialogAction()),
      },
      {
        title: "Send",
        variant: "contained",
        color: "primary",
        startIcon: <SaveOutlinedIcon />,
        handleAction: () => dispatch(sendPolicyAction()),
      },
    ];

    return buttonsData.map((button) => (
      <Button
        variant={button.variant}
        color={button.color}
        onClick={button.handleAction}
        startIcon={button.startIcon}
      >
        {button.title}
      </Button>
    ));
  };

  return (
    <main
      className={clsx(classes.policyAddMain, {
        [classes.policyAddMainExpanded]: contextDrawerExpanded,
        [classes.policyAddMainCollapsed]: !contextDrawerExpanded,
      })}
    >
      <MainDialog
        Open={resetPolicyDialogShow}
        Icon={<ReportProblemOutlinedIcon className={classes.cautionIcon} />}
        Title="Reset Pay Policy"
        Content={<ResetPolicyDialogContent />}
        Actions={<ResetPolicyDialogActions />}
        handleHide={hideResetPolicyDialogAction}
      />
      <MainDialog
        Open={savePolicyDialogShow}
        Icon={<LiveHelpOutlinedIcon className={classes.questionIcon} />}
        Title="Save Pay Policy"
        Content={<SavePolicyDialogContent {...policyData} />}
        Actions={<SavePolicyDialogActions />}
        handleHide={hideSavePolicyDialogAction}
      />
      <MainDialog
        Open={sendPolicyDialogShow}
        Icon={<LiveHelpOutlinedIcon className={classes.questionIcon} />}
        Title="Send Pay Policy"
        Content={<SendPolicyDialogContent {...policyData} />}
        Actions={<SendPolicyDialogActions />}
        handleHide={hideSendPolicyDialogAction}
      />
      <div className={classes.graspLogo}>
        <h4 className={classes.title}>COMPANY PAY POLICY</h4>
      </div>
      <Formik
        className={classes.form}
        initialValues={payrollState}
        validationSchema={Yup.object().shape({
          policyOwner: Yup.string().required("Policy Owner is required"),
          policyOrigin: Yup.string().required("Policy Origin is required"),
          policyAudience: Yup.string().required("Policy Audience is required"),
          policyName: Yup.string().required("Policy Name is required"),
          policyStatement: Yup.string().required(
            "Policy Statement is required"
          ),
          policyInitiator: Yup.string().required(
            "Policy Initiator is required"
          ),
          policyAssurance: Yup.string().required(
            "Policy Assurance is required"
          ),
        })}
        onSubmit={({
          policyOwner,
          policyOrigin,
          policyAudience,
          policyName,
          policyStatement,
          policyInitiator,
          policyAssurance,
        }) => {
          dispatch(
            savePolicyAction(
              policyOwner,
              policyOrigin,
              policyAudience,
              policyName,
              policyName,
              policyStatement,
              policyInitiator,
              policyAssurance
            )
          );
        }}
      >
        {(props) => {
          const {
            values: {
              policyOwner,
              policyOrigin,
              policyAudience,
              policyName,
              policyDate,
              policyStatement,
              policyInitiator,
            },
            errors,
            touched,
            handleChange,
            handleSubmit,
          } = props;

          return (
            <form className={classes.form} onSubmit={handleSubmit}>
              <div className={classes.formInputs}>
                <div className={classes.policyOwnerDate}>
                  <TextField
                    className={classes.textField}
                    name="policyOwner"
                    helperText={touched.policyOwner ? errors.policyOwner : ""}
                    error={Boolean(errors.policyOwner)}
                    label="Policy Owner"
                    value={policyOwner}
                    onChange={handleChange}
                  />
                  <TextField
                    className={classes.policyDate}
                    name="policyDate"
                    helperText={touched.policyDate ? errors.policyDate : ""}
                    error={Boolean(errors.policyDate)}
                    label="Policy Date"
                    value={policyDate}
                    onChange={handleChange}
                    type="datetime-local"
                  />
                </div>
                <div className={classes.policyOriginAudience}>
                  <TextField
                    name="policyOrigin"
                    helperText={touched.policyOrigin ? errors.policyOrigin : ""}
                    error={Boolean(errors.policyOrigin)}
                    label="Policy Origin"
                    value={policyOrigin}
                    onChange={handleChange}
                  />
                  <TextField
                    name="policyAudience"
                    helperText={
                      touched.policyAudience ? errors.policyAudience : ""
                    }
                    error={Boolean(errors.policyAudience)}
                    label="Policy Audience"
                    value={policyAudience}
                    onChange={handleChange}
                  />
                </div>
                <Grid item container direction="row" justify="flex-start">
                  <TextField
                    className={classes.policyName}
                    name="policyName"
                    helperText={touched.policyName ? errors.policyName : ""}
                    error={Boolean(errors.policyName)}
                    label="Policy Name"
                    value={policyName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item container direction="row" justify="flex-start">
                  <TextField
                    className={classes.policyStatement}
                    name="policyStatement"
                    helperText={
                      touched.policyStatement ? errors.policyStatement : ""
                    }
                    error={Boolean(errors.policyStatement)}
                    label="Policy Statement"
                    value={policyStatement}
                    onChange={handleChange}
                    rows={13}
                    multiline
                  />
                </Grid>
                <div className={classes.policyInitiator}>
                  <TextField
                    className={classes.policyInitiatorInput}
                    name="policyInitiator"
                    helperText={
                      touched.policyInitiator ? errors.policyInitiator : ""
                    }
                    error={Boolean(errors.policyInitiator)}
                    label="Policy Initiator"
                    value={policyInitiator}
                    onChange={handleChange}
                    select
                  >
                    {values.map((option, i) => (
                      <MenuItem key={i} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button
                    className={classes.policyInitiatorButton}
                    variant="contained"
                    color="primary"
                    // disabled={!isValid}
                    startIcon={<AddIcon />}
                    onClick={() => dispatch(addPolicyInitiatorAction())}
                  >
                    Add Initiator
                  </Button>
                </div>
                {/* {pending && (
                <img
                  alt="loading..."
                  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                />
              )} */}
              </div>
              <Divider />
              <div className={classes.dividerButtons}>
                <Button
                  className={classes.button}
                  variant="outlined"
                  color="secondary"
                  // disabled={!isValid}
                  startIcon={<AddIcon />}
                  onClick={() => dispatch(showResetPolicyDialogAction())}
                >
                  Reset Policy
                </Button>
                <Button
                  className={classes.button}
                  variant="outlined"
                  color="primary"
                  // disabled={!isValid}
                  startIcon={<SaveOutlinedIcon />}
                  onClick={() => dispatch(showSavePolicyDialogAction())}
                >
                  Save Policy
                </Button>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  // disabled={!isValid}
                  startIcon={<SendOutlinedIcon />}
                  onClick={() => dispatch(showSendPolicyDialogAction())}
                >
                  Send Policy
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </main>
  );
};

export default PolicyAddViewWorkflow;
