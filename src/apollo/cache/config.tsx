import { makeVar } from "@apollo/client";
import Cookies from 'js-cookie'
import config from "config";

export enum Theme {
  Dark = "dark",
  Light = "light"
}

export const currentThemeVar = makeVar<Theme>((
  Cookies.get(`${config.name}:config:theme`) as Theme)
  ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.Dark : Theme.Light));

export const toggleTheme = () => {
  const currentTheme = currentThemeVar();
  const nextTheme = currentTheme === Theme.Dark ? Theme.Light : Theme.Dark;
  currentThemeVar(nextTheme);
  Cookies.set(`${config.name}:config:theme`, nextTheme, { ...config.cookies })
}