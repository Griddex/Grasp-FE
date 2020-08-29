export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const registerAction = (
  firstName,
  middleName,
  lastName,
  userName,
  role,
  mobileNumber,
  password,
  confirmPassword
) => {
  return {
    type: REGISTER_REQUEST,
    payload: {
      firstName,
      middleName,
      lastName,
      userName,
      role,
      mobileNumber,
      password,
      confirmPassword,
    },
    meta: { addAuth: true },
  };
};

export const registerSuccessAction = () => {
  return {
    type: REGISTER_SUCCESS,
    payload: {
      success: true,
    },
    meta: { addAuth: false },
  };
};

export const registerFailureAction = () => {
  return {
    type: REGISTER_FAILURE,
    payload: {
      success: false,
    },
    meta: { addAuth: false },
  };
};
