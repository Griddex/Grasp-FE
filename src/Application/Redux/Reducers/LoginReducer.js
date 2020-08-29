import loginState from "../State/LoginState";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "./../Actions/LoginActions";

const loginReducer = (state = loginState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      const { companyIdentifier, userName, password } = action.payload;
      return {
        ...state,
        companyIdentifier,
        userName,
        password,
      };
    case LOGIN_SUCCESS:
      const { token } = action.payload;
      return {
        ...state,
        authToken: token,
      };
    case LOGIN_FAILURE:
      const { errors } = action.payload;
      return {
        ...state,
        errors: new Array(errors),
      };
    default:
      return state;
  }
};

export default loginReducer;
