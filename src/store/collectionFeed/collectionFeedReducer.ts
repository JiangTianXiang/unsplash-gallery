import { IAction } from "./collectionFeed.types";
import { IThreeColumnFeed, splitDataToColumns } from "store/threeColumn.types";
import { ActionType } from "./collectionFeed.enum";

const initialState = {
  data: [],
  renderObject: [
    { key: Math.random(), images: [] },
    { key: Math.random(), images: [] },
    { key: Math.random(), images: [] },
  ],
  hasError: false,
  isLoading: false,
  detailLoading: false,
  detail: [],
  page: 1,
  maxPage: 0,
};

function collectionFeedReducer(state: IThreeColumnFeed = initialState, action: IAction) {
  switch (action.type) {
    case ActionType.RESET_COLLECTION_STATE:
      return {
        ...state,
        data: [],
        detail: [],
        page: 1,
        renderObject: [
          { key: Math.random(), images: [] },
          { key: Math.random(), images: [] },
          { key: Math.random(), images: [] },
        ],
      };
    case ActionType.INCREMENT_COLLECTION_PAGE:
      return { ...state, page: state.page + 1 };
    case ActionType.FETCH_COLLECTION_DETAIL_PENDING:
      return { ...state, detailLoading: true };
    case ActionType.FETCH_COLLECTION_DETAIL_SUCCESS:
      return { ...state, detailLoading: false, detail: action.payload };
    case ActionType.FETCH_COLLECTION_FEED_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload],
        renderObject: splitDataToColumns(state.renderObject, action.payload),
        isLoading: false,
        hasError: false,
      };
    case ActionType.FETCH_COLLECTION_FEED_PENDING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case ActionType.FETCH_COLLECTION_FEED_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        detailLoading: false,
      };
    default:
      return state;
  }
}

export default collectionFeedReducer;
