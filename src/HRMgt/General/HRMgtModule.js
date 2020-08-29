import React from "react";
import { Route, Switch } from "react-router-dom";
import FileManagerView from "../../ProjectMgt/Views/FileManager/FileManagerView";
import ModulesView from "../../ProjectMgt/Views/Modules/ModulesView";
import ProjectsView from "../../ProjectMgt/Views/Projects/ProjectsView";
import ProjectTableView from "../../ProjectMgt/Views/Projects/ProjectTableView";
import ProjectTaskGroupGanttView from "../../ProjectMgt/Views/Projects/ProjectTaskGroupGanttView";
import UsersSetupView from "../../ProjectMgt/Views/Setup/UsersSetupView";
import SetupView from "./../../ProjectMgt/Views/Setup/SetupView";
import UserProfileView from "./../../ProjectMgt/Views/User/UserProfileView";
import UserRegistrationView from "./../Views/UserRegistrationView";

const HRMgtModule = () => {
  return (
    <Switch>
      <Route exact path={url} component={ModulesView} />
      <Route path={`${url}/register`} component={UserRegistrationView} />
      <Route path={`${url}/projects`} component={ProjectsView} />
      <Route path={`${url}/projecttable`} component={ProjectTableView} />
      <Route
        path={`${url}/projectgant`}
        component={ProjectTaskGroupGanttView}
      />
      <Route path={`${url}/setup`} component={SetupView} />
      <Route path={`${url}/filemanager`} component={FileManagerView} />
      <Route path={`${url}/profile`} component={UserProfileView} />
      <Route path={`${url}/usersetup`} component={UsersSetupView} />
    </Switch>
  );
};

export default HRMgtModule;
