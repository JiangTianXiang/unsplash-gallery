import axios from "axios";
import { getUrl } from "utils";
import {
  FETCH_EXPLORE_FEED_PENDING,
  FETCH_EXPLORE_FEED_SUCCESS,
  FETCH_EXPLORE_FEED_ERROR,
  RESET_EXPLORE_STATE,
  getPage,
  INCREMENT_EXPLORE_PAGE,
} from "./exploreFeedReducer";

export const getExploreFeed = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_EXPLORE_FEED_PENDING,
    });
    const response = await axios(getUrl({ page: getPage(getState()) }));
    dispatch({
      type: FETCH_EXPLORE_FEED_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_EXPLORE_FEED_ERROR,
    });
    console.log(err);
  }
};

export const resetState = () => {
  return {
    type: RESET_EXPLORE_STATE,
  };
};

export const incrementPage = () => {
  return {
    type: INCREMENT_EXPLORE_PAGE,
  };
};
