import app from "./app";
import { connectDatabase } from "./config/database";
import { setupWorkers } from "./queues/workers/workerSetup";
import { reminderWorkerConfig } from "./queues/workers/remindersWorker";
const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDatabase();
    await setupWorkers([ reminderWorkerConfig ]);

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server!", err);
    process.exit(1);
  }
}

startServer();
