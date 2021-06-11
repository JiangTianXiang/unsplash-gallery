export const getUrl = (isPhoto, isRandom, numberOfRequest) => {
  const base = process.env.REACT_APP_ENDPOINT;
  const apiKey = process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY;
  const type = isPhoto ? "/photos" : "/collections";
  const random = isRandom ? "/random" : "";
  return `${base}${type}${random}/?client_id=${apiKey}&count=${numberOfRequest}`;
};

export const getSearchUrl = ({
  isPhoto = true,
  query,
  numberOfRequest = 30,
}) => {
  const base = process.env.REACT_APP_ENDPOINT;
  const apiKey = process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY;
  const type = isPhoto ? "/photos" : "/collections";
  return `${base}/search/${type}?client_id=${apiKey}&query=${query}&per_page=${numberOfRequest}`;
};
