export const getUrl = ({
  isPhoto = true,
  isRandom = true,
  numberOfRequest = 30,
  page = 1,
  userName = null,
}) => {
  const base = process.env.REACT_APP_ENDPOINT;
  const apiKey = process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY;
  const type = isPhoto ? "/photos" : "/collections";
  const random = isRandom ? "/random" : "";
  const pages = page ? `&page=${page}` : "";
  const user = userName ? `&username=${userName}` : "";
  return `${base}${type}${random}/?client_id=${apiKey}&count=${numberOfRequest}${pages}${user}`;
};

export const getSearchUrl = ({
  isPhoto = true,
  query,
  numberOfRequest = 30,
  page = 1,
}) => {
  const base = process.env.REACT_APP_ENDPOINT;
  const apiKey = process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY;
  const type = isPhoto ? "/photos" : "/collections";
  return `${base}/search/${type}?client_id=${apiKey}&query=${query}&per_page=${numberOfRequest}&page=${page}`;
};

export const getUserUrl = ({
  numberOfRequest = 30,
  page = null,
  userName = null,
  isPhoto = "photos",
}) => {
  const base = process.env.REACT_APP_ENDPOINT;
  const apiKey = process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY;
  const pages = page ? `&page=${page}` : "";
  const user = userName ? `${userName}` : "";
  const type = isPhoto ? `/${isPhoto}` : "";
  return `${base}/users/${user}${type}/?client_id=${apiKey}&per_page=${numberOfRequest}${pages}`;
};

export const getCollectionUrl = ({
  numberOfRequest = 30,
  page = 1,
  collectionId = null,
  isPhoto = '/photos',
}) => {
  const base = process.env.REACT_APP_ENDPOINT;
  const apiKey = process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY;
  let collection = "";
  if (collectionId != null) {
    collection = `/${collectionId}`;
  }
  return `${base}/collections${collection}${isPhoto}/?client_id=${apiKey}&per_page=${numberOfRequest}&page=${page}`;
};

export const getTopicUrl = ({
  numberOfRequest = 30,
  page = 1,
  topic = null,
  isPhoto = true,
}) => {
  const base = process.env.REACT_APP_ENDPOINT;
  const apiKey = process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY;
  const type = isPhoto ? `/photos` : "";
  return `${base}/topics/${topic}${type}/?client_id=${apiKey}&per_page=${numberOfRequest}&page=${page}`;
};

function timeDifference(elapsed) {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return "approximately " + Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return "approximately " + Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return "approximately " + Math.round(elapsed / msPerYear) + " years ago";
  }
}

export const getDiffInTime = (givenDate) => {
  const currentTime = new Date();
  const givenTime = new Date(givenDate);
  const diff = timeDifference(currentTime - givenTime);
  return diff;
};

export const IMAGE_KEY = "images";
export const saveFavoriteImage = (item) => {
  let imageStore = {};
  if (localStorage.getItem(IMAGE_KEY) !== null) {
    imageStore = JSON.parse(localStorage.getItem(IMAGE_KEY));
  }
  imageStore[item.id] = item;
  localStorage.setItem(IMAGE_KEY, JSON.stringify(imageStore));
};

export const removeFavoriteImage = (id) => {
  const imageStore = JSON.parse(localStorage.getItem(IMAGE_KEY));
  delete imageStore[`${id}`];
  localStorage.setItem(IMAGE_KEY, JSON.stringify(imageStore));
};

export const imageExistInLocalStorage = (id) => {
  const storedItems = localStorage.getItem(IMAGE_KEY);
  if (!storedItems) {
    return false;
  }
  const imageStore = JSON.parse(storedItems);
  return imageStore.hasOwnProperty(id);
};

export const getLocalStorageWithKey = (key) => {
  const storedItems = localStorage.getItem(key);
  if (!storedItems) {
    return null;
  }
  return Object.values(JSON.parse(storedItems));
};

export const TOPIC_KEY = "topics";
export const saveTopic = (item) => {
  let topicStore = {};
  if (localStorage.getItem(TOPIC_KEY) !== null) {
    topicStore = JSON.parse(localStorage.getItem(TOPIC_KEY));
  }
  topicStore[item.id] = item;
  localStorage.setItem(TOPIC_KEY, JSON.stringify(topicStore));
};

export const removeTopic = (id) => {
  const topicStore = JSON.parse(localStorage.getItem(TOPIC_KEY));
  delete topicStore[`${id}`];
  localStorage.setItem(TOPIC_KEY, JSON.stringify(topicStore));
};

export const topicExistInLocalStorage = (id) => {
  const storedItems = localStorage.getItem(TOPIC_KEY);
  if (!storedItems) {
    return false;
  }
  const topicStore = JSON.parse(storedItems);
  return topicStore.hasOwnProperty(id);
};

export const formatTopic = (searchTerm) => {
  return searchTerm.replace(/[\W_]+/g, "-");
};
