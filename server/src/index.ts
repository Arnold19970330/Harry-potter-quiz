import express from "express";
import cors from "cors";
import { PORT } from "./lib/env";
import { connectToDb, pingDb } from "./lib/db";
import { questionsRouter } from "./routes/questions";

const app = express();
app.use(cors());
app.use(express.json());

// health endpoint
app.get("/health", async (_req, res) => {
  const dbOk = await pingDb();
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    ok: true,
    db: dbOk,
    time: new Date().toISOString(),
    uptimeSeconds: Math.round(process.uptime()),
  });
});

app.use("/questions", questionsRouter);

async function main() {
  await connectToDb(); // induláskor kapcsolódunk a Mongo-hoz
  app.listen(PORT, () => {
    console.log(`API ready: http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Server start failed:", err);
  process.exit(1);
});
