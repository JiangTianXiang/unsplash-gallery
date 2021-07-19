import { ActionType } from "./favoriteFeed.enum";

interface IFetchSuccessAction {
  type: ActionType.FETCH_FAVORITE_FEED_SUCCESS;
  payload: Array<object>;
}


interface IFetchErrorAction {
  type: ActionType.FETCH_FAVORITE_FEED_ERROR;
}

export type IAction =
  | IFetchSuccessAction
  | IFetchErrorAction;
