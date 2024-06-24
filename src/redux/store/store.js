import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootReducer from "../reducers/rootReducer";
import { thunk } from "redux-thunk";
import logger from "redux-logger";

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
);

export default store;
