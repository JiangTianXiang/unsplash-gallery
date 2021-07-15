import { ActionType } from "./feedActionTypes";

interface IFetchSuccessAction {
  type: ActionType.FEED_FETCH_DATA_SUCCESS;
  payload: Array<object>;
}

interface IResetFeedAction {
  type: ActionType.RESET_FEED_STATE;
}

interface IFetchPendingAction {
  type: ActionType.FEED_FETCH_DATA_PENDING;
}
interface IFetchErrorAction {
  type: ActionType.FEED_FETCH_DATA_ERROR;
}
interface IIncrementPageAction {
  type: ActionType.INCREMENT_FEED_PAGE;
}

export type IAction =
  | IFetchSuccessAction
  | IFetchErrorAction
  | IResetFeedAction
  | IFetchPendingAction
  | IIncrementPageAction;
