import { getLocalStorageWithKey, IMAGE_KEY } from "utils/index.js";
import { ActionType } from "./favoriteFeed.enum";

export const getFavoriteFeed = () => {
  try {
    const favoriteImages = getLocalStorageWithKey(IMAGE_KEY);
    return {
      type: ActionType.FETCH_FAVORITE_FEED_SUCCESS,
      payload: favoriteImages,
    };
  } catch (err) {
    console.log(err);
    return {
      type: ActionType.FETCH_FAVORITE_FEED_ERROR,
    };
  }
};
