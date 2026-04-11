// Cluster entry point for high-load production deployments
// Spawns one worker per CPU core for maximum throughput

import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import { resolve } from "node:path";

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`[cluster] Primary ${process.pid} is running`);
  console.log(`[cluster] Spawning ${numCPUs} workers...`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker exits
  cluster.on("exit", (worker, code, signal) => {
    console.log(`[cluster] Worker ${worker.process.pid} died (code: ${code}, signal: ${signal})`);
    console.log(`[cluster] Forking a new worker...`);
    cluster.fork();
  });

  // Graceful shutdown
  process.on("SIGTERM", () => {
    console.log("[cluster] SIGTERM received. Shutting down gracefully...");
    for (const id in cluster.workers) {
      cluster.workers[id]!.process.kill("SIGTERM");
    }
    process.exit(0);
  });

  process.on("SIGINT", () => {
    console.log("[cluster] SIGINT received. Shutting down gracefully...");
    for (const id in cluster.workers) {
      cluster.workers[id]!.process.kill("SIGINT");
    }
    process.exit(0);
  });
} else {
  // Worker processes
  console.log(`[cluster] Worker ${process.pid} started`);
  
  // Import and start the main server
  const mainPath = resolve(__dirname, "index.js");
  import(mainPath).catch((err) => {
    console.error(`[cluster] Worker ${process.pid} failed to start:`, err);
    process.exit(1);
  });
}
