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
};

export const FETCH_COLLECTION_FEED_SUCCESS = "FETCH_COLLECTION_FEED_SUCCESS";
export const FETCH_COLLECTION_FEED_PENDING = "FETCH_COLLECTION_FEED_PENDING";
export const FETCH_COLLECTION_FEED_ERROR = "FETCH_COLLECTION_FEED_ERROR";
export const RESET_COLLECTION_STATE = "RESET_COLLECTION_STATE";
export const INCREMENT_COLLECTION_PAGE = "INCREMENT_COLLECTION_PAGE";

const splitDataToColumns = (currentRenderObject, newData) => {
  const newRenderObject = [...currentRenderObject];
  let counter = 0;

  while (counter < newData.length) {
    newRenderObject[counter % 3].images.push(newData[counter]);
    counter++;
  }
  return newRenderObject;
};

function collectionFeedReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_COLLECTION_STATE:
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
    case INCREMENT_COLLECTION_PAGE:
      return { ...state, page: state.page + 1 };
    case FETCH_COLLECTION_FEED_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload],
        renderObject: splitDataToColumns(state.renderObject, action.payload),
        isLoading: false,
        hasError: false,
      };
    case FETCH_COLLECTION_FEED_PENDING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case FETCH_COLLECTION_FEED_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    default:
      return state;
  }
}

export default collectionFeedReducer;

export const getPage = (state) => state.collectionFeed.page;
