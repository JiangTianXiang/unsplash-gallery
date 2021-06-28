import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import feed from "./feed/feedReducer";
import searchPhoto from "./searchPhoto/searchReducer";
import searchCollection from "./searchCollection/searchCollectionReducer";
import reduxTrunk from "redux-thunk";

const reducers = combineReducers({ feed, searchPhoto, searchCollection });

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

export default createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxTrunk))
);
