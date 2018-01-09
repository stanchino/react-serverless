import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "react-router-redux";

import rootReducer from "../reducers";
import rootSagas from "../sagas";

export default history => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, routerMiddleware(history)));

    rootSagas.forEach(sagaMiddleware.run);

    return store;
}