import axios from "axios";
import { getUserUrl } from "utils";
import {
  FETCH_USER_FEED_PENDING,
  FETCH_USER_FEED_SUCCESS,
  FETCH_USER_FEED_ERROR,
  RESET_USER_STATE,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_COLLECTION_SUCCESS,
  FETCH_USER_COLLECTION_PENDING,
  getPage,
  INCREMENT_USER_PAGE,
} from "./userFeedReducer";

export const getUserInfo = (name) => async (dispatch, getState) => {
  try {
    const response = await axios(
      getUserUrl({
        page: getPage(getState()),
        isPhoto: false,
        userName: name,
      })
    );
    dispatch({
      type: FETCH_USER_INFO_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_USER_FEED_ERROR,
    });
    console.log(err);
  }
}

export const getUserCollection = (name) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_USER_COLLECTION_PENDING,
    });
    const response = await axios(
      getUserUrl({
        page: getPage(getState()),
        isPhoto: "collections",
        userName: name,
      })
    );
    dispatch({
      type: FETCH_USER_COLLECTION_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_USER_FEED_ERROR,
    });
    console.log(err);
  }
}

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
