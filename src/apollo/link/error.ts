import { onError } from "@apollo/client/link/error";
import { SentryLink, excludeGraphQLFetch } from 'apollo-link-sentry';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import config from "config";

Sentry.init({
  dsn: config.sentry.dsn,
  integrations: [new Integrations.BrowserTracing({
    traceFetch: false
  })],
  beforeBreadcrumb: excludeGraphQLFetch,
  enabled: config.env === "production",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

const sentryMiddleware = new SentryLink({
  uri: config.apollo.uri,
  setTransaction: true,
  setFingerprint: true,
})

const errorMiddleware = onError((errors) => {
  if (errors.graphQLErrors)
    errors.graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (errors.networkError) console.log(`[Network error]: ${errors.networkError}`);
  Sentry.captureException(errors)
}).split(
  () => config.env === "production",
  sentryMiddleware
)

export default errorMiddleware;