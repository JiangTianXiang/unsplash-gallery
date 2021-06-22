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
}) => {
  const base = process.env.REACT_APP_ENDPOINT;
  const apiKey = process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY;
  const pages = page ? `&page=${page}` : "";
  const user = userName ? `${userName}` : "";
  return `${base}/users/${user}/photos/?client_id=${apiKey}&per_page=${numberOfRequest}${pages}`;
};

export const getCollectionUrl = ({
  numberOfRequest = 30,
  page = 1,
  collectionId = null,
}) => {
  const base = process.env.REACT_APP_ENDPOINT;
  const apiKey = process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY;
  return `${base}/collections/${collectionId}/photos/?client_id=${apiKey}&per_page=${numberOfRequest}&page=${page}`;
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

export const saveFavoriteImage = (item) => {
  localStorage.setItem(item.id, JSON.stringify(item));
};

export const removeFavoriteImage = (item) => {
  localStorage.removeItem(item.id);
};

export const getAllFavoriteImage = () => {
  const values = [];
  const keys = Object.keys(localStorage);
  let i = keys.length;

  while (i--) {
    values.push(JSON.parse(localStorage.getItem(keys[i])));
  }

  return values;
};
