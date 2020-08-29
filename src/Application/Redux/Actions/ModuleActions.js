export const SHOW_MODULESVIEW = "SHOW_MODULESVIEW";
export const STORE_ACTIVEMODULE = "STORE_ACTIVEMODULE";
export const HIDE_MODULESVIEW = "HIDE_MODULESVIEW";

export const showModulesViewAction = () => ({
  type: SHOW_MODULESVIEW,
  payload: { show: true },
});

export const hideModulesViewAction = () => ({
  type: HIDE_MODULESVIEW,
  payload: { show: false },
});

export const storeModuleAction = (module) => ({
  type: STORE_ACTIVEMODULE,
  payload: { activeModule: module },
});
