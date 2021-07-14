const initialState = {
  data: [],
  hasError: false,
  page: 1,
  isLoading: false,
};

export const FEED_FETCH_DATA_SUCCESS = "FEED_FETCH_DATA_SUCCESS";
export const FEED_FETCH_DATA_PENDING = "FEED_FETCH_DATA_PENDING";
export const FEED_FETCH_DATA_ERROR = "FEED_FETCH_DATA_ERROR";
export const RESET_FEED_STATE = "RESET_FEED_STATE";
export const INCREMENT_FEED_PAGE = "INCREMENT_FEED_PAGE";

function feedReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_FEED_STATE:
      return {
        ...state,
        data: [],
        page: 1,
      };
    case INCREMENT_FEED_PAGE:
      return { ...state, page: state.page + 1 };
    case FEED_FETCH_DATA_SUCCESS: 
      return {
        ...state,
        data: Array.from(new Set([...state.data, ...action.payload])),
        isLoading: false,
        hasError: false,
      };
    case FEED_FETCH_DATA_PENDING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case FEED_FETCH_DATA_ERROR:
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

export const getPage = (state) => state.feed.page;
