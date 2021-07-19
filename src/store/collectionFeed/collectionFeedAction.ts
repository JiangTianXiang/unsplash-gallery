import axios from "axios";
import { Dispatch } from "redux";
import { getCollectionUrl } from "utils";
import { IAction } from "./collectionFeed.types";
import { ActionType } from "./collectionFeed.enum";

export const getCollectionDetails =
  (id: string) => async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({
        type: ActionType.FETCH_COLLECTION_DETAIL_PENDING,
      });
      const response = await axios(
        getCollectionUrl({
          collectionId: id,
          isPhoto: "",
        })
      );
      dispatch({
        type: ActionType.FETCH_COLLECTION_DETAIL_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: ActionType.FETCH_COLLECTION_FEED_ERROR,
      });
      console.log(err);
    }
  };

export const getCollectionFeed =
  (id: string, page: number) => async (dispatch: Dispatch<IAction>) => {
    try {
      dispatch({
        type: ActionType.FETCH_COLLECTION_FEED_PENDING,
      });
      const response = await axios(
        getCollectionUrl({ collectionId: id, page })
      );
      dispatch({
        type: ActionType.FETCH_COLLECTION_FEED_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: ActionType.FETCH_COLLECTION_FEED_ERROR,
      });
      console.log(err);
    }
  };

export const resetState = () => {
  return (dispatch: Dispatch<IAction>) => {
    dispatch({
      type: ActionType.RESET_COLLECTION_STATE,
    });
  };
};

export const incrementPage = () => {
  return (dispatch: Dispatch<IAction>) => {
    dispatch({
      type: ActionType.INCREMENT_COLLECTION_PAGE,
    });
  };
};
