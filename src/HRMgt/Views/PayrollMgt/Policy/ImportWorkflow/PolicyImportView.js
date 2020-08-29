import React from "react";
import ModuleCard from "./../../../../../Application/Components/ModuleCard";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as ExcelLogo } from "../../../../../Application/Images/ImportImages/ExcelImport.svg";
import { ReactComponent as PowerpointLogo } from "../../../../../Application/Images/ImportImages/PowerpointImport.svg";
import { ReactComponent as DatabaseLogo } from "../../../../../Application/Images/ImportImages/DatabaseImport.svg";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { importModulesCloseAction } from "./../../../../Redux/Actions/PayrollActions";

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
  },
}));

const PolicyImportView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { url, path } = useRouteMatch();

  const showImportModulesView = useSelector(
    (state) => state.payrollReducer.showImportModulesView
  );

  const data = [
    {
      ModuleAction: "ExcelCSVTxTImport",
      mainTitle: "Excel | CSV | Txt",
      description: `Import excel sheets in the following
      formats: .xls, .xlsx & .csv.
      Also import in .txt or .dat formats`,
      landingIcon: <ExcelLogo className={classes.image} />,
      urlPath: `${url}/ExcelCSVTxTImport`,
    },
    {
      ModuleAction: "PowerpointWord",
      mainTitle: "Powerpoint | Word",
      description: `Import policies from Word and
      Powerpoint documents. Powerful
     algorithm pre-selects policy names,
     dates etc`,
      landingIcon: <PowerpointLogo className={classes.image} />,
      urlPath: `${url}/PowerpointWord`,
    },
    {
      ModuleAction: "Database",
      mainTitle: "Database",
      description: `Connect to and import from the 
      following databases:
      AccessDb, MSSQL, MySQL etc`,
      landingIcon: <DatabaseLogo className={classes.image} />,
      urlPath: `${url}/Database`,
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
          path={`${path}/:importWorkflowType`}
          render={(props) => {
            const {
              match: {
                params: { importWorkflowType },
              },
            } = props;

            const importWorkflows = {
              ExcelCSVTxTImport: "ExcelImportWorkflow",
              PowerpointWord: "PowerpointWord",
              Database: "Database",
            };
            return <div>{importWorkflows[importWorkflowType]}</div>;
          }}
        />
      )}
    </>
  );
};

export default PolicyImportView;
