import React from "react";
import api from "../config/api";
import { Reminder } from "../types";

interface UpcomingRemindersProps {
  reminders: Reminder[];
  onChangeReminders: () => void;
}

const UpcomingReminders: React.FC<UpcomingRemindersProps> = ({
  reminders,
  onChangeReminders,
}) => {
  const deleteReminder = async (id: number): Promise<void> => {
    try {
      await api.delete(`/api/reminder/${id}`);
      onChangeReminders();
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  const markReminderAsComplete = async (id: number): Promise<void> => {
    try {
      await api.patch(`/api/reminder/${id}`, { status: "completed" });
      onChangeReminders();
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const truncateDescription = (
    description: string,
    maxLength: number = 50
  ): string => {
    return description.length > maxLength
      ? `${description.substring(0, maxLength)}...`
      : description;
  };

  return (
    <div className="space-y-4 mt-4 ">
      <h2 className="text-2xl font-bold mb-2">
        Upcoming ({reminders.length})🔥
      </h2>
      <div className={`${reminders.length ? "max-h-64" : "h-10"} overflow-y-auto custom-scrollbar`}>
      {reminders.length === 0 ? (
        <p className="text-gray-600">No upcoming reminders</p>
      ) : (
        reminders.map((reminder) => (
          <div
            key={reminder.id}
            className="relative custom-scrollbar flex justify-between items-start mb-3 p-4 rounded-lg border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            {reminder.status === "overdue" && (
              <div className="absolute top-0 left-0 bg-red-500 text-white text-xs rounded-lg pl-4 pr-3 py-1 transform  shadow-md"
                style={{
                  transform: 'rotate(-30deg) translateX(-25%) translateY(10%)'
                }}
              >
                Overdue
              </div>
            )}
            <div className="flex-grow">
              {reminder.links && reminder.links.length > 0 ? (
                <a
                  href={reminder.links[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-blue-600 hover:underline"
                >
                  {reminder.title}
                </a>
              ) : (
                <h3 className="text-lg font-medium">{reminder.title}</h3>
              )}
              <p className="text-sm text-gray-600 mt-1">
                {truncateDescription(reminder.description)}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {formatDate(reminder.dueDate)}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center space-y-2 w-20">
              <button
                onClick={() => deleteReminder(reminder.id)}
                aria-label="Delete reminder"
              >
                {/* <Trash2 size={20} /> */}
                🗑️
              </button>
              <div className="flex-grow"></div>
              <button
                onClick={() => markReminderAsComplete(reminder.id)}
                aria-label="Mark reminder as completed"
                className="text-sm text-blue-500 cursor-pointer hover:underline hover:underline-offset-1"
              >
                Mark as Completed
              </button>
            </div>
          </div>
        ))
      )}
      </div>
    </div>
  );
};

export default UpcomingReminders;
