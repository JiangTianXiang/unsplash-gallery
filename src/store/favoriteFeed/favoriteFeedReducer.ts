import { ActionType } from "./favoriteFeed.enum";
import { splitFavoriteToColumns, IFavoriteFeed } from "store/threeColumn.types";
import { IAction } from "./favoriteFeed.types";
const initialState = {
  data: [],
  renderObject: [
    { key: Math.random(), images: [] },
    { key: Math.random(), images: [] },
    { key: Math.random(), images: [] },
  ],
  hasError: false,
};

export const FETCH_FAVORITE_FEED_SUCCESS = "FETCH_FAVORITE_FEED_SUCCESS";
export const FETCH_FAVORITE_FEED_ERROR = "FETCH_FAVORITE_FEED_ERROR";

function favoriteFeedReducer(
  state: IFavoriteFeed = initialState,
  action: IAction
) {
  switch (action.type) {
    case ActionType.FETCH_FAVORITE_FEED_SUCCESS:
      const newData = action.payload;
      const newRenderObject = [
        { key: Math.random(), images: [] },
        { key: Math.random(), images: [] },
        { key: Math.random(), images: [] },
      ];
      return {
        ...state,
        data: newData ? [...newData] : [],
        renderObject: splitFavoriteToColumns(newRenderObject, action.payload),
        hasError: false,
      };
    case ActionType.FETCH_FAVORITE_FEED_ERROR:
      return {
        ...state,
        hasError: true,
      };
    default:
      return state;
  }
}

export default favoriteFeedReducer;
