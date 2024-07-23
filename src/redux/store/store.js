import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootReducer from "../reducers/rootReducer";
import { thunk } from "redux-thunk";
import { createLogger } from "redux-logger";

const logger = createLogger({
    // Burada logger konfigürasyonunu yapabilirsiniz
    collapsed: true,
  });

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
);

export default store;
