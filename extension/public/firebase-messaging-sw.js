importScripts("./firebase-app-compact.js");
importScripts("./firebase-messaging-compact.js");

const firebaseConfig = {
  apiKey: import.meta.VITE_FB_API_KEY,
  authDomain: import.meta.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.VITE_FB_APP_ID,
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
  // console.log(action);
  
  if (action === "mark-as-done") {
    // Make API call to mark as done
    fetch(`http://localhost:3000/api/reminders/${action}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "completed" }),
    });
  }
  event.notification.close();
});
