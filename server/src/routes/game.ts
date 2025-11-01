import { Router } from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../lib/db";
import { Question } from "../types/question";

export const gameRouter = Router();

/** Aktív játékállapotok – memóriában tároljuk */
let activeGames: Record<string, { total: number; correct: number }> = {};

/** Új játék indítása */
gameRouter.post("/start", (req, res) => {
  const gameId = Math.random().toString(36).substring(2, 9);
  activeGames[gameId] = { total: 0, correct: 0 };
  res.json({ gameId });
});

/** Egy kérdés megválaszolása és ellenőrzése */
gameRouter.post("/check", async (req, res) => {
  try {
    const { gameId, id, answerIndex } = req.body as {
      gameId?: string;
      id?: string;
      answerIndex?: number;
    };

    if (!gameId || !id || !Number.isInteger(answerIndex)) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    if (!(gameId in activeGames)) {
      return res.status(404).json({ error: "Game not found" });
    }

    const db = getDb();
    const q = await db
      .collection<Question>("questions")
      .findOne(
        { _id: new ObjectId(id) },
        { projection: { correctIndex: 1, options: 1 } }
      );

    if (!q) return res.status(404).json({ error: "Question not found" });

    const correct = q.correctIndex === answerIndex;
    const correctAnswer = q.options[q.correctIndex];

    // Frissítsük a játék állapotát
    const g = activeGames[gameId];
    g.total++;
    if (correct) g.correct++;

    return res.json({
      correct,
      correctAnswer,
      stats: { total: g.total, correct: g.correct },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

/** Eredmény összegzés */
gameRouter.get("/summary/:id", (req, res) => {
  const id = req.params.id;
  const g = activeGames[id];
  if (!g) return res.status(404).json({ error: "Game not found" });

  const percent = g.total > 0 ? Math.round((g.correct / g.total) * 100) : 0;
  res.json({ total: g.total, correct: g.correct, percent });
});
