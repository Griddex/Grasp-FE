import axios from "axios";
import qs from "qs";

export const post = (...args) => {
  const [url, data, config] = args;

  return axios.post(url, data, config);
};
