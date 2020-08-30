import { useSelector } from "react-redux";

const authMiddleware = () => (next) => (action) => {
  const falsies = [null, undefined, false, ""];
  if (falsies.some((value) => value === action.meta)) return next(action);

  if (action.meta.addAuth) {
    const authToken = useSelector((state) => state.loginReducer.authToken);

    const { payload } = action;
    const actionAuth = {
      ...action,
      payload: {
        ...payload,
        authHeaders: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Accept-Language": "en-US, en;q=0.8",
          Authorization: `Bearer ${authToken}`,
        },
      },
    };
    return next(actionAuth);
  }
};

export default authMiddleware;
