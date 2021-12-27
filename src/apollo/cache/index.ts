import { InMemoryCache } from "@apollo/client";
import { currentUserVar, isLoggedInVar } from "./auth";
import { currentThemeVar } from "./config";

const cache = new InMemoryCache({
  addTypename: true,
  resultCaching: true,
  possibleTypes: {

  },
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read: () => isLoggedInVar(),
        },
        me: {
          read: () => currentUserVar(),
        },
        config: {
          read: () => ({
            theme: currentThemeVar(),
          }),
        },
        // Add other policies here
        // entities: entitiesPolicy,
      }
    },
  }
})

export default cache;