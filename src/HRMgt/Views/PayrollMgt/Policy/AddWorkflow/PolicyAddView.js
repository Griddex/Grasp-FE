import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";
import ModuleCard from "./../../../../../Application/Components/ModuleCard";
import { importModulesCloseAction } from "./../../../../Redux/Actions/PayrollActions";
import PolicyAddViewWorkflow from "./PolicyAddViewWorkflow";
import { ReactComponent as AddInformationLogo } from "../../../../../Application/Images/AddImages/AddInformation.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    "& > *": {
      margin: theme.spacing(3),
    },
  },
  image: {
    height: 80,
    width: 70,
    color: theme.palette.primary.light,
  },
}));

const PolicyAddView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { url, path } = useRouteMatch();

  const showImportModulesView = useSelector(
    (state) => state.payrollReducer.showImportModulesView
  );

  const data = [
    {
      ModuleName: "AddPayrollPolicy",
      mainTitle: "Add Payroll Policy",
      description: `Manually Add a payroll policy
      one at a time`,
      landingIcon: <AddInformationLogo className={classes.image} />,
      urlPath: `${url}/AddPayrollPolicy`,
    },
  ];

  return (
    <>
      {showImportModulesView ? (
        <Grid
          container
          className={classes.root}
          direction="row"
          justify="center"
          alignItems="center"
        >
          {data.map((module, i) => {
            const { landingIcon, mainTitle, description, urlPath } = module;

            return (
              <ModuleCard
                key={i}
                ModuleAction={importModulesCloseAction}
                Icon={landingIcon}
                MainTitle={mainTitle}
                Description={description}
                UrlPath={urlPath}
              />
            );
          })}
        </Grid>
      ) : (
        <Route
          path={`${path}/:addInformationType`}
          render={(props) => {
            const {
              match: {
                params: { addInformationType },
              },
            } = props;

            const addInformation = {
              AddPayrollPolicy: <PolicyAddViewWorkflow />,
            };
            return addInformation[addInformationType];
          }}
        />
      )}
    </>
  );
};

export default PolicyAddView;
