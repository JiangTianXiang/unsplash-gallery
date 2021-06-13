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
  const pages = (page === null) ? "" : `&page=${page}`;
  const user = (userName === null) ? "" : `&username=${userName}`;
  return `${base}${type}${random}/?client_id=${apiKey}&count=${numberOfRequest}${pages}${user}`;
};

export const getSearchUrl = ({
  isPhoto = true,
  query,
  numberOfRequest = 30,
  page = 1
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
  const pages = (page === null) ? "" : `&page=${page}`;
  const user = (userName === null) ? "" : `${userName}`;
  return `${base}/users/${user}/photos/?client_id=${apiKey}&per_page=${numberOfRequest}${pages}`;
};