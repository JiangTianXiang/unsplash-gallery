import axios from "axios";
import { getUrl } from "utils";
import {
  FEED_FETCH_DATA_PENDING,
  FEED_FETCH_DATA_SUCCESS,
  FEED_FETCH_DATA_ERROR,
  RESET_FEED_STATE,
  INCREMENT_FEED_PAGE,
  getPage,
} from "./feedReducer";

export const getData = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FEED_FETCH_DATA_PENDING,
    });
    const response = await axios(
      getUrl({
        isRandom: false,
        numberOfRequest: 9,
        page: getPage(getState()),
      })
    );
    dispatch({
      type: FEED_FETCH_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: FEED_FETCH_DATA_ERROR,
    });
    console.log(err);
  }
};

export const resetState = () => {
  return {
    type: RESET_FEED_STATE,
  };
};

export const incrementPage = () => {
  return {
    type: INCREMENT_FEED_PAGE,
  };
};
