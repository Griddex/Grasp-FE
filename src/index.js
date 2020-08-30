import MomentUtils from "@date-io/moment";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { SnackbarProvider } from "notistack";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import App from "./Application/App";
import store from "./Application/Redux/Store/Store";
import history from "./Application/Services/HistoryService";

const theme = createMuiTheme({
  palette: { primary: { main: "#2AA9C5" } },
  background: "#EFEFEF",
  overrides: {},
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});

render(
  <SnackbarProvider maxSnack={3}>
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <App />
          </Router>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </Provider>
  </SnackbarProvider>,
  document.getElementById("app")
);
