import { IState } from "interfaces/interfaces";
import { IAction } from "./feedActionInterface";
import { ActionType } from "./feedActionTypes";
const initialState = {
  data: [],
  hasError: false,
  page: 1,
  isLoading: false,
};

function feedReducer(state: IState = initialState, action: IAction) {
  switch (action.type) {
    case ActionType.RESET_FEED_STATE:
      return {
        ...state,
        data: [],
        page: 1,
      };
    case ActionType.INCREMENT_FEED_PAGE:
      return { ...state, page: state.page + 1 };
    case ActionType.FEED_FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: Array.from(new Set([...state.data, ...action.payload])),
        isLoading: false,
        hasError: false,
      };
    case ActionType.FEED_FETCH_DATA_PENDING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case ActionType.FEED_FETCH_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    default:
      return state;
  }
}

export default feedReducer;

export const getPage = (state: IState) => state.page;
