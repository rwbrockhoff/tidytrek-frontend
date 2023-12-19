import axios from "axios";

export const tidyTrekAPI = axios.create({
  baseURL: "http://localhost:4001",
});
