import {
  SHOW_IMPORTMODULES,
  HIDE_IMPORTMODULES,
} from "../Actions/PayrollActions";

import payrollState from "./../State/PayrollState";

const payrollReducer = (state = payrollState, action) => {
  switch (action.type) {
    case SHOW_IMPORTMODULES:
      return { ...state, showImportModulesView: action.payload.open };

    case HIDE_IMPORTMODULES:
      return { ...state, showImportModulesView: action.payload.open };

    default:
      return state;
  }
};
export default payrollReducer;
