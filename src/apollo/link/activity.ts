import { ApolloLink } from "@apollo/client";

const activityMiddleware = new ApolloLink((operation, forward) => {
  // add the recent-activity custom header to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "recent-activity": localStorage.getItem("lastOnlineTime") || null,
    }
  }));

  return forward(operation);
})

export default activityMiddleware