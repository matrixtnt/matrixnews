'use client'
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging'
import firebase from "firebase/compat/app"
import { getAuth } from "firebase/auth";
import { loadFcmToken } from 'src/store/reducers/settingsReducer';

const FirebaseData = () => {
  let firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
    measurementId: process.env.NEXT_PUBLIC_MESASUREMENTID
  }

  // eslint-disable-next-line
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  } else {
    firebase.app() // if already initialized, use that one
  }

  const app = initializeApp(firebaseConfig)

  const authentication = getAuth(app)

  // const messaging = getMessaging(app)

  const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
  
  const messagingIntance = () => {
    try {
      const isSupportedBrowser = isSupported();
      if (isSupportedBrowser) {
        return getMessaging(firebaseApp);
      }
      return null;
    } catch (err) {
      return null;
    }
  };
  
  // const fetchToken = async (setTokenFound, setFcmToken) => {
  //   return getToken(await messagingIntance, {
  //     vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
  //   })
  //     .then((currentToken) => {
  //       if (currentToken) {
  //         loadFcmToken(currentToken)
  //         setTokenFound(true);
  //         setFcmToken(currentToken);
  
  //         // Track the token -> client mapping, by sending to backend server
  //         // show on the UI that permission is secured
  //       } else {
  //         setTokenFound(false);
  //         setFcmToken();
  //         // shows on the UI that permission is required
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       // catch error while creating client token
  //     });
  // };
  
  // const onMessageListener = async () =>
  //   new Promise((resolve) =>
  //     (async () => {
  //       const messagingResolve = await messagingIntance;
  //       onMessage(messagingResolve, (payload) => {
  //         resolve(payload);
  //       });
  //     })()
  //   );

  const fetchToken = async (setTokenFound, setFcmToken) => {
    const messaging = await messagingIntance();
    if (!messaging) {
      console.error('Messaging not supported.');
      return;
    }

    try {
        getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
        })
          .then((currentToken) => {
            if (currentToken) {
              loadFcmToken(currentToken);
              setTokenFound(true);
              setFcmToken(currentToken);
            } else {
              setTokenFound(false);
              setFcmToken(null);
              toast.error('Permission is required to receive notifications.');
            }
          })
          .catch((err) => {
            console.error('Error retrieving token:', err);
          });
    } catch (err) {
      console.error('Error requesting notification permission:', err);
    }
  };

  const onMessageListener = async () => {
    const messaging = await messagingIntance();
    if (messaging) {
      return new Promise((resolve) => {
        onMessage(messaging, (payload) => {
          resolve(payload);
        });
      });
    } else {
      console.error('Messaging not supported.');
      return null;
    }
  };


  return { firebase, authentication, fetchToken, onMessageListener }
}

export default FirebaseData