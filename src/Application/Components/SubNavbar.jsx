import { Button, Toolbar } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
//import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import history from "./../Services/HistoryService";

const subNavBarWidth = 30;
const subNavBarMarginTop = 46;
const MainDrawerWidthCollapsed = 70;
const MainDrawerWidthExpanded = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "nowrap",
    height: "100%",
    textAlign: "center",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  appBar: {
    backgroundColor: "#eeeeee",
    marginTop: subNavBarMarginTop,
    height: subNavBarWidth,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShiftCollapsed: {
    marginLeft: `${MainDrawerWidthCollapsed}px`,
    width: `calc(100% - ${MainDrawerWidthCollapsed}px)`,
  },
  appBarShiftExpanded: {
    marginLeft: `${MainDrawerWidthExpanded}px`,
    width: `calc(100% - ${MainDrawerWidthExpanded}px)`,
  },
  appbarToolBar: {
    height: "100%",
    minHeight: "100%",
    // "& > *":{
    //   marginLeft:
    // }
  },
  button: {
    height: subNavBarWidth,
    padding: "0px 10px",
    // width: "auto",
    minWidth: 100,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

const SubNavbar = (props) => {
  const { subNavbarItems } = props;
  const classes = useStyles();
  // const dispatch = useDispatch();
  // const { url, path } = useRouteMatch();
  const mainDrawerOpen = useSelector(
    (state) => state.layoutReducer.mainDrawerExpanded
  );

  return (
    <AppBar
      className={clsx(classes.appBar, {
        [classes.appBarShiftExpanded]: mainDrawerOpen,
        [classes.appBarShiftCollapsed]: !mainDrawerOpen,
      })}
    >
      <Toolbar className={classes.appbarToolBar} disableGutters>
        <div>
          {subNavbarItems.map((row, i) => (
            <Button
              key={i}
              onClick={() => {
                // dispatch(navigateResetWorkflowAction());
                history.push(row.route);
              }}
              className={classes.button}
              endIcon={row.icon}
            >
              <Typography variant="subtitle2">{row.name}</Typography>
            </Button>
          ))}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(SubNavbar);
