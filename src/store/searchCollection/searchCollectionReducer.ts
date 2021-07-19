import { IThreeColumnFeed, splitDataToColumns } from "store/threeColumn.types";
import { IAction } from "./searchCollection.types";
import { ActionType } from "./searchCollection.enum";

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

function searchCollectionReducer(
  state: IThreeColumnFeed = initialState,
  action: IAction
) {
  switch (action.type) {
    case ActionType.RESET_STATE:
      return {
        ...state,
        data: [],
        page: 1,
        maxPage: 0,
        totalResult: 0,
        renderObject: [
          { key: Math.random(), images: [] },
          { key: Math.random(), images: [] },
          { key: Math.random(), images: [] },
        ],
      };
    case ActionType.INCREMENT_PAGE:
      return { ...state, page: state.page + 1 };
    case ActionType.SEARCH_FETCH_COLLECTION_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload.results],
        renderObject: splitDataToColumns(
          state.renderObject,
          action.payload.results
        ),
        maxPage: action.payload.total_pages,
        totalResult: action.payload.total,
        isLoading: false,
        hasError: false,
      };
    case ActionType.SEARCH_FETCH_COLLECTION_PENDING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case ActionType.SEARCH_FETCH_COLLECTION_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    default:
      return state;
  }
}

export default searchCollectionReducer;
