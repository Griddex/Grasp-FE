import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./../Reducers/RootReducer";
import createSagaMiddleware from "redux-saga";
import watchLoginSaga from "../Sagas/LoginSaga";
import watchSavePayPolicySaga from "../../../HRMgt/Redux/Sagas/SavePayPolicySaga";
import authMiddleware from "./../Middleware/AuthMiddleware";
import { spawn } from "redux-saga/effects";

function* rootSaga() {
  yield spawn(watchLoginSaga);
  yield spawn(watchSavePayPolicySaga);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(authMiddleware, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
