import app from "./app";
import { connectDatabase } from "./config/database";
import { initializeQueues, remindersQueue } from "./queues";
import { processReminders } from "./queues/workers/remindersWorker";
const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDatabase();
    initializeQueues();
    remindersQueue.process(processReminders);

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server!", err);
    process.exit(1);
  }
}

startServer();
