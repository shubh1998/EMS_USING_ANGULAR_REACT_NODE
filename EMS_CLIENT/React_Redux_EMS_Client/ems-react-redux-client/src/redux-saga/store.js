import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from "redux-saga";
import reducer from './redux'
import saga from './saga'

const sagaMiddleware = createSagaMiddleware();
const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    thunk: false,
  }).concat(sagaMiddleware)

const store = configureStore({
  reducer,
  middleware,
});

sagaMiddleware.run(saga);

export default store;