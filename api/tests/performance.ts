import { Queue } from "bullmq";
import { performance } from "perf_hooks";

const reminderQueue = new Queue("reminders", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

async function addReminders(count: number) {
  const start = performance.now();

  for (let i = 0; i < count; i++) {
    await reminderQueue.add("reminder", {
      userId: `user${i % 1000}`,
      message: `Reminder ${i}`,
      time: new Date(Date.now() + 60000 + i * 1000), // Stagger reminders
    });
  }

  const end = performance.now();
  return end - start;
}

async function testQueuePerformance() {
  const batchSizes = [100, 1000, 10000, 100000];
  let totalRate = 0;

  for (const size of batchSizes) {
    const start = Date.now();
    for (let i = 0; i < size; i++) {
      await reminderQueue.add("reminder", { id: i });
    }
    const end = Date.now();
    const timeTaken = end - start;
    const rate = size / (timeTaken / 1000);
    totalRate += rate;
    console.log(`Time to add ${size} reminders: ${timeTaken.toFixed(2)}ms`);
    console.log(`Rate: ${rate.toFixed(2)} reminders/second`);

    // Clear the queue after each test
    await reminderQueue.obliterate({ force: true });
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  const averageRatePerSecond = totalRate / batchSizes.length;
  const averageRatePerMinute = averageRatePerSecond * 60;
  const averageRatePerDay = averageRatePerMinute * 60 * 24;

  console.log(
    `Average rate: ${averageRatePerSecond.toFixed(2)} reminders/second`,
  );
  console.log(
    `Average rate: ${averageRatePerMinute.toFixed(2)} reminders/minute`,
  );
  console.log(`Average rate: ${averageRatePerDay.toFixed(2)} reminders/day`);
}

async function main() {
  console.log("Starting BullMQ performance test...");
  await testQueuePerformance();
  console.log("Performance test completed.");

  // Close the queue connection
  await reminderQueue.close();
  process.exit(0);
}

main().catch(console.error);
