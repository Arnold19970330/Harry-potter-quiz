import { Router } from "express";
import { getDb } from "../lib/db";
import { Question, NewQuestion } from "../types/question";
import { ObjectId } from "mongodb";
import { validateNewQuestion, parseLimit } from "../validation/questionValidator";

export const questionsRouter = Router();

/** POST /questions */
questionsRouter.post("/", async (req, res) => {
  try {
    const v = validateNewQuestion(req.body);
    if (!v.ok) {
      return res.status(422).json({ error: "Validation error", details: v.errors });
    }

    const body = req.body as NewQuestion;
    const doc: Question = { ...body, createdAt: new Date() };

    const db = getDb();
    const result = await db.collection<Question>("questions").insertOne(doc);
    return res.status(201).json({ insertedId: result.insertedId });
  } catch (err) {
    console.error("POST /questions error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

/** GET /questions?limit=10 */
questionsRouter.get("/", async (req, res) => {
  try {
    const limit = parseLimit(req.query.limit, 10, 1, 50);
    const db = getDb();
    const docs = await db.collection<Question>("questions").find().limit(limit).toArray();
    return res.json(docs);
  } catch (err) {
    console.error("GET /questions error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

questionsRouter.get("/random", async (req, res) => {
  try {
    const db = getDb();
    const docs = await db
      .collection<Question>("questions")
      .aggregate([
        { $sample: { size: 1 } },
        { $project: { text: 1, options: 1 } } 
      ])
      .toArray();

    if (!docs[0]) return res.status(404).json({ error: "No questions yet" });

    const q = docs[0];
    return res.json({ id: (q as any)._id.toString(), text: q.text, options: q.options });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

questionsRouter.get("/by-movie/:id", async (req, res) => {
  const movieId = Number(req.params.id);
  if (!movieId) return res.status(400).json({ error: "movieId invalid" });

  const db = getDb();
  const questions = await db
    .collection<Question>("questions")
    .aggregate([{ $match: { movieId } }, { $sample: { size: 1 } }])
    .toArray();

  if (questions.length === 0)
    return res.status(404).json({ error: "Nincs kérdés ehhez a filmhez" });

  const q = questions[0];
  res.json({
    id: q._id,
    text: q.text,
    options: q.options,
  });

});
