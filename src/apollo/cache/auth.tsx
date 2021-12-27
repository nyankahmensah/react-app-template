import { makeVar } from "@apollo/client";
import config from "config";

export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem(`${config.name}:auth:token`));
export const currentUserVar = makeVar<any>(JSON.parse(localStorage.getItem(`${config.name}:auth:user`)??"{}")??null);

export const setAuth = ({user, token}: any) => {
  currentUserVar(user);
  localStorage.setItem(`${config.name}:auth:user`, JSON.stringify(user));
  isLoggedInVar(true);
  localStorage.setItem(`${config.name}:auth:token`, token);
}

export const setMe = (user: any) => {
  currentUserVar(user)
  localStorage.setItem(`${config.name}:auth:user`, JSON.stringify(user))
}

export const clearAuth = () => {
  isLoggedInVar(false);
  console.log(isLoggedInVar())
  // TODO: handle extra checks for better user experience
  localStorage.clear()
}