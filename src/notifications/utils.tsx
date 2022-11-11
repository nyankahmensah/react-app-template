import { getMessaging, getToken, onMessage, MessagePayload } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import config from "config";

// Initialize Firebase
const app = initializeApp(config.firebase);
const messaging = getMessaging(app);

export const getPushToken = () => {
  return new Promise((resolve, reject) => {
    getToken(messaging, { vapidKey: config.firebase.vapidKey }).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        resolve(currentToken);
      } else {
        console.log('No registration token available. Request permission to generate one.');
        reject()
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      reject(err)
    });
  })
}

export const onMessageListener = (): Promise<MessagePayload> =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});