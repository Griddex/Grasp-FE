export const SHOW_IMPORTMODULES = "SHOW_IMPORTMODULES";
export const HIDE_IMPORTMODULES = "HIDE_IMPORTMODULES";

export const importModulesOpenAction = () => ({
  type: SHOW_IMPORTMODULES,
  payload: { open: true },
});

export const importModulesCloseAction = () => ({
  type: HIDE_IMPORTMODULES,
  payload: { open: false },
});
