import {
  SHOW_MODULESVIEW,
  HIDE_MODULESVIEW,
  STORE_ACTIVEMODULE,
} from "../Actions/ModuleActions";
import modulesState from "./../State/ModulesState";

const modulesReducer = (state = modulesState, action) => {
  switch (action.type) {
    case SHOW_MODULESVIEW:
      return {
        ...state,
        showModulesView: action.payload.show,
      };

    case HIDE_MODULESVIEW:
      return { ...state, showModulesView: action.payload.show };

    case STORE_ACTIVEMODULE:
      return {
        ...state,
        activeModule: action.payload.activeModule,
      };

    default:
      return state;
  }
};
export default modulesReducer;
