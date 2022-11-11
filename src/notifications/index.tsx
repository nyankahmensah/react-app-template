import { FC, ReactNode, useEffect } from "react"
import { isSupported, MessagePayload } from "firebase/messaging";
import toast from "react-hot-toast";
import Toaster from "./toaster";
import { getPushToken, onMessageListener } from "./utils";
import { setPushToken } from "apollo/cache/auth";

const NotificationProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  useEffect(() => {
    isSupported().then(hasSupport => {
      if (hasSupport) {
        getPushToken().then(token => {
          // Track the token -> client mapping, by sending to backend server
          // show on the UI that permission is secured
          setPushToken(token)
        });
      }
    })
  }, [])

  onMessageListener().then((payload: MessagePayload) => {
    toast(JSON.stringify({ type: "notification", title: payload.notification?.title, description: payload.notification?.body }))
    console.log(payload);
  }).catch(err => console.log('failed: ', err));

  return (
    <div>
      {children}
      <Toaster />
    </div>
  )
}

export default NotificationProvider;