const axios = require("axios");

export default function callRestApi(url, method, data) {
  const instance = axios.create({
    baseURL: "https://some-domain.com/api/",
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
  });
}
