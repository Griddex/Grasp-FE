import { call, put, takeLatest } from "redux-saga/effects";
import * as authService from "../../../Application/Services/AuthService";
import {
  failureSavePolicyAction,
  SAVE_POLICY,
  successSavePolicyAction,
} from "./../Actions/PayrollActions";
import {
  showSpinnerAction,
  hideSpinnerAction,
} from "./../../../Application/Redux/Actions/UISpinnerActions";

export default function* watchSavePayPolicySaga() {
  yield takeLatest(SAVE_POLICY, savePayPolicySaga);
}

function* savePayPolicySaga(action) {
  yield put(showSpinnerAction("Saving pay policy..."));

  yield new Promise(() => setTimeout(() => "Hello", 4000));

  const { payload } = action;
  const {
    payload: { policyData },
  } = action;

  // const data = {
  //   ...policyData
  // };
  const config = { headers: action.payload.authHeaders };
  const savePolicyAPI = (url) => authService.post(url, policyData, config);

  try {
    const result = yield call(
      savePolicyAPI,
      "https://jsonplaceholder.typicode.com/posts"
    );

    const successAction = successSavePolicyAction();
    yield put({ ...successAction, payload: { ...payload, result: result } });
  } catch (errors) {
    const failureAction = failureSavePolicyAction();
    yield put({ ...failureAction, payload: { ...payload, errors: errors } });
  }

  yield put(hideSpinnerAction());
}
