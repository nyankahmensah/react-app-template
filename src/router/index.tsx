import { FC } from "react";
import { ReactLocationDevtools } from 'react-location-devtools';
import { Router } from 'react-location'
import { gql, useQuery } from "@apollo/client";
import routes from "./routes";
import location from "./location";
import filterRoutes from "./filter";

const GET_ROOT = gql`
  query GetRoot {
    config @client {
      theme
    }
    me @client
  }
`

const RoutesProvider: FC = ({ children }) => {
  const { data } = useQuery(GET_ROOT);

  return (
    <div className={data?.config?.theme}>
      <Router location={location} routes={routes} filterRoutes={filterRoutes(data?.me?.permissions ?? [])}>
        <ReactLocationDevtools initialIsOpen={false} />
        {children}
      </Router>
    </div>
  )
}

export default RoutesProvider;