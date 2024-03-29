import axios from "axios";

export const auth = axios.create({
  baseURL: "https://link-dev-blog.herokuapp.com/api/v1/auth/",
  headers: { "Content-type": "application/json" },
});

export const profile = axios.create({
  baseURL: "https://link-dev-blog.herokuapp.com/api/v1/profiles/",
  headers: { "Content-type": "application/json" },
});
export const user = axios.create({
  baseURL: "https://link-dev-blog.herokuapp.com/api/v1/users/",
  headers: { "Content-type": "application/json" },
});
export const post = axios.create({
  baseURL: "https://link-dev-blog.herokuapp.com/api/v1/posts/",
  headers: { "Content-type": "application/json" },
});
