import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxTrunk from "redux-thunk";
import feed from "./feed/feedReducer";
import searchPhoto from "./searchPhoto/searchReducer";
import searchCollection from "./searchCollection/searchCollectionReducer";
import exploreFeed from "./exploreFeed/exploreFeedReducer";
import userFeed from "./userFeed/userFeedReducer";
import favoriteFeed from "./favoriteFeed/favoriteFeedReducer";
import collectionFeed from "./collectionFeed/collectionFeedReducer";
import topicFeed from "./topicFeed/topicReducer";
import showcaseFeed from "./showcaseFeed/showcaseReducer";

const reducers = combineReducers({
  feed,
  searchPhoto,
  searchCollection,
  exploreFeed,
  userFeed,
  collectionFeed,
  favoriteFeed,
  topicFeed,
  showcaseFeed,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(reduxTrunk))
);
export default store;
