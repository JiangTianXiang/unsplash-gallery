const initialState = {
  data: [],
  hasError: false,
  isLoading: false,
  page: 1,
};

export const SHOWCASE_FETCH_FEED_SUCCESS = "SHOWCASE_FETCH_FEED_SUCCESS";
export const SHOWCASE_FETCH_FEED_PENDING = "SHOWCASE_FETCH_FEED_PENDING";
export const SHOWCASE_FETCH_FEED_ERROR = "SHOWCASE_FETCH_FEED_ERROR";
export const RESET_SHOWCASE_STATE = "RESET_SHOWCASE_STATE";
export const INCREMENT_SHOWCASE_PAGE = "INCREMENT_SHOWCASE_PAGE";

function topicReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_SHOWCASE_STATE:
      return {
        ...state,
        data: [],
        page: 1,
      };
    case INCREMENT_SHOWCASE_PAGE:
      return { ...state, page: state.page + 1 };
    case SHOWCASE_FETCH_FEED_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload],
        isLoading: false,
        hasError: false,
      };
    case SHOWCASE_FETCH_FEED_PENDING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case SHOWCASE_FETCH_FEED_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    default:
      return state;
  }
}

export default topicReducer;
