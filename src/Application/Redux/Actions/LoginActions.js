export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const loginAction = (companyIdentifier, userName, password) => {
  return {
    type: LOGIN_REQUEST,
    payload: {
      companyIdentifier,
      userName,
      password,
    },
    meta: { addAuth: false },
  };
};

export const loginSuccessAction = () => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token: null,
    },
    meta: { addAuth: false },
  };
};

export const loginFailureAction = () => {
  return {
    type: LOGIN_FAILURE,
    payload: {
      errors: [],
    },
    meta: { addAuth: false },
  };
};
