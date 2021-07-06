import axios from "axios";
import { getTopicUrl } from "utils";
import {
  TOPIC_FETCH_FEED_PENDING,
  TOPIC_FETCH_FEED_SUCCESS,
  TOPIC_FETCH_FEED_ERROR,
  TOPIC_FETCH_DETAIL_SUCCESS,
  TOPIC_FETCH_DETAIL_PENDING,
  RESET_TOPIC_STATE,
  getPage,
  INCREMENT_TOPIC_PAGE,
} from "./topicReducer";

export const getTopicDetails = (searchInput) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TOPIC_FETCH_DETAIL_PENDING,
    });
    const response = await axios(
      getTopicUrl({
        topic: searchInput,
        page: getPage(getState()),
        isPhoto: false,
      })
    );
    dispatch({
      type: TOPIC_FETCH_DETAIL_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: TOPIC_FETCH_FEED_ERROR,
    });
    console.log(err);
  }
};

export const getTopicFeed = (searchInput) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TOPIC_FETCH_FEED_PENDING,
    });
    const response = await axios(
      getTopicUrl({
        topic: searchInput,
        page: getPage(getState()),
      })
    );
    dispatch({
      type: TOPIC_FETCH_FEED_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: TOPIC_FETCH_FEED_ERROR,
    });
    console.log(err);
  }
};

export const resetState = () => {
  return {
    type: RESET_TOPIC_STATE,
  };
};

export const incrementPage = () => {
  return {
    type: INCREMENT_TOPIC_PAGE,
  };
};
