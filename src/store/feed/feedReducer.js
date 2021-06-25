const initialState = {
  data: [],
  hasError: false,
  page: 1,
  isLoading: false,
};

export const FEED_FETCH_DATA_SUCCESS = "FEED_FETCH_DATA_SUCCESS";
export const FEED_FETCH_DATA_PENDING = "FEED_FETCH_DATA_PENDING";
export const FEED_FETCH_DATA_ERROR = "FEED_FETCH_DATA_ERROR";

function feedReducer(state = initialState, action) {
  switch (action.type) {
    case FEED_FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload],
        page: state.page + 1,
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
