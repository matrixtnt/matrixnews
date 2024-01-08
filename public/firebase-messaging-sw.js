importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js')
// // Initialize the Firebase app in the service worker by passing the generated config

const firebaseConfig = {
  apiKey: "AIzaSyC6-DZ3rX5H7RqzOdlq4alYsRKsUkU_F6I",
  authDomain: "news-9b899.firebaseapp.com",
  projectId: "news-9b899",
  storageBucket: "news-9b899.appspot.com",
  messagingSenderId: "1085975883181",
  appId: "1:1085975883181:web:7084701e5bd77855704524",
  measurementId: "G-5WV6VE3XFK"
}



firebase?.initializeApp(firebaseConfig)


// Retrieve firebase messaging
const messaging = firebase.messaging();

self.addEventListener('install', function (event) {
  // console.log('Hello world from the Service Worker :call_me_hand:');
});

// Handle background messages
self.addEventListener('push', function (event) {
  const payload = event.data.json();
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});