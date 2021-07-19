import { IAction } from "./exploreFeed.types";
import { IThreeColumnFeed, splitDataToColumns } from "store/threeColumn.types";
import { ActionType } from "./exploreFeed.enum";

const initialState = {
  data: [],
  renderObject: [
    { key: Math.random(), images: [] },
    { key: Math.random(), images: [] },
    { key: Math.random(), images: [] },
  ],
  hasError: false,
  isLoading: false,
  page: 1,
  totalResult: 0,
  maxPage: 0,
};

function exploreFeedReducer(
  state: IThreeColumnFeed = initialState,
  action: IAction
) {
  switch (action.type) {
    case ActionType.RESET_EXPLORE_STATE:
      return {
        ...state,
        data: [],
        page: 1,
        renderObject: [
          { key: Math.random(), images: [] },
          { key: Math.random(), images: [] },
          { key: Math.random(), images: [] },
        ],
      };
    case ActionType.INCREMENT_EXPLORE_PAGE:
      return { ...state, page: state.page + 1 };
    case ActionType.FETCH_EXPLORE_FEED_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload],
        renderObject: splitDataToColumns(state.renderObject, action.payload),
        isLoading: false,
        hasError: false,
      };
    case ActionType.FETCH_EXPLORE_FEED_PENDING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case ActionType.FETCH_EXPLORE_FEED_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    default:
      return state;
  }
}

export default exploreFeedReducer;
