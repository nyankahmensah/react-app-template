import { ApolloLink, ServerError } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

let authorization: string | null;

const authMiddleware = new ApolloLink((operation, forward) => {
  // check if token has been cached
  if (!authorization) {
    authorization = localStorage.getItem("token") || null;
  }
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...(authorization ? { authorization: authorization } : {}),
    },
  }));

  return forward(operation);
});

const resetAuthMiddleware = onError(({ networkError }) => {
  if (networkError) {
    if (
      networkError.name === "ServerError" &&
      (networkError as ServerError).statusCode === 401
    ) {
      authorization = null;
    }
  }
});

export default authMiddleware.concat(resetAuthMiddleware);
