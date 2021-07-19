import { ActionType } from "./collectionFeed.enum";

interface IFetchSuccessAction {
  type: ActionType.FETCH_COLLECTION_FEED_SUCCESS;
  payload: Array<object>;
}

interface IResetFeedAction {
  type: ActionType.RESET_COLLECTION_STATE;
}

interface IFetchPendingAction {
  type: ActionType.FETCH_COLLECTION_FEED_PENDING;
}

interface IFetchErrorAction {
  type: ActionType.FETCH_COLLECTION_FEED_ERROR;
}

interface IIncrementPageAction {
  type: ActionType.INCREMENT_COLLECTION_PAGE;
}

interface IFetchDetailSuccessAction {
  type: ActionType.FETCH_COLLECTION_DETAIL_SUCCESS;
  payload: Array<object>;
}

interface IFetchDetailPendingAction {
  type: ActionType.FETCH_COLLECTION_DETAIL_PENDING;
}

export type IAction =
  | IFetchSuccessAction
  | IFetchErrorAction
  | IResetFeedAction
  | IFetchPendingAction
  | IIncrementPageAction
  | IFetchDetailSuccessAction
  | IFetchDetailPendingAction;
