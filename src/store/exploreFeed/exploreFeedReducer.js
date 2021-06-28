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

export const FETCH_EXPLORE_FEED_SUCCESS = "FETCH_EXPLORE_FEED_SUCCESS";
export const FETCH_EXPLORE_FEED_PENDING = "FETCH_EXPLORE_FEED_PENDING";
export const FETCH_EXPLORE_FEED_ERROR = "FETCH_EXPLORE_FEED_ERROR";
export const RESET_EXPLORE_STATE = "RESET_EXPLORE_STATE";
export const INCREMENT_EXPLORE_PAGE = "INCREMENT_EXPLORE_PAGE";

const splitDataToColumns = (currentRenderObject, newData) => {
  const newRenderObject = [...currentRenderObject];
  let counter = 0;

  while (counter < newData.length) {
    newRenderObject[counter % 3].images.push(newData[counter]);
    counter++;
  }
  return newRenderObject;
};

const resetRenderObject = (renderObject) => {
  renderObject.map((column) => {
    column.images = [];
    return column;
  });
};

function exploreFeedReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case RESET_EXPLORE_STATE:
      resetRenderObject(initialState.renderObject);
      state = initialState;
      return initialState;
    case INCREMENT_EXPLORE_PAGE:
      return { ...state, page: state.page + 1 };
    case FETCH_EXPLORE_FEED_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload],
        renderObject: splitDataToColumns(
          state.renderObject,
          action.payload
        ),
        isLoading: false,
        hasError: false,
      };
    case FETCH_EXPLORE_FEED_PENDING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case FETCH_EXPLORE_FEED_ERROR:
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

export const getPage = (state) => state.exploreFeed.page;
