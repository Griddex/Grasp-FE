export const SHOW_SPINNER = "[ui] show spinner";
export const HIDE_SPINNER = "[ui] hide spinner";

export const showSpinnerAction = () => ({
  type: SHOW_SPINNER,
  payload: { pending: true },
});

export const hideSpinnerAction = () => ({
  type: HIDE_SPINNER,
  payload: { pending: false },
});
