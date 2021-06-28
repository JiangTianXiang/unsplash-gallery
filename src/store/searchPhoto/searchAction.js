import axios from "axios";
import { getSearchUrl } from "utils";
import {
  SEARCH_FETCH_DATA_PENDING,
  SEARCH_FETCH_DATA_SUCCESS,
  SEARCH_FETCH_DATA_ERROR,
  RESET_STATE,
  getPage,
  INCREMENT_PAGE,
} from "./searchReducer";

export const getSearchResult = (searchInput) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEARCH_FETCH_DATA_PENDING,
    });
    const response = await axios(
      getSearchUrl({
        query: searchInput,
        page: getPage(getState()),
      })
    );
    dispatch({
      type: SEARCH_FETCH_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_FETCH_DATA_ERROR,
    });
    console.log(err);
  }
};

export const resetState = () => {
  return {
    type: RESET_STATE,
  };
};

export const incrementPage = () => {
  return {
    type: INCREMENT_PAGE,
  };
};
