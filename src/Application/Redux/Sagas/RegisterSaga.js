import { call, put, takeLatest } from "redux-saga/effects";
import * as authService from "../../Services/AuthService";
import {
  registerFailureAction,
  registerSuccessAction,
  REGISTER_REQUEST,
} from "./../Actions/RegisterActions";
import {
  hideSpinnerAction,
  showSpinnerAction,
} from "./../Actions/UISpinnerActions";

export default function* watchRegisterSaga() {
  yield takeLatest(REGISTER_REQUEST, registerSaga);
}

function* registerSaga(action) {
  yield put(showSpinnerAction());

  const { payload } = action;
  const {
    firstName,
    middleName,
    lastName,
    userName,
    role,
    mobileNumber,
    password,
    confirmPassword,
    AuthHeaders,
  } = payload;

  const data = {
    title: firstName,
    body: lastName,
  };
  const config = { headers: authHeaders };
  const registerAPI = (url) => authService.post(url, data, config);

  try {
    const response = yield call(
      registerAPI,
      "https://jsonplaceholder.typicode.com/posts"
    );

    const successAction = registerSuccessAction();
    yield put({ ...successAction, payload: { ...payload, success: response } });
  } catch (errors) {
    const failureAction = registerFailureAction();

    yield put({
      ...failureAction,
      payload: { ...payload, success: response, errors: errors },
    });
  }

  yield put(hideSpinnerAction());
}
