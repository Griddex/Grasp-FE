import { combineReducers } from "redux";
import loginReducer from "./LoginReducer";
import snackbarReducer from "./SnackbarReducer";
import uiSpinnerReducer from "./UISpinnerReducer";
import modulesReducer from "./ModulesReducer";
import layoutReducer from "./LayoutReducer";
import payrollReducer from "./../../../HRMgt/Redux/Reducers/PayrollReducer";

const rootReducer = combineReducers({
  loginReducer,
  modulesReducer,
  layoutReducer,
  uiSpinnerReducer,
  snackbarReducer,
  payrollReducer,
});

export default rootReducer;
