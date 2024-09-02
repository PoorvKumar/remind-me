import { useEffect, useState } from "react";
import "./App.css";
import AddReminder from "./components/AddReminder";
import api from "./config/api";
import Auth from "./components/Auth";
import UpcomingReminders from "./components/UpcomingReminders";
import { Reminder, RemindersResponse } from "./types";
import { FaRegUserCircle } from "react-icons/fa";
import { messaging } from "./config/firebase";
import { getToken, onMessage } from "firebase/messaging";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  // firebase setup
  useEffect(()=>
  {
    const requestPermission = async () => {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY });
        if (token) {
          console.log('FCM Token:', token);
          await api.post("/api/user/fcm-token",{ fcmToken: token });
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      } else {
        console.log('Unable to get permission to notify.');
      }
    };

    requestPermission();

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
    });

  },[]);

  useEffect(() => {
    checkAuthStatus();
    fetchReminders();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await api.get("/api/auth/check-auth");
      if(response.status === 200)
      {
        setIsAuthenticated(true);
        fetchReminders();
      }
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReminders = async (): Promise<void> => {
    try {
      const response = await api.get<RemindersResponse>('/api/reminder');
      setReminders(response.data.reminders);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if(isLoading)
  {
    return <div className="text-center mt-8">Loading...</div>
  }

  return (
    <div className="mx-auto p-4 px-6 bg-white rounded-lg shadow-md custom-scrollbar">
      {isAuthenticated ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Remind Me</h1>
            <div className="relative group">
              <div className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                {/* <User className="h-6 w-6 text-gray-600" /> */}
                <FaRegUserCircle className="h-6 w-6 text-gray-600" />
              </div>
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <AddReminder onAddReminder={fetchReminders} />
          <UpcomingReminders reminders={reminders} onChangeReminders={fetchReminders} />
        </>
      ) : (
        <Auth onAuthSuccess={checkAuthStatus} />
      )}
    </div>
  );
}

export default App;
