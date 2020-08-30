import { Grid } from "@material-ui/core";
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
}));

const ModulesView = () => {
  const classes = useStyles();
  const showModulesView = useSelector(
    (state) => state.modulesReducer.showModulesView
  );
  const { url, path } = useRouteMatch();

  const data = [
    {
      ModuleAction: "HumanResources",
      mainTitle: "Human Resources",
      description: `Human resources (HR) is the 
        division of a business that is charged
         with finding, screening, recruiting, 
        and training job applicants, 
        as well as administering
         employee-benefit programs. `,
      landingIcon: <Grasptitlelogo className={classes.image} />,
      urlPath: `${url}/HumanResources`,
    },
    {
      ModuleAction: "ProjectManagement",
      mainTitle: "Project Management",
      description: `The discipline of organizing and managing resources 
        (e.g. people) in such a way that a project is 
        completed within defined scope, 
        quality, time and cost constraints.`,
      landingIcon: <Grasptitlelogo className={classes.image} />,
      urlPath: `${url}/ProjectManagement`,
    },
    {
      ModuleAction: "FacilityManagement",
      mainTitle: "Facility Management",
      description: `Facility management (FM) is a profession that encompasses 
        multiple disciplines to ensure functionality, comfort, 
        safety and efficiency of the built environment by 
        integrating people, place, process and technology`,
      landingIcon: <Grasptitlelogo className={classes.image} />,
      urlPath: `${url}/FacilityManagement`,
    },
    {
      ModuleAction: "Accounting",
      mainTitle: "Accounting",
      description: `The bookkeeping methods involved in making a financial 
        record of business transactions and in the preparation 
        of statements concerning the assets, liabilities, 
        and operating results of a business.`,
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
        storing and using a company's inventory. This includes
        the management of raw materials, components and finished 
        products, as well as warehousing and processing such items.`,
      landingIcon: <Grasptitlelogo className={classes.image} />,
      urlPath: `${url}/InventoryManagement`,
    },
    {
      ModuleAction: "CustomerRelationsManagement",
      mainTitle: "Customer Relations",
      description: `Customer relationship management (CRM) is one of many different 
        approaches that allow a company to manage and analyse its 
        own interactions with its past, current and potential customers. `,
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
    </>
  );
};

export default ModulesView;
