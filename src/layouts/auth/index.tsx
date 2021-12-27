import { useQuery } from "@apollo/client";
import { GET_AUTH_Q } from "layouts/app";
import { FC } from "react";
import { useSearch, MakeGenerics, Navigate, Outlet } from "react-location";

export type AuthLocationGenerics = MakeGenerics<{
  Search: {
    redirect?: string;
  }
}>

const AuthLayout: FC = () => {
  const search = useSearch<AuthLocationGenerics>()
  const { data, loading } = useQuery(GET_AUTH_Q);

  if (loading) {
    // show a loader here
    return <div>is validating token...</div>
  }
  else if (data?.isLoggedIn) {
    // check if theres a token
    // if yes hit server to reauthenticate and redirect to app
    return <Navigate
      to={search?.redirect??"/"}
      replace
    />
  }
  return (
    <div className="h-screen">
      <div className="min-h-full flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <Outlet />
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout;