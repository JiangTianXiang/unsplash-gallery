import { getLocalStorageWithKey, IMAGE_KEY } from "utils/index.js";
import {
  FETCH_FAVORITE_FEED_SUCCESS,
  FETCH_FAVORITE_FEED_ERROR,
} from "./favoriteFeedReducer";

export const getFavoriteFeed = () => {
  try {
    const favoriteImages = getLocalStorageWithKey(IMAGE_KEY);
    return {
      type: FETCH_FAVORITE_FEED_SUCCESS,
      payload: favoriteImages,
    };
  } catch (err) {
    console.log(err);
    return {
      type: FETCH_FAVORITE_FEED_ERROR,
    };
  }
};
