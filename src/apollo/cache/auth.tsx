import { makeVar } from "@apollo/client";
import Cookies from 'js-cookie'
import config from "config";

export const isLoggedInVar = makeVar<boolean>(!!Cookies.get(`${config.name}:auth:token`));
export const currentTokenVar = makeVar<string | null>(Cookies.get(`${config.name}:auth:token`) || null);
export const currentUserVar = makeVar<any>(JSON.parse(Cookies.get(`${config.name}:auth:user`)??"{}")??null);
export const currentPushTokenVar = makeVar<string | null>(Cookies.get(`${config.name}:auth:push-token`) || null);

export const setAuth = ({user, token}: any) => {
  currentUserVar(user);
  Cookies.set(`${config.name}:auth:user`, JSON.stringify(user), { ...config.cookies});
  isLoggedInVar(true);
  currentTokenVar(token);
  Cookies.set(`${config.name}:auth:token`, token, { ...config.cookies, expires: 1 });
}

export const setMe = (user: any) => {
  currentUserVar(user)
  Cookies.set(`${config.name}:auth:user`, JSON.stringify(user), { ...config.cookies })
}

export const setPushToken = (token: any) => {
  currentPushTokenVar(token)
  Cookies.set(`${config.name}:auth:push-token`, token, { ...config.cookies })
}

export const clearAuth = () => {
  isLoggedInVar(false);
  currentTokenVar(null);
  // TODO: handle extra checks for better user experience
  Object.keys(Cookies.get()).forEach((key) => {
    Cookies.remove(key, { ...config.cookies })
  })
}