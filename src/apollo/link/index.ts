import { from, HttpLink } from "@apollo/client";
import config from "config";
import activityMiddleware from "./activity";
import analyticsMiddleware from "./analytics";
import authMiddleware from "./auth";
import errorMiddleware from "./error";
import persistedQueriesMiddleware from "./pq";
import retryMiddleware from "./retry";


const httpLink = new HttpLink({ uri: config.apollo.uri});

const link = from([
  authMiddleware,
  activityMiddleware,
  analyticsMiddleware,
  errorMiddleware,
  retryMiddleware,
  persistedQueriesMiddleware,
  httpLink,
])

export default link;