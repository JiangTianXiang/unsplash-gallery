import axios from "axios";
import { getUrl } from "utils";
import { Dispatch } from "redux";
import { ActionType } from "./exploreFeed.enum";
import { IAction } from "./exploreFeed.types";

export const getExploreFeed =
  (page: number) => async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({
        type: ActionType.FETCH_EXPLORE_FEED_PENDING,
      });
      const response = await axios(getUrl({ page }));
      dispatch({
        type: ActionType.FETCH_EXPLORE_FEED_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: ActionType.FETCH_EXPLORE_FEED_ERROR,
      });
      console.log(err);
    }
  };

export const resetState = () => {
  return (dispatch: Dispatch<IAction>) => {
    dispatch({
      type: ActionType.RESET_EXPLORE_STATE,
    });
  };
};

export const incrementPage = () => {
  return (dispatch: Dispatch<IAction>) => {
    dispatch({
      type: ActionType.INCREMENT_EXPLORE_PAGE,
    });
  };
};
