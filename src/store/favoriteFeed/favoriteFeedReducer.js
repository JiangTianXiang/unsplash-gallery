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

const splitDataToColumns = (currentRenderObject, newData) => {
  const newRenderObject = [...currentRenderObject];
  let counter = 0;

  while (counter < newData.length) {
    newRenderObject[counter % 3].images.push(newData[counter]);
    counter++;
  }
  return newRenderObject;
};

function favoriteFeedReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FAVORITE_FEED_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload],
        renderObject: splitDataToColumns(
          state.renderObject,
          action.payload
        ),
        hasError: false,
      };
    case FETCH_FAVORITE_FEED_ERROR:
      return {
        ...state,
        hasError: true,
      };
    default:
      return state;
  }
}

export default favoriteFeedReducer;
