import { ReactLocation, MakeGenerics } from "react-location";
import { parseSearch, stringifySearch } from "react-location-jsurl";

export type LocationGenerics = MakeGenerics<{
  Search: {
    redirect?: string
  }
}>;

const location = new ReactLocation({
  parseSearch,
  stringifySearch
})

export default location;