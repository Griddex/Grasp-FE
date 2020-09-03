export const SHOW_SPINNER = "[ui] show spinner";
export const HIDE_SPINNER = "[ui] hide spinner";

export const showSpinnerAction = (message) => ({
  type: SHOW_SPINNER,
  payload: { pending: true, message },
});

export const hideSpinnerAction = () => ({
  type: HIDE_SPINNER,
  payload: { pending: false },
});
