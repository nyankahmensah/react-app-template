import _ from "lodash";
import { rankRoutes } from "react-location-rank-routes";
import { RouteProps } from "./routes";

export const withPermissions =
  (permissions: string[]) => (routes: RouteProps[]) => {
    return _.filter(routes, (route) =>
      route?.withPermissions && route?.withPermissions.length > 0
        ? _.intersection(route?.withPermissions, permissions).length > 0
        : true
    );
  };

/**
 *
 * @param permissions permissions associated with the current user. pass this if you are using permissions
 * @returns a list of filtered routes
 */
const filterRoutes = (permissions?: string[]) => {
  return _.flow([
    rankRoutes,
    ...(permissions ? [withPermissions(permissions ?? [])] : []),
  ]);
};

export default filterRoutes;
