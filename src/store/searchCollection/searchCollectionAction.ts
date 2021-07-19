import axios from "axios";
import { Dispatch } from "react";
import { getSearchUrl } from "utils";
import { ActionType } from "./searchCollection.enum";
import { IAction } from "./searchCollection.types";

export const getSearchCollectionResult =
  (searchInput: string, page: number) =>
  async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({
        type: ActionType.SEARCH_FETCH_COLLECTION_PENDING,
      });
      const response = await axios(
        getSearchUrl({
          query: searchInput,
          isPhoto: false,
          page,
        })
      );
      dispatch({
        type: ActionType.SEARCH_FETCH_COLLECTION_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: ActionType.SEARCH_FETCH_COLLECTION_ERROR,
      });
      console.log(err);
    }
  };

export const resetCollectionState = () => {
  return (dispatch: Dispatch<IAction>) => {
    dispatch({
      type: ActionType.RESET_STATE,
    });
  };
};

export const incrementCollectionPage = () => {
  return (dispatch: Dispatch<IAction>) => {
    dispatch({
      type: ActionType.INCREMENT_PAGE,
    });
  };
};
