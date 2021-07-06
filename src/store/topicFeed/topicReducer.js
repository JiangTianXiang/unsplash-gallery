const initialState = {
  data: [],
  renderObject: [
    { key: Math.random(), images: [] },
    { key: Math.random(), images: [] },
    { key: Math.random(), images: [] },
  ],
  hasError: false,
  isLoading: false,
  loadingDetail: false,
  page: 1,
  detail: null,
};

export const TOPIC_FETCH_FEED_SUCCESS = "TOPIC_FETCH_FEED_SUCCESS";
export const TOPIC_FETCH_FEED_PENDING = "TOPIC_FETCH_FEED_PENDING";
export const TOPIC_FETCH_DETAIL_SUCCESS = "TOPIC_FETCH_DETAIL_SUCCESS";
export const TOPIC_FETCH_DETAIL_PENDING = "TOPIC_FETCH_DETAIL_PENDING";
export const TOPIC_FETCH_FEED_ERROR = "TOPIC_FETCH_FEED_ERROR";
export const RESET_TOPIC_STATE = "RESET_TOPIC_STATE";
export const INCREMENT_TOPIC_PAGE = "INCREMENT_TOPIC_PAGE";

const splitDataToColumns = (currentRenderObject, newData) => {
  const newRenderObject = [...currentRenderObject];
  let counter = 0;

  while (counter < newData.length) {
    newRenderObject[counter % 3].images.push(newData[counter]);
    counter++;
  }
  return newRenderObject;
};

function topicReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_TOPIC_STATE:
      return {
        ...state,
        data: [],
        page: 1,
        detail: null,
        renderObject: [
          { key: Math.random(), images: [] },
          { key: Math.random(), images: [] },
          { key: Math.random(), images: [] },
        ],
      };
    case INCREMENT_TOPIC_PAGE:
      return { ...state, page: state.page + 1 };
    case TOPIC_FETCH_DETAIL_PENDING:
      return { ...state, loadingDetail: true };
    case TOPIC_FETCH_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };
    case TOPIC_FETCH_FEED_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload],
        renderObject: splitDataToColumns(state.renderObject, action.payload),
        isLoading: false,
        hasError: false,
      };
    case TOPIC_FETCH_FEED_PENDING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case TOPIC_FETCH_FEED_ERROR:
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

export const getPage = (state) => state.topicFeed.page;
