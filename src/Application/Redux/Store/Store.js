import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./../Reducers/RootReducer";
import createSagaMiddleware from "redux-saga";
import watchLoginSaga from "../Sagas/LoginSaga";
import authMiddleware from "./../Middleware/AuthMiddleware";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(authMiddleware, sagaMiddleware))
);

sagaMiddleware.run(watchLoginSaga);

export default store;
