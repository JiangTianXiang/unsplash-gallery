import axios from "axios";
import { Dispatch } from "redux";
import { getUrl } from "utils";
import { IAction } from "./feedActionInterface";
import { ActionType } from "./feedActionTypes";

export const getData = (page: number) => async (dispatch: Dispatch<IAction>) => {
  try {
    dispatch({
      type: ActionType.FEED_FETCH_DATA_PENDING,
    });
    const response = await axios(
      getUrl({
        isRandom: false,
        numberOfRequest: 9,
        page,
      })
    );
    dispatch({
      type: ActionType.FEED_FETCH_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: ActionType.FEED_FETCH_DATA_ERROR,
    });
    console.log(err);
  }
};

export const resetState = () => {
  return (dispatch: Dispatch<IAction>) => {
    dispatch({
      type: ActionType.RESET_FEED_STATE,
    });
  };
};

export const incrementPage = () => {
  return (dispatch: Dispatch<IAction>) => {
    dispatch({
      type: ActionType.INCREMENT_FEED_PAGE,
    });
  };
};
