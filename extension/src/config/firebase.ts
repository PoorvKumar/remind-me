import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBDy9dnG_86Tq6ryZMamI9gBqBitvT6eoc",
  authDomain: "socialblog-399312.firebaseapp.com",
  projectId: "socialblog-399312",
  storageBucket: "socialblog-399312.appspot.com",
  messagingSenderId: "697723929136",
  appId: "1:697723929136:web:5e7336703b1b679969a3f5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

export { messaging };
