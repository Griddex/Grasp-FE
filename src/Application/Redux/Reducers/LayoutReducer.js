import {
  EXPAND_MAINDRAWER,
  COLLAPSE_MAINDRAWER,
  EXPAND_CONTEXTDRAWER,
  COLLAPSE_CONTEXTDRAWER,
} from "../Actions/LayoutActions";
import layoutState from "../State/LayoutState";

const layoutReducer = (state = layoutState, action) => {
  switch (action.type) {
    case EXPAND_MAINDRAWER:
      return { ...state, mainDrawerExpanded: action.payload.expand };

    case COLLAPSE_MAINDRAWER:
      return { ...state, mainDrawerExpanded: action.payload.expand };
    
    case EXPAND_CONTEXTDRAWER:
      return { ...state, contextDrawerExpanded: action.payload.expand };

    case COLLAPSE_CONTEXTDRAWER:
      return { ...state, contextDrawerExpanded: action.payload.expand };

    default:
      return state;
  }
};
export default layoutReducer;
