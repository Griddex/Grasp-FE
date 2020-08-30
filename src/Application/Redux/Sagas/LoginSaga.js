import { call, put, takeLatest } from "redux-saga/effects";
import * as authService from "../../Services/AuthService";
import history from "./../../Services/HistoryService";
import {
  loginFailureAction,
  loginSuccessAction,
  LOGIN_REQUEST,
} from "./../Actions/LoginActions";
import {
  hideSpinnerAction,
  showSpinnerAction,
} from "./../Actions/UISpinnerActions";

export default function* watchLoginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

function* loginSaga(action) {
  yield put(showSpinnerAction());

  const { payload } = action;
  const { companyIdentifier, userName, password } = payload;

  const data = {
    title: companyIdentifier,
    body: userName,
    password: password,
  };
  const config = { headers: null };
  const loginAPI = (url) => authService.post(url, data, config);

  try {
    const userToken = yield call(
      loginAPI,
      "https://jsonplaceholder.typicode.com/posts"
    );

    const successAction = loginSuccessAction();
    yield put({ ...successAction, payload: { ...payload, token: userToken } });

    yield call(forwardTo, "/grasp");
  } catch (errors) {
    const failureAction = loginFailureAction();
    yield put({ ...failureAction, payload: { ...payload, errors: errors } });
  }

  yield put(hideSpinnerAction());
  yield call(forwardTo, "/grasp");
}

function forwardTo(viewUrl) {
  history.push(viewUrl);
}
