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
  maxPage: 0,
  totalResult: 0,
};

export const SEARCH_FETCH_DATA_SUCCESS = "SEARCH_FETCH_DATA_SUCCESS";
export const SEARCH_FETCH_DATA_PENDING = "SEARCH_FETCH_DATA_PENDING";
export const SEARCH_FETCH_DATA_ERROR = "SEARCH_FETCH_DATA_ERROR";
export const RESET_STATE = "RESET_STATE";
export const INCREMENT_PAGE = "INCREMENT_PAGE";

const splitDataToColumns = (currentRenderObject, newData) => {
  const newRenderObject = [...currentRenderObject];
  let counter = 0;

  while (counter < newData.length) {
    newRenderObject[counter % 3].images.push(newData[counter]);
    counter++;
  }
  return newRenderObject;
};

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_STATE:
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
    case INCREMENT_PAGE:
      return { ...state, page: state.page + 1 };
    case SEARCH_FETCH_DATA_SUCCESS:
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
    case SEARCH_FETCH_DATA_PENDING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case SEARCH_FETCH_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    default:
      return state;
  }
}

export default searchReducer;

export const getPage = (state) => state.searchPhoto.page;
