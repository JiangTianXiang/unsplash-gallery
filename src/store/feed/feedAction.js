import axios from "axios";
import { getUrl } from "utils";
import {
  FEED_FETCH_DATA_PENDING,
  FEED_FETCH_DATA_SUCCESS,
  FEED_FETCH_DATA_ERROR,
  getPage,
} from "./feedReducer";

export const getData = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FEED_FETCH_DATA_PENDING,
    });
    const response = await axios(
      getUrl({
        isRandom: false,
        numberOfRequest: 10,
        page: getPage(getState()),
      })
    );
    dispatch({
      type: FEED_FETCH_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: FEED_FETCH_DATA_ERROR,
    });
    console.log(err);
  }
};
