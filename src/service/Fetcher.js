import axios from "axios";

export const Fetcher = (...args) =>
  axios
    .get(...args)
    .then((res) => res.data)
