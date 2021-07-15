import { ActionType } from "./feedActionTypes";

interface IFetchSuccessAction {
  type: ActionType.FEED_FETCH_DATA_SUCCESS;
  payload: Array<object>;
}

interface IResetFeedAction {
  type: ActionType.RESET_FEED_STATE;
  payload: Array<object>;
}

interface IFetchPendingAction {
  type: ActionType.FEED_FETCH_DATA_PENDING;
  payload: Array<object>;
}
interface IFetchErrorAction {
  type: ActionType.FEED_FETCH_DATA_ERROR;
  payload: Array<object>;
}
interface IIncrementPageAction {
  type: ActionType.INCREMENT_FEED_PAGE;
  payload: Array<object>;
}

export type IAction =
  | IFetchSuccessAction
  | IFetchErrorAction
  | IResetFeedAction
  | IFetchPendingAction
  | IIncrementPageAction;
