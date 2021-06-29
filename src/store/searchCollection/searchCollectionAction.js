import axios from "axios";
import { getSearchUrl } from "utils";
import {
  SEARCH_FETCH_COLLECTION_PENDING,
  SEARCH_FETCH_COLLECTION_SUCCESS,
  SEARCH_FETCH_COLLECTION_ERROR,
  RESET_STATE,
  getPage,
  INCREMENT_PAGE,
} from "./searchCollectionReducer";

export const getSearchCollectionResult = (searchInput) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEARCH_FETCH_COLLECTION_PENDING,
    });
    const response = await axios(
      getSearchUrl({
        query: searchInput,
        isPhoto: false,
        page: getPage(getState()),
      })
    );
    dispatch({
      type: SEARCH_FETCH_COLLECTION_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_FETCH_COLLECTION_ERROR,
    });
    console.log(err);
  }
};

export const resetCollectionState = () => {
  return {
    type: RESET_STATE,
  };
};

export const incrementCollectionPage = () => {
  return {
    type: INCREMENT_PAGE,
  };
};
