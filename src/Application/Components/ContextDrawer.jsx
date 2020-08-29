import { Drawer } from "@material-ui/core";
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

const NavBarHeight = 45;
const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none",
  },
  contextDrawer: {
    display: "flex",
    flexShrink: 0,
    marginTop: NavBarHeight,
    whiteSpace: "nowrap",
  },
  contextDrawerExpanded: {
    width: 150,
    height: (props) => {
      return `calc(100%-${NavBarHeight}px)`;
    },
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  contextDrawerCollapsed: {
    width: 40,
    height: (props) => {
      return `calc(100%-${NavBarHeight}px)`;
    },
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
  const dispatch = useDispatch();
  const contextDrawerExpanded = useSelector(
    (state) => state.layoutReducer.contextDrawerExpanded
  );

  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      className={clsx(classes.contextDrawer, {
        [classes.contextDrawerExpanded]: contextDrawerExpanded,
        [classes.contextDrawerCollapsed]: !contextDrawerExpanded,
      })}
      classes={{
        paper: clsx(classes.contextDrawer, {
          [classes.contextDrawerExpanded]: contextDrawerExpanded,
          [classes.contextDrawerCollapsed]: !contextDrawerExpanded,
        }),
      }}
    >
      {!contextDrawerExpanded ? (
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
      ) : (
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
      )}
      {children}
    </Drawer>
  );
};

export default React.memo(ContextDrawer);
