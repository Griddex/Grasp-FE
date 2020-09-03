// import "date-fns";
// import DateFnsUtils from "@date-io/date-fns";
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
import theme from "./Application/Theme/Theme";

render(
  <SnackbarProvider maxSnack={3}>
    <Provider store={store}>
      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <App />
        </Router>
      </ThemeProvider>
      {/* </MuiPickersUtilsProvider> */}
    </Provider>
  </SnackbarProvider>,
  document.getElementById("app")
);
