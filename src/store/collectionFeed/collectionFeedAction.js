import axios from "axios";
import { getCollectionUrl } from "utils";
import {
  FETCH_COLLECTION_FEED_PENDING,
  FETCH_COLLECTION_FEED_SUCCESS,
  FETCH_COLLECTION_FEED_ERROR,
  RESET_COLLECTION_STATE,
  getPage,
  INCREMENT_COLLECTION_PAGE,
} from "./collectionFeedReducer";

export const getCollectionFeed = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_COLLECTION_FEED_PENDING,
    });
    const response = await axios(
      getCollectionUrl({ collectionId: id, page: getPage(getState()) })
    );
    dispatch({
      type: FETCH_COLLECTION_FEED_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_COLLECTION_FEED_ERROR,
    });
    console.log(err);
  }
};

export const resetState = () => {
  return {
    type: RESET_COLLECTION_STATE,
  };
};

export const incrementPage = () => {
  return {
    type: INCREMENT_COLLECTION_PAGE,
  };
};
