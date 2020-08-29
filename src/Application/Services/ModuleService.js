import React from "react";

const ModuleService = (activeModule) => {
  const GraspModules = {
    HUmanResources: <Modules />,
    ProjectManagement: <Modules />,
    FacilityManagement: <Modules />,
    Accounting: <Modules />,
    Finance: <Modules />,
    Logistics: <Modules />,
    InventoryManagement: <Modules />,
    CustomerRelationsManagement: <Modules />,
  };

  return GraspModules[activeModule];
};

export default ModuleService;
