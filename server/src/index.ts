import express from "express";
import cors from "cors";
import { PORT } from "./lib/env";
import { connectToDb, pingDb } from "./lib/db";
import { questionsRouter } from "./routes/questions";
import { moviesRouter } from "./routes/movies";
import { gameRouter } from "./routes/game";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/questions", questionsRouter);
app.use("/movies", moviesRouter);
app.use("/game", gameRouter);

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
