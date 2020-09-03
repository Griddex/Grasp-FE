import { call, put, takeLatest } from "redux-saga/effects";
import * as authService from "../../../Application/Services/AuthService";
import {
  failureSavePolicyAction,
  SAVE_POLICY,
  successSavePolicyAction,
} from "./../Actions/PayrollActions";
import {
  hideSpinnerAction,
  showSpinnerAction,
} from "./../Actions/UISpinnerActions";

export default function* watchSavePayPolicySaga() {
  yield takeLatest(SAVE_POLICY, savePayPolicySaga);
}

function* savePayPolicySaga(action) {
  yield put(showSpinnerAction("Saving pay policy..."));

  const {
    payload: { policyData },
  } = action;
  const {
    policyOwner,
    policyOrigin,
    policyAudience,
    policyName,
    policyStatement,
    policyInitiator,
    policyAssurance,
  } = policyData;

  const data = {
    policyOwner,
    policyOrigin,
    policyAudience,
    policyName,
    policyStatement,
    policyInitiator,
    policyAssurance,
  };

  const savePolicyAPI = (url) => authService.post(url, data, config);

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
