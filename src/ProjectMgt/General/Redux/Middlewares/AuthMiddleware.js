export const authMiddleware = (store) => (next) => (action) => {
  if (action.payload.addAuth) {
  }
  return next(action);
};
