import { useEffect, useState } from "react";
import api from "../config/api";

interface AddReminderProps {
  onAddReminder: () => void;
}

const AddReminder: React.FC<AddReminderProps> = ({ onAddReminder }) => {
  const [link, setLink] = useState("https://www.google.com");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [minTime, setMinTime] = useState("");
  const [includeUrl, setIncludeUrl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0];
    const currentTime = now.toTimeString().split(" ")[0].substring(0, 5);

    if (date === currentDate) {
      setMinTime(currentTime);
    } else {
      setMinTime("");
    }
  }, [date]);

  useEffect(() => {
    if (includeUrl) {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {

        setLink(tabs[0].url ?? '');
        setTitle(tabs[0].title ?? '');
        console.log(tabs[0].url);
        
      });
    } else {
      setLink('');
      // setTitle('');
    }
  }, [includeUrl]);

  const handleQuickSet = (minutes: number) => {
    const now = new Date();
    const future = new Date(now.getTime() + minutes * 60000);
    setDate(future.toISOString().split("T")[0]);
    setTime(future.toTimeString().split(" ")[0].slice(0, 5));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const reminderData = {
      title,
      description,
      links: includeUrl ? [{ url: link }] : [],
      dueDate: new Date(`${date}T${time}`).toISOString(),
    };

    try {
      if (!title || !date || !time) {
        throw new Error("Please fill out all required fields.");
      }

      const response = await api.post("/api/reminder", reminderData);
      // const response = await new Promise((resolve) => {
      //   setTimeout(resolve, 1000, { data: "Mock" });
      // });

      console.log("Reminder added:", response.data);
      setSuccess(`⭐ Reminder "${title}" added`);

      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
      setLink("");
      setIncludeUrl(false);

      onAddReminder();
    } catch (err) {
      console.error("Error adding reminder:", err);
      setError("❌ Failed to add reminder.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      {(success || error) && (
        <div
          className={`mb-2 p-3 rounded-md cursor-pointer ${
            success ? "bg-yellow-100" : "bg-red-100"
          }`}
          onClick={()=> { setSuccess(""); setError(""); }}
        >
          {success ? (
            <div className="flex items-center justify-center">
              <span>{success}</span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span>{error}</span>
            </div>
          )}
        </div>
      )}

      <div className="mb-3 flex items-center space-x-2">
        <input
          type="checkbox"
          id="includeUrl"
          checked={includeUrl}
          onChange={(e) => setIncludeUrl(e.target.checked)}
          className="ml-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label
          htmlFor="includeUrl"
          className="text-sm font-medium text-gray-700"
        >
          Include Tab URL
        </label>
      </div>
      <div className="mb-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Remind me to..."
          required
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Remind me why..."
        />
      </div>

      <div className="mb-3">
        <div className="flex space-x-4">
          <button
            onClick={() => handleQuickSet(30)}
            type="button"
            className="px-2 py-1 text-sm bg-blue-200 text-blue-500 rounded"
          >
            in 30min
          </button>
          <button
            onClick={() => handleQuickSet(60)}
            type="button"
            className="px-2 py-1 text-sm bg-blue-200 text-blue-500 rounded"
          >
            in 1hour
          </button>
          <button
            onClick={() => handleQuickSet(1440)}
            type="button"
            className="px-2 py-1 text-sm bg-blue-200 text-blue-500 rounded"
          >
            in 1day
          </button>
          <button
            onClick={() => handleQuickSet(10080)}
            type="button"
            className="px-2 py-1 text-sm bg-blue-200 text-blue-500 rounded"
          >
            in 1week
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <label
            htmlFor="when"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            When
          </label>
          <input
            type="date"
            id="when"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="at"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            At
          </label>
          <input
            type="time"
            id="at"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            min={minTime}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
      </div>

      {/* <div>repeat</div> */}

      <button
        type="submit"
        className="py-2 px-4 rounded-md text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:shadow-lg"
      >
        {isLoading ? "Adding Reminder..." : "Add Reminder"}
      </button>
    </form>
  );
};

export default AddReminder;
