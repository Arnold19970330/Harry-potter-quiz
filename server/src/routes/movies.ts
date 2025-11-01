import { Router } from "express";
import { getDb } from "../lib/db";
import { Movie } from "../types/movie";

export const moviesRouter = Router();

moviesRouter.get("/", async (_req, res) => {
  const db = getDb();
  const movies = await db.collection<Movie>("movies").find().sort({ _id: 1 }).toArray();
  res.json(movies);
});

moviesRouter.post("/seed", async (_req, res) => {
  const db = getDb();
  const existing = await db.collection("movies").countDocuments();
  if (existing > 0) return res.status(400).json({ error: "Már vannak filmek" });

  const movies: Movie[] = [
    { _id: 1, title: "Harry Potter és a Bölcsek köve", year: 2001 },
    { _id: 2, title: "Harry Potter és a Titkok Kamrája", year: 2002 },
    { _id: 3, title: "Harry Potter és az Azkabani fogoly", year: 2004 },
    { _id: 4, title: "Harry Potter és a Tűz Serlege", year: 2005 },
    { _id: 5, title: "Harry Potter és a Főnix Rendje", year: 2007 },
    { _id: 6, title: "Harry Potter és a Félvér Herceg", year: 2009 },
    { _id: 7, title: "Harry Potter és a Halál ereklyéi – I. rész", year: 2010 },
    { _id: 8, title: "Harry Potter és a Halál ereklyéi – II. rész", year: 2011 },
  ];

  await db.collection<Movie>("movies").insertMany(movies);
  res.json({ inserted: movies.length });
});
