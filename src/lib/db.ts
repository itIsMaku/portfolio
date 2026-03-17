import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const DB_PATH = path.join(process.cwd(), "data", "visitors.db");

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!db) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.exec(`
      CREATE TABLE IF NOT EXISTS visits (
        ip TEXT PRIMARY KEY,
        first_visit INTEGER NOT NULL DEFAULT (unixepoch()),
        last_visit INTEGER NOT NULL DEFAULT (unixepoch())
      )
    `);
  }
  return db;
}

export function recordVisit(ip: string): number {
  const database = getDb();
  database
    .prepare(
      `INSERT INTO visits (ip) VALUES (?)
       ON CONFLICT(ip) DO UPDATE SET last_visit = unixepoch()`,
    )
    .run(ip);
  const row = database
    .prepare("SELECT COUNT(*) as count FROM visits")
    .get() as { count: number };
  return row.count;
}

export function getVisitorCount(): number {
  const database = getDb();
  const row = database
    .prepare("SELECT COUNT(*) as count FROM visits")
    .get() as { count: number };
  return row.count;
}
