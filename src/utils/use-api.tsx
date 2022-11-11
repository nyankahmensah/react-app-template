import axios, { AxiosInstance } from "axios";
import toast from "react-hot-toast";
import { currentTokenVar } from "apollo/cache/auth";
import config from "config";

export default function useApi(): AxiosInstance {

  const assasin = axios.create({
    baseURL: config.apollo.uri.replace("graphql", ""),
    // timeout: 5000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Accept": "application/json"
    }
  });

  assasin
    .interceptors
    .request
    .use(
      function (config) {
        let authorization = currentTokenVar();
        if (authorization) {
          config = {
            ...config,
            headers: {
              ...config.headers,
              authorization
            }
          };
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

  assasin
    .interceptors
    .response
    .use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.message === "Network Error") {
          toast(JSON.stringify({type: "error", title: "Network connection lost. Connect and try again"}));
          return;
        }
        else if (error.response.status === 401
          || error.response.data.response === "Sorry, we couldn't verify your identity. Please try again"
          || error.response.data.response === "Please attach authorization token to your headers"
        ) {
          toast(JSON.stringify({type: "error", title: error.response.data.response}));
        }
        return Promise.reject(error);
      }
    );

  return assasin
}