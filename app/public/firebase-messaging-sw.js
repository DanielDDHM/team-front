// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

/* eslint-disable no-undef */

const firebaseConfig = {
  apiKey: "AIzaSyATIQj7XOn_MLUrMssne_hEdzWIYtXrL94",
  authDomain: "osae-dcce8.firebaseapp.com",
  projectId: "osae-dcce8",
  storageBucket: "osae-dcce8.appspot.com",
  messagingSenderId: "442234009384",
  appId: "1:442234009384:web:2868ee325adbc8502c021d",
  measurementId: "G-2YGSNXCXPR",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

