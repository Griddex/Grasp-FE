import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";
import ModuleCard from "../Components/ModuleCard";
import { ReactComponent as Grasptitlelogo } from "../Images/Grasptitlelogo.svg";
// import { ReactComponent as AccountingLogo } from "../Images/ModulesViewImages/Accounting.svg";
// import { ReactComponent as CustomerRelationsManagementLogo } from "../Images/ModulesViewImages/CustomerRelationsManagement.svg";
// import { ReactComponent as FacilityManagementLogo } from "../Images/ModulesViewImages/FacilityManagement.svg";
// import { ReactComponent as FinanceLogo } from "../Images/ModulesViewImages/FinanceManagement.svg";
// import { ReactComponent as HumanResourcesLogo} from "../Images/ModulesViewImages/HumanResources.svg";
// import { ReactComponent as InventoryManagementLogo } from "../Images/ModulesViewImages/InventoryManagement.svg";
// import { ReactComponent as LogisiticsLogo } from "../Images/ModulesViewImages/LogisiticsManagement.svg";
// import { ReactComponent as ProjectManagementLogo } from "../Images/ModulesViewImages/ProjectManagement.svg";
import Modules from "../Modules/Modules";
// import Image from "./../Components/Image";
import { hideModulesViewAction } from "./../Redux/Actions/ModuleActions";
import MainDialog from "./../../HRMgt/Components/MainDialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import { hideSpinnerAction } from "../../Application/Redux/Actions/UISpinnerActions";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    height: "100%",
    "& > *": {
      margin: theme.spacing(3),
    },
  },
  image: {
    height: 80,
    width: 70,
  },
  circularProgress: { height: 150, width: 150, bottomMargin: 20 },
  saveIcon: { height: 40, width: 40, color: `${green[700]}` },
}));

const ProgressDialog = (props) => {
  const { message, classes } = props;

  return (
    <Grid container direction="column" alignItems="center">
      <CircularProgress className={classes.circularProgress} />
      <Typography variant="subtitle1" gutterBottom>
        {message}
      </Typography>
    </Grid>
  );
};

const CancelProgressDialogActions = (props) => {
  const { dispatch } = props;

  const buttonsData = [
    {
      title: "Cancel",
      variant: "contained",
      color: "secondary",
      startIcon: <CloseOutlinedIcon />,
      handleAction: () => dispatch(hideSpinnerAction()),
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

const ModulesView = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const showModulesView = useSelector(
    (state) => state.modulesReducer.showModulesView
  );
  const pending = useSelector((state) => state.uiSpinnerReducer.pending);
  const message = useSelector((state) => state.uiSpinnerReducer.message);
  const { url, path } = useRouteMatch();

  const data = [
    {
      ModuleAction: "HumanResources",
      mainTitle: "Human Resources",
      description: `Human resources (HR) is the 
        division of a business that is charged
         with finding, screening, recruiting, 
        `,
      landingIcon: <Grasptitlelogo className={classes.image} />,
      urlPath: `${url}/HumanResources`,
    },
    {
      ModuleAction: "ProjectManagement",
      mainTitle: "Project Management",
      description: `The discipline of organizing and managing resources 
        (e.g. people) in such a way that a project is 
        completed within defined scope.`,
      landingIcon: <Grasptitlelogo className={classes.image} />,
      urlPath: `${url}/ProjectManagement`,
    },
    {
      ModuleAction: "FacilityManagement",
      mainTitle: "Facility Management",
      description: `Facility management (FM) is a profession that encompasses 
        multiple disciplines to ensure functionality, comfort, 
        safety and efficiency `,
      landingIcon: <Grasptitlelogo className={classes.image} />,
      urlPath: `${url}/FacilityManagement`,
    },
    {
      ModuleAction: "Accounting",
      mainTitle: "Accounting",
      description: `The bookkeeping methods involved in making a financial 
        record of business transactions and in the preparation 
        of `,
      landingIcon: <Grasptitlelogo className={classes.image} />,
      urlPath: `${url}/Accounting`,
    },
    {
      ModuleAction: "Finance",
      mainTitle: "Finance",
      description: `The management of money, banking, investments, and credit.`,
      landingIcon: <Grasptitlelogo className={classes.image} />,
      urlPath: `${url}/Finance`,
    },
    {
      ModuleAction: "Logisitics",
      mainTitle: "Logisitics",
      description: `The aspect of military operations that deals 
        with the procurement, distribution, maintenance, 
       and replacement of materiel and personnel.`,
      landingIcon: <Grasptitlelogo className={classes.image} />,
      urlPath: `${url}/Logisitics`,
    },
    {
      ModuleAction: "InventoryManagement",
      mainTitle: "Inventory Management",
      description: `Inventory management refers to the process of ordering, 
        storing and using a company's inventory. `,
      landingIcon: <Grasptitlelogo className={classes.image} />,
      urlPath: `${url}/InventoryManagement`,
    },
    {
      ModuleAction: "CustomerRelationsManagement",
      mainTitle: "Customer Relations",
      description: `Customer relationship management (CRM) is one of many different 
        approaches that allow a company to manage.`,
      landingIcon: <Grasptitlelogo className={classes.image} />,
      urlPath: `${url}/CustomerRelationsManagement`,
    },
  ];

  return (
    <>
      {showModulesView ? (
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
                ModuleAction={hideModulesViewAction}
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
          path={`${path}/:activeModule`}
          render={(props) => {
            const {
              match: {
                params: { activeModule },
              },
            } = props;

            return <Modules activeModule={activeModule} />;
          }}
        />
      )}
      <MainDialog
        Open={pending}
        Icon={<SaveOutlinedIcon className={classes.saveIcon} />}
        Title="Saving"
        Content={<ProgressDialog message={message} classes={classes} />}
        Actions={<CancelProgressDialogActions dispatch={dispatch} />} //Implement ability to cancel operation
        handleHide={() => dispatch(hideSpinnerAction())}
        maxWidth="xs"
      />
      {/*Need to generalize the MainDialog component to accept  */}
    </>
  );
};

export default ModulesView;
