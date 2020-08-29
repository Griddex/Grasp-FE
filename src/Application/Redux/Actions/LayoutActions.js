export const EXPAND_MAINDRAWER = "EXPAND_MAINDRAWER";
export const COLLAPSE_MAINDRAWER = "COLLAPSE_MAINDRAWER";
export const SHOW_CONTEXTDRAWER = "SHOW_CONTEXTDRAWER";
export const HIDE_CONTEXTDRAWER = "HIDE_CONTEXTDRAWER";
export const EXPAND_CONTEXTDRAWER = "EXPAND_CONTEXTDRAWER";
export const COLLAPSE_CONTEXTDRAWER = "COLLAPSE_CONTEXTDRAWER";
export const SHOW_SUBNAVBAR = "SHOW_SUBNAVBAR";
export const HIDE_SUBNAVBAR = "HIDE_SUBNAVBAR";

export const mainDrawerExpandAction = () => ({
  type: EXPAND_MAINDRAWER,
  payload: { expand: true },
});

export const mainDrawerCollapseAction = () => ({
  type: COLLAPSE_MAINDRAWER,
  payload: { expand: false },
});

export const contextDrawerShowAction = () => ({
  type: SHOW_CONTEXTDRAWER,
  payload: { show: true },
});

export const contextDrawerHideAction = () => ({
  type: HIDE_CONTEXTDRAWER,
  payload: { show: false },
});

export const contextDrawerExpandAction = () => ({
  type: EXPAND_CONTEXTDRAWER,
  payload: { expand: true },
});

export const contextDrawerCollapseAction = () => ({
  type: COLLAPSE_CONTEXTDRAWER,
  payload: { expand: false },
});

export const subNavbarShowAction = () => ({
  type: SHOW_SUBNAVBAR,
  payload: { show: true },
});

export const subNavbarHideAction = () => ({
  type: HIDE_SUBNAVBAR,
  payload: { show: false },
});
