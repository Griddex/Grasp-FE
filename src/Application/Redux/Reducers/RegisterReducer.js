import registerState from "../State/RegisterState";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./../Actions/LoginActions";

const registerReducer = (state = registerState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      const {
        firstName,
        middleName,
        lastName,
        userName,
        role,
        mobileNumber,
        password,
        confirmPassword,
      } = action.payload;

      return {
        ...state,
        firstName,
        middleName,
        lastName,
        userName,
        role,
        mobileNumber,
        password,
        confirmPassword,
      };
    case REGISTER_SUCCESS:
      const { success } = action.payload;
      return {
        ...state,
        success,
      };
    case REGISTER_FAILURE:
      const { success } = action.payload;
      return {
        ...state,
        success,
        errors: new Array(errors),
      };
    default:
      return state;
  }
};

export default registerReducer;
