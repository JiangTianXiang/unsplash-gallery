import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import reduxTrunk from "redux-thunk";
import feed from "./feed/feedReducer";
import searchPhoto from "./searchPhoto/searchReducer";
import searchCollection from "./searchCollection/searchCollectionReducer";
import exploreFeed from "./exploreFeed/exploreFeedReducer";
import userFeed from "./userFeed/userFeedReducer";
import favoriteFeed from "./favoriteFeed/favoriteFeedReducer";
import collectionFeed from "./collectionFeed/collectionFeedReducer";

const reducers = combineReducers({
  feed,
  searchPhoto,
  searchCollection,
  exploreFeed,
  userFeed,
  collectionFeed,
  favoriteFeed
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
