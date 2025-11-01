import { MongoClient, Db } from "mongodb";
import { MONGODB_URI } from "./env"; // itt validáltad Zod-dal

let client: MongoClient | null = null;
let db: Db | null = null;

/** Egyszer csatlakozik, utána újrahasznosítja a kapcsolatot */
export async function connectToDb(): Promise<Db> {
  if (db) return db;                           // már van
  client = new MongoClient(MONGODB_URI);       // ⬅️ globális client-et állítjuk
  await client.connect();
  db = client.db();                            // ha az URI végén nincs DB-név: db = client.db('hpquiz');
  return db;
}

/** Visszaadja a már csatlakoztatott DB-t */
export function getDb(): Db {
  if (!db) throw new Error("DB not connected. Call connectToDb() first.");
  return db;
}

/** Ping az admin DB-n – readiness check */
export async function pingDb(): Promise<boolean> {
  try {
    if (!client) await connectToDb();          // gondoskodunk a kapcsolatról
    await client!.db("admin").command({ ping: 1 });
    return true;
  } catch {
    return false;
  }
}

/** Lezárás (teszteknél jól jön) */
export async function disconnectDb(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}
