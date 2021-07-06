const initialState = {
  data: [],
  renderObject: [
    { key: Math.random(), images: [] },
    { key: Math.random(), images: [] },
    { key: Math.random(), images: [] },
  ],
  hasError: false,
  isLoading: false,
  isCollectionLoading: false,
  user: null,
  userCollections: null,
  page: 1,
};

export const FETCH_USER_FEED_SUCCESS = "FETCH_USER_FEED_SUCCESS";
export const FETCH_USER_FEED_PENDING = "FETCH_USER_FEED_PENDING";
export const FETCH_USER_FEED_ERROR = "FETCH_USER_FEED_ERROR";
export const RESET_USER_STATE = "RESET_USER_STATE";
export const INCREMENT_USER_PAGE = "INCREMENT_USER_PAGE";
export const FETCH_USER_INFO_SUCCESS = "FETCH_USER_INFO_SUCCESS";
export const FETCH_USER_COLLECTION_PENDING = "FETCH_USER_COLLECTION_PENDING";
export const FETCH_USER_COLLECTION_SUCCESS = "FETCH_USER_COLLECTION_SUCCESS";

const splitDataToColumns = (currentRenderObject, newData) => {
  const newRenderObject = [...currentRenderObject];
  let counter = 0;

  while (counter < newData.length) {
    newRenderObject[counter % 3].images.push(newData[counter]);
    counter++;
  }
  return newRenderObject;
};

function userFeedReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_USER_STATE:
      return {
        ...state,
        data: [],
        user: null,
        collections: [],
        page: 1,
        renderObject: [
          { key: Math.random(), images: [] },
          { key: Math.random(), images: [] },
          { key: Math.random(), images: [] },
        ],
      };
    case INCREMENT_USER_PAGE:
      return { ...state, page: state.page + 1 };
    case FETCH_USER_INFO_SUCCESS:
      const {
        followers_count,
        following_count,
        portfolio_url,
        name,
        profile_image,
        total_photos,
      } = action.payload;
      return {
        ...state,
        user: {
          followers: followers_count,
          following: following_count,
          name: name,
          portfolioUrl: portfolio_url,
          profileImage: profile_image.large,
          totalPhotos: total_photos,
        },
      };
    case FETCH_USER_COLLECTION_PENDING:
      return {
        ...state,
        isCollectionLoading: true,
      };
    case FETCH_USER_COLLECTION_SUCCESS:
      return {
        ...state,
        userCollections: action.payload.filter((item) => item.cover_photo !== null),
        isCollectionLoading: false,
      };
    case FETCH_USER_FEED_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload],
        renderObject: splitDataToColumns(state.renderObject, action.payload),
        maxPage: action.payload.total_pages,
        isLoading: false,
        hasError: false,
      };
    case FETCH_USER_FEED_PENDING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case FETCH_USER_FEED_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        isCollectionLoading: false,
      };
    default:
      return state;
  }
}

export default userFeedReducer;

export const getPage = (state) => state.userFeed.page;
