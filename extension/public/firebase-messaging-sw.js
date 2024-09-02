importScripts("./firebase-app-compact.js");
importScripts("./firebase-messaging-compact.js");

const firebaseConfig = {
  apiKey: "AIzaSyBDy9dnG_86Tq6ryZMamI9gBqBitvT6eoc",
  authDomain: "socialblog-399312.firebaseapp.com",
  projectId: "socialblog-399312",
  storageBucket: "socialblog-399312.appspot.com",
  messagingSenderId: "697723929136",
  appId: "1:697723929136:web:5e7336703b1b679969a3f5",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icons/icon48.png",
    actions: [
      { action: "mark-as-done", title: "Mark as Done" },
      { action: "dismiss", title: "Dismiss" },
    ],
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  const action = event.action;
  if (action === "mark-as-done") {
    // Make API call to mark as done
    fetch("https://your-backend-server.com/api/mark-as-done", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notificationId: event.notification.data.id }),
    });
  } else if (action === "dismiss") {
    // Handle dismiss action
  }
  event.notification.close();
});
