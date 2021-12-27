import { Route } from "react-location";
import { DashboardPage, ResetPasswordPage, SettingsPage, SigninPage, SignupPage } from "pages";
import { CogIcon, HomeIcon } from "@heroicons/react/outline"

export type RouteProps = Route & {
  withPermissions?: string[];
  navigation?: boolean;
  layout?: ("App" | "Auth");
  sidebar?: {label: string; icon: any}
}

const routes: RouteProps[] = [
  {
    path: '/',
    element: <DashboardPage />,
    sidebar: {
      label: "Dashboard",
      icon: HomeIcon
    }, 
    meta: {
      layout: "App",
      breadcrumb: () => "Home"
    }
  },
  {
    path: '/settings',
    element: <SettingsPage />,
    sidebar: {
      label: "Settings",
      icon: CogIcon
    }, 
    meta: {
      layout: "App",
      breadcrumb: () => "Settings"
    }
  },



  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
    meta: {
      layout: "Auth",
      breadcrumb: () => "Reset Password"
    }
  },
  {
    path: '/signin',
    element: <SigninPage />,
    meta: {
      layout: "Auth",
      breadcrumb: () => "Signin"
    }
  },
  {
    path: '/signup',
    element: <SignupPage />,
    meta: {
      layout: "Auth",
      breadcrumb: () => "Signup"
    }
  },
]

export default routes;