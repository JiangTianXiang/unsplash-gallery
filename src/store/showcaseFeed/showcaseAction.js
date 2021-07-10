import axios from "axios";
import { getCollectionUrl } from "utils";
import {
  SHOWCASE_FETCH_FEED_PENDING,
  SHOWCASE_FETCH_FEED_SUCCESS,
  SHOWCASE_FETCH_FEED_ERROR,
  RESET_SHOWCASE_STATE,
  INCREMENT_SHOWCASE_PAGE,
} from "./showcaseReducer";

const MAX_SHOWCASE = 5;
export const getShowcaseFeed = () => async (dispatch) => {
  try {
    dispatch({
      type: SHOWCASE_FETCH_FEED_PENDING,
    });
    const response = await axios(
      getCollectionUrl({
        isPhoto: "",
        numberOfRequest: MAX_SHOWCASE,
      })
    );
    dispatch({
      type: SHOWCASE_FETCH_FEED_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: SHOWCASE_FETCH_FEED_ERROR,
    });
    console.log(err);
  }
};

export const resetState = () => {
  return {
    type: RESET_SHOWCASE_STATE,
  };
};

export const incrementPage = () => {
  return {
    type: INCREMENT_SHOWCASE_PAGE,
  };
};
