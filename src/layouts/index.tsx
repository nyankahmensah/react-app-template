import _ from "lodash";
import { FC } from "react";
import { useMatches } from "react-location";
import AppLayout from "./app";
import AuthLayout from "./auth";
import _404Layout from "./_404";

const LayoutProvider: FC = () => {
  const matches = useMatches()
  const meta = _.last(matches)?.route?.meta

  switch(meta?.layout) {
    case "App": {
      return <AppLayout />
    }
    case "Auth": {
      return <AuthLayout />
    }
    default: {
      return <_404Layout />
    }
  }
}

export default LayoutProvider