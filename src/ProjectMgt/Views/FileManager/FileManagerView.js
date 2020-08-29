import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import FilesView from "./FilesView";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  root: {
    display: "flex",
  },

  menuButton: {
    marginRight: theme.spacing(0),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(7, 3),
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

function FileManagerView(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <main className={classes.content}>
        <Switch>
          <Route path="/filemanager/:folderId" component={FilesView} />
          <Route path="/filemanager" component={FilesView} />
        </Switch>
      </main>
    </div>
  );
}

//export {DrawerView}
const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps)(FileManagerView);
