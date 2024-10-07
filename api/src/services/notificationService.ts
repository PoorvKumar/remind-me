import admin from "../config/firebase";
import { Reminder } from "../entity/Reminder";

export class NotificationService {
  public async sendNotification(
    fcmToken: string,
    reminder: Reminder,
  ): Promise<void> {
    const message = {
      notification: {
        title: reminder.title,
        body: reminder.description,
      },
      data: {
        reminderId: reminder.id.toString(),
      },
      token: fcmToken,
    };

    try {
      await admin.messaging().send(message);
      console.log("Notification sent for reminder:", reminder);
    } catch (err) {
      console.log("Error sending notification:", err);
    }
  }
}
