import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import FlagIcon from "@material-ui/icons/Flag";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import SearchIcon from "@material-ui/icons/Search";
// import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import React from "react";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { showModulesViewAction } from "./../Redux/Actions/ModuleActions";
import {
  mainDrawerExpandAction,
  mainDrawerCollapseAction,
} from "../Redux/Actions/LayoutActions";
import "../Modules/Styles/Modules.scss";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  sidebarHeaderHidden: {
    height: 45,
  },
  sidebarHeader: {
    display: "flex",
    height: 30,
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  modulesViewIcon: {
    cursor: "pointer",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    top: 0,
    left: 0,
  },
  menuIcon: {
    cursor: "pointer",
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

//redux saga that fetches all the submodules in any module for which
//the current user has license and permission for
//find a way to generate a very secure license token
//usually generated from the company's server certificate,
//rotating salt on Grasp server side and
//license server that is only accessible by one or
//a few authenticated services
//the location of the license may also be locked by
// a secure key which itself may be rotated too

const hrMenuItems = [
  {
    id: "1",
    caption: "Competency Management",
    secondaryCaption: "Manage Employees' Competency",
    link: "/CompetencyManagement",
    hasSubMenu: false,
  },
  {
    id: "2",
    caption: "Compensation Management",
    secondaryCaption: "Manage Employees' Compensation",
    link: "/CompensationManagement",
    hasSubMenu: false,
  },
  {
    id: "3",
    caption: "Performance Management",
    secondaryCaption: "Manage Employees' Performance",
    link: "/PerformanceManagement",
    hasSubMenu: false,
  },
  {
    id: "4",
    caption: "Human Resources Management",
    secondaryCaption: "Manage Human Resources",
    link: "/HumanResources",
    hasSubMenu: false,
  },
  {
    id: "5",
    caption: "Personnel Administration",
    secondaryCaption: "Manage Administration",
    link: "/PersonnelAdministration",
    hasSubMenu: false,
  },
  {
    id: "6",
    caption: "Payroll Management",
    secondaryCaption: "Manage Payroll",
    link: "/PayrollManagement",
    hasSubMenu: true,
    subMenuItems: [
      {
        id: "1",
        caption: "Policy",
        secondaryCaption: "Manage Payroll Policy",
        link: "/Policy",
      },
      {
        id: "2",
        caption: "Planning",
        secondaryCaption: "Payroll Planning",
        link: "/Planning",
      },
      {
        id: "3",
        caption: "Benefits",
        secondaryCaption: "Manage Payroll Benefits",
        link: "/Benefits",
      },
      {
        id: "4",
        caption: "Deductions",
        secondaryCaption: "Manage Payroll Deductions",
        link: "/Deductions",
      },
      {
        id: "5",
        caption: "Reports",
        secondaryCaption: "Manage Payroll Reports",
        link: "/Policy",
      },
      {
        id: "6",
        caption: "Payslips",
        secondaryCaption: "Manage Payslips",
        link: "/Payslips",
      },
    ],
  },
  {
    id: "7",
    caption: "Talent Management",
    secondaryCaption: "Manage Talent",
    link: "/TalentManagement",
    hasSubMenu: false,
  },
  {
    id: "8",
    caption: "Industrial Relations",
    secondaryCaption: "Manage Industrial Relations",
    link: "/IndustrialRelations",
    hasSubMenu: false,
  },
  {
    id: "9",
    caption: "Strategic Management",
    secondaryCaption: "Manage Business Strategy",
    link: "/StrategicManagement",
    hasSubMenu: false,
  },
];

const prMenuItems = [
  {
    id: "1",
    caption: "Communication",
    secondaryCaption: "Manage Employees' Communication",
    link: "/Communication",
    hasSubMenu: false,
  },
  {
    id: "2",
    caption: "Leadership",
    secondaryCaption: "Manage Employees' Leadership",
    link: "/CLeadership",
    hasSubMenu: false,
  },
  {
    id: "3",
    caption: "Organization",
    secondaryCaption: "Manage Employees' Organization",
    link: "/Organization",
    hasSubMenu: false,
  },
];

const allMenuItems = {
  HumanResources: hrMenuItems,
  ProjectManagement: prMenuItems,
};

export const MainDrawer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { url } = useRouteMatch();
  const { activeModule: moduleActive } = useParams();

  const mainDrawerOpen = useSelector(
    (state) => state.layoutReducer.mainDrawerExpanded
  );
  const activeModule = useSelector(
    (state) => state.modulesReducer.activeModule
  );

  const menuItems =
    (activeModule && allMenuItems[activeModule]) || allMenuItems[moduleActive]; //what if activemodule is null?
  const moduleUrl = `${url}`;
  const subModuleUrl = `${url}/PayrollManagement`;

  return (
    <div className={classes.drawer} aria-label="Mailbox folders">
      <ProSidebar collapsed={!mainDrawerOpen}>
        <SidebarHeader className={classes.sidebarHeaderHidden}></SidebarHeader>
        <div className={classes.sidebarHeader}>
          {mainDrawerOpen ? (
            <FirstPageIcon
              className={classes.menuIcon}
              onClick={(e) => dispatch(mainDrawerCollapseAction())}
            />
          ) : (
            <MenuIcon
              className={classes.menuIcon}
              onClick={(e) => dispatch(mainDrawerExpandAction())}
            />
          )}
          <ViewModuleIcon
            className={classes.modulesViewIcon}
            onClick={(e) => {
              history.push("/grasp");
              dispatch(showModulesViewAction());
            }}
          />
          <Hidden xsDown>
            <SearchIcon />
            <FlagIcon />
          </Hidden>
        </div>
        <Divider />
        <SidebarContent>
          <Menu iconShape="square" popperArrow>
            {menuItems.map((menuItem, i) => {
              const { caption, link, hasSubMenu, subMenuItems } = menuItem;

              if (hasSubMenu)
                return (
                  <SubMenu
                    onClick={(e) => {
                      history.push(`${moduleUrl}${link}`);
                    }}
                    key={i}
                    title={caption}
                    icon={<InboxIcon />}
                  >
                    {subMenuItems.map((menuItem, i) => {
                      const { caption, link } = menuItem;

                      return (
                        <MenuItem
                          onClick={(e) => {
                            history.push(`${subModuleUrl}${link}`);
                          }}
                          key={i}
                          icon={<InboxIcon />}
                        >
                          {caption}
                        </MenuItem>
                      );
                    })}
                  </SubMenu>
                );
              else
                return (
                  <MenuItem
                    onClick={(e) => {
                      history.push(`${moduleUrl}${link}`);
                    }}
                    key={i}
                    icon={<InboxIcon />}
                  >
                    {caption}
                  </MenuItem>
                );
            })}
          </Menu>
        </SidebarContent>
        <SidebarFooter></SidebarFooter>
      </ProSidebar>
    </div>
  );
};
