import axios from "axios";
import { getUserUrl } from "utils";
import {
  FETCH_USER_FEED_PENDING,
  FETCH_USER_FEED_SUCCESS,
  FETCH_USER_FEED_ERROR,
  RESET_USER_STATE,
  getPage,
  INCREMENT_USER_PAGE,
} from "./userFeedReducer";

export const getUserFeed = (name) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_USER_FEED_PENDING,
    });
    const response = await axios(
      getUserUrl({
        page: getPage(getState()),
        userName: name,
      })
    );
    dispatch({
      type: FETCH_USER_FEED_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_USER_FEED_ERROR,
    });
    console.log(err);
  }
};

export const resetState = () => {
  return {
    type: RESET_USER_STATE,
  };
};

export const incrementPage = () => {
  return {
    type: INCREMENT_USER_PAGE,
  };
};
