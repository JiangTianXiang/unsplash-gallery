import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import feed from "./feed/feedReducer";
import searchPhoto from "./searchPhoto/searchReducer";
import searchCollection from "./searchCollection/searchCollectionReducer";
import exploreFeed from "./exploreFeed/exploreFeedReducer";
import userFeed from "./userFeed/userFeedReducer";
import reduxTrunk from "redux-thunk";

const reducers = combineReducers({
  feed,
  searchPhoto,
  searchCollection,
  exploreFeed,
  userFeed,
});

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
