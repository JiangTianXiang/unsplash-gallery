import axios from "axios";
import { Dispatch } from "react";
import { getSearchUrl } from "utils";
import { ActionType } from "./searchPhoto.enum";
import { IAction } from "./searchPhoto.types";

export const getSearchResult =
  (searchInput: string, page: number) =>
  async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({
        type: ActionType.SEARCH_FETCH_DATA_PENDING,
      });
      const response = await axios(
        getSearchUrl({
          query: searchInput,
          page,
        })
      );
      dispatch({
        type: ActionType.SEARCH_FETCH_DATA_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: ActionType.SEARCH_FETCH_DATA_ERROR,
      });
      console.log(err);
    }
  };

export const resetState = () => {
  return (dispatch: Dispatch<IAction>) => {
    dispatch({
      type: ActionType.RESET_STATE,
    });
  };
};

export const incrementPage = () => {
  return (dispatch: Dispatch<IAction>) => {
    dispatch({
      type: ActionType.INCREMENT_PAGE,
    });
  };
};
