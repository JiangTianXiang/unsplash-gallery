import { ActionType } from "./searchPhoto.enum";

interface ISearchResult {
  results: Array<object>;
  total_pages: number;
  total: number;
}

interface IFetchSuccessAction {
  type: ActionType.SEARCH_FETCH_DATA_SUCCESS;
  payload: ISearchResult;
}

interface IResetFeedAction {
  type: ActionType.RESET_STATE;
}

interface IFetchPendingAction {
  type: ActionType.SEARCH_FETCH_DATA_PENDING;
}

interface IFetchErrorAction {
  type: ActionType.SEARCH_FETCH_DATA_ERROR;
}

interface IIncrementPageAction {
  type: ActionType.INCREMENT_PAGE;
}

export type IAction =
  | IFetchSuccessAction
  | IFetchErrorAction
  | IResetFeedAction
  | IFetchPendingAction
  | IIncrementPageAction;