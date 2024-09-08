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
    data: {
      reminderId: payload.data.reminderId
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  const action = event.action;
  const reminderId=event.notification.data.reminderId;
  console.log("Action clicked: ", action);
  console.log("Reminder Id: ", event.notification.data.reminderId);
  
  // const backendUrl="http://localhost:3000/api/reminders";
  const backendUrl="http://34.131.248.238/api/reminders";
  
  
  if (action === "mark-as-done") {
    fetch(`${backendUrl}/api/reminders/${reminderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "completed" }),
    });
  }
  event.notification.close();
});
