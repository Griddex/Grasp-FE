// import { Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  contextDrawerExpandAction,
  contextDrawerCollapseAction,
} from "../Redux/Actions/LayoutActions";

const ContextDrawerWidthExpanded = 150;
// const ContextDrawerWidthCollapsed = 40
const NavbarHeight = 45;
const SubNavbarHeight = 30;
const marginTop = NavbarHeight + SubNavbarHeight;
const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none",
  },
  contextDrawer: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    position: "absolute",
    right: 0,
    marginTop: marginTop,
    height: (props) => {
      return `calc(100% - ${marginTop}px)`;
    },
    width: ContextDrawerWidthExpanded,
    backgroundColor: "#FFFFFF",
    zIndex: theme.zIndex.drawer,
  },
  contextDrawerExpanded: {
    width: 150,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  contextDrawerCollapsed: {
    width: 40,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
  },
  contextDrawerMenuIcon: {
    margin: 0,
  },
  menuButton: {
    margin: 0,
  },
}));

const ContextDrawer = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const contextDrawerExpanded = useSelector(
    (state) => state.layoutReducer.contextDrawerExpanded
  );

  return (
    <div
      className={clsx(classes.contextDrawer, {
        [classes.contextDrawerExpanded]: contextDrawerExpanded,
        [classes.contextDrawerCollapsed]: !contextDrawerExpanded,
      })}
    >
      {contextDrawerExpanded ? (
        <IconButton
          color="inherit"
          aria-label="close drawer"
          onClick={() => dispatch(contextDrawerCollapseAction())}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: !contextDrawerExpanded,
          })}
        >
          <ChevronRightIcon />
        </IconButton>
      ) : (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => dispatch(contextDrawerExpandAction())}
          edge="start"
          className={clsx(classes.contextDrawerMenuIcon, {
            [classes.hide]: contextDrawerExpanded,
          })}
        >
          <MenuIcon />
        </IconButton>
      )}
      {children}
    </div>
  );
  // return (
  //   <Drawer
  //     variant="persistent"
  //     anchor="right"
  //     open={contextDrawerExpanded}
  //     // className={clsx(classes.contextDrawer, {
  //     //   [classes.contextDrawerExpanded]: contextDrawerExpanded,
  //     //   [classes.contextDrawerCollapsed]: !contextDrawerExpanded,
  //     // })}
  //     classes={{
  //       paper: classes.contextDrawer,
  //     }}
  //   >
  //     {contextDrawerExpanded ? (<IconButton
  //         color="inherit"
  //         aria-label="close drawer"
  //         onClick={() => dispatch(contextDrawerCollapseAction())}
  //         edge="start"
  //         className={clsx(classes.menuButton, {
  //           [classes.hide]: !contextDrawerExpanded,
  //         })}
  //       >
  //         <ChevronRightIcon />
  //       </IconButton>

  //     ) : (
  //       <IconButton
  //         color="inherit"
  //         aria-label="open drawer"
  //         onClick={() => dispatch(contextDrawerExpandAction())}
  //         edge="start"
  //         className={clsx(classes.contextDrawerMenuIcon, {
  //           [classes.hide]: contextDrawerExpanded,
  //         })}
  //       >
  //         <MenuIcon />
  //       </IconButton>
  //     )}
  //     {children}
  //   </Drawer>
  // );
};

export default React.memo(ContextDrawer);
