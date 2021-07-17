import { ActionType } from "./exploreFeed.enum";

interface IFetchSuccessAction {
  type: ActionType.FETCH_EXPLORE_FEED_SUCCESS;
  payload: Array<object>;
}

interface IResetFeedAction {
  type: ActionType.RESET_EXPLORE_STATE;
}

interface IFetchPendingAction {
  type: ActionType.FETCH_EXPLORE_FEED_PENDING;
}
interface IFetchErrorAction {
  type: ActionType.FETCH_EXPLORE_FEED_ERROR;
}
interface IIncrementPageAction {
  type: ActionType.INCREMENT_EXPLORE_PAGE;
}

export type IAction =
  | IFetchSuccessAction
  | IFetchErrorAction
  | IResetFeedAction
  | IFetchPendingAction
  | IIncrementPageAction;