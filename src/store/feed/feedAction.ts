import axios from "axios";
import { Dispatch } from "redux";
import { IState } from "interfaces/interfaces";
import { getUrl } from "utils";
import { ActionType } from "./feedActionTypes";

export const getData = () => async (dispatch: Dispatch, getState: IState) => {
  try {
    dispatch({
      type: ActionType.FEED_FETCH_DATA_PENDING,
    });
    const response = await axios(
      getUrl({
        isRandom: false,
        numberOfRequest: 10,
        // page: getPage(getState()),
        page: 1,
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
  return {
    type: ActionType.RESET_FEED_STATE,
  };
};

export const incrementPage = () => {
  return {
    type: ActionType.INCREMENT_FEED_PAGE,
  };
};
