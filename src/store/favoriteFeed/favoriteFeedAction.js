import { getAllFavoriteImage } from "utils/index.js";
import {
  FETCH_FAVORITE_FEED_SUCCESS,
  FETCH_FAVORITE_FEED_ERROR,
} from "./favoriteFeedReducer";

export const getFavoriteFeed = () => {
  try {
    const favoriteImages = getAllFavoriteImage();
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
