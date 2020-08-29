import {
  EXPAND_MAINDRAWER,
  COLLAPSE_MAINDRAWER,
} from "../Actions/LayoutActions";
import layoutState from "../State/LayoutState";

const layoutReducer = (state = layoutState, action) => {
  switch (action.type) {
    case EXPAND_MAINDRAWER:
      return { ...state, mainDrawerExpanded: action.payload.open };

    case COLLAPSE_MAINDRAWER:
      return { ...state, mainDrawerExpanded: action.payload.open };

    default:
      return state;
  }
};
export default layoutReducer;
