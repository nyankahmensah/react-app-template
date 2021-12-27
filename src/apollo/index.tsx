import {
  ApolloClient,
  ApolloProvider as Provider,
} from "@apollo/client";
import { FC } from "react";
import cache from "./cache";
import schema from "./schema";
import link from "./link";
import config from "config";

const client = new ApolloClient({
  link: link,
  name: config.apollo.name,
  version: config.apollo.version,
  headers: {
    'client-name': config.apollo.name,
    'client-version': config.apollo.version,
  },
  cache: cache,
  typeDefs:  schema,
  connectToDevTools: config.env === "development"
});

const ApolloProvider: FC = ({children}) => {

  return (
    <Provider client={client}>
      {children}
    </Provider>
  )
}

export default ApolloProvider