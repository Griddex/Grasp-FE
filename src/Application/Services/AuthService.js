import axios from "axios";

export const post = (...args) => {
  const [url, data, config] = args;

  return axios.post(url, data, config);
};
