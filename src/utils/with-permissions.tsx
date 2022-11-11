import { currentUserVar } from "apollo/cache/auth";
import _ from "lodash";

export default function withPermissions<T = any>(permissions: string[]) {
  const currentUser = currentUserVar();
  return (val: T): T | null =>  {
    if(permissions.length > 0) {
      if(_.intersection(permissions, currentUser?.permissions).length > 0) {
        return val
      }
      return null
    }
    return val
  }
}