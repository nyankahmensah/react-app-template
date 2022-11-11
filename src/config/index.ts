import packageJson from "./../../package.json";
import firebaseConfig from "./firebase";

if(process.env.NODE_ENV === "production") {
  const variables = [
    "REACT_APP_APOLLO_URI",
    "REACT_APP_SENTRY_DSN"
  ];
  for(let variable of variables) {
    if(!process.env[variable]) {
      throw new Error(`Kindly Provide Variable ${variable} In Env`)
    }
  }
}

interface Config {
  env: ("production" | "development" | "test");
  name: string;
  apollo: {
    uri: string;
    name: string;
    version: string;
  };
  sentry: {
    dsn: string;
  },
  cookies: {
    domain: string;
    secure: boolean; 
    sameSite: "strict" | "Strict" | "lax" | "Lax" | "none" | "None";
  },
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
    vapidKey: string;
  }
}

const config: Config = {
  env: process.env.NODE_ENV,
  name: packageJson.name,
  apollo: {
    uri: process.env.REACT_APP_APOLLO_URI??"https://48p1r2roz4.sse.codesandbox.io",
    name: packageJson.name,
    version: packageJson.version
  },
  sentry: {
    dsn: process.env.REACT_APP_SENTRY_DSN??"https://examplePublicKey@o0.ingest.sentry.io/0"
  },
  cookies: {
    domain: process.env.REACT_APP_DOMAIN??"nyankahmensah.com",
    secure: true,
    sameSite: "strict",
  },
  firebase: firebaseConfig
}

export default config;