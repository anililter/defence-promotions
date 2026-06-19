import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';

const DB_DIR = path.join(process.cwd(), 'database');
const DB_PATH = path.join(DB_DIR, 'defence.db');

// Ensure database directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initializeSchema();
  }
  return db;
}

function initializeSchema() {
  const database = db;

  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'editor' CHECK(role IN ('admin', 'editor')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      subtitle TEXT,
      description TEXT,
      venue TEXT,
      city TEXT,
      event_date DATETIME,
      poster_url TEXT,
      ticket_url TEXT,
      status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('upcoming', 'past', 'draft')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS fights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      fighter1_name TEXT NOT NULL,
      fighter1_record TEXT,
      fighter1_photo TEXT,
      fighter1_country TEXT,
      fighter2_name TEXT NOT NULL,
      fighter2_record TEXT,
      fighter2_photo TEXT,
      fighter2_country TEXT,
      weight_class TEXT,
      is_main_event INTEGER NOT NULL DEFAULT 0,
      bout_order INTEGER NOT NULL DEFAULT 0,
      result TEXT
    );
  `);

  // Seed default admin if no users exist
  const userCount = database.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
  if (userCount.count === 0) {
    const passwordHash = bcrypt.hashSync('DefenceAdmin2025!', 10);
    database.prepare(
      'INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)'
    ).run('admin', passwordHash, 'admin');
    console.log('✅ Default admin user created: admin / DefenceAdmin2025!');
  }

  // Seed sample event if no events exist
  const eventCount = database.prepare('SELECT COUNT(*) as count FROM events').get() as { count: number };
  if (eventCount.count === 0) {
    const eventId = (database.prepare(`
      INSERT INTO events (slug, title, subtitle, description, venue, city, event_date, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'fight-night-1',
      'DEFENCE FIGHT NIGHT 1',
      'Kafes Kapısı Açılıyor',
      'İstanbul\'un kalbinde, en elit MMA savaşçıları kafeste buluşuyor. Türkiye MMA tarihinin en büyük gecesi başlıyor.',
      'Volkswagen Arena',
      'İstanbul',
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      'upcoming'
    )).lastInsertRowid;

    database.prepare(`
      INSERT INTO fights (event_id, fighter1_name, fighter1_record, fighter1_country, fighter2_name, fighter2_record, fighter2_country, weight_class, is_main_event, bout_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(eventId, 'AHMET YILMAZ', '12-2-0', 'TR', 'MEHMET KAYA', '10-3-0', 'TR', 'Welterweight (77 kg)', 1, 1);

    database.prepare(`
      INSERT INTO fights (event_id, fighter1_name, fighter1_record, fighter1_country, fighter2_name, fighter2_record, fighter2_country, weight_class, is_main_event, bout_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(eventId, 'KEREM DEMİR', '8-1-0', 'TR', 'ALİ ÖZTÜRK', '9-2-0', 'TR', 'Lightweight (70 kg)', 0, 2);

    database.prepare(`
      INSERT INTO fights (event_id, fighter1_name, fighter1_record, fighter1_country, fighter2_name, fighter2_record, fighter2_country, weight_class, is_main_event, bout_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(eventId, 'CAN ARSLAN', '6-0-0', 'TR', 'BURAK ŞAHIN', '5-2-0', 'TR', 'Middleweight (84 kg)', 0, 3);
  }
}

// ─── Users ──────────────────────────────────────────────────────────────────

export function getUserByUsername(username: string) {
  return getDb().prepare('SELECT * FROM users WHERE username = ?').get(username);
}

export function getAllUsers() {
  return getDb().prepare('SELECT id, username, role, created_at FROM users ORDER BY created_at DESC').all();
}

export function createUser(username: string, password: string, role: string) {
  const passwordHash = bcrypt.hashSync(password, 10);
  return getDb().prepare(
    'INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)'
  ).run(username, passwordHash, role);
}

export function deleteUser(id: number) {
  return getDb().prepare('DELETE FROM users WHERE id = ?').run(id);
}

export function updateUserPassword(id: number, newPassword: string) {
  const passwordHash = bcrypt.hashSync(newPassword, 10);
  return getDb().prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(passwordHash, id);
}

export function updateUserRole(id: number, role: string) {
  return getDb().prepare('UPDATE users SET role = ? WHERE id = ?').run(role, id);
}

// ─── Events ─────────────────────────────────────────────────────────────────

export function getAllEvents(status?: string) {
  if (status) {
    return getDb().prepare('SELECT * FROM events WHERE status = ? ORDER BY event_date ASC').all(status);
  }
  return getDb().prepare('SELECT * FROM events ORDER BY event_date DESC').all();
}

export function getEventById(id: number) {
  return getDb().prepare('SELECT * FROM events WHERE id = ?').get(id);
}

export function getEventBySlug(slug: string) {
  return getDb().prepare('SELECT * FROM events WHERE slug = ?').get(slug);
}

export function createEvent(data: {
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  venue?: string;
  city?: string;
  event_date?: string;
  poster_url?: string;
  ticket_url?: string;
  status: string;
}) {
  return getDb().prepare(`
    INSERT INTO events (slug, title, subtitle, description, venue, city, event_date, poster_url, ticket_url, status)
    VALUES (@slug, @title, @subtitle, @description, @venue, @city, @event_date, @poster_url, @ticket_url, @status)
  `).run(data);
}

export function updateEvent(id: number, data: Partial<{
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  venue: string;
  city: string;
  event_date: string;
  poster_url: string;
  ticket_url: string;
  status: string;
}>) {
  const keys = Object.keys(data);
  const setClause = keys.map(k => `${k} = @${k}`).join(', ');
  return getDb().prepare(`UPDATE events SET ${setClause} WHERE id = @id`).run({ ...data, id });
}

export function deleteEvent(id: number) {
  return getDb().prepare('DELETE FROM events WHERE id = ?').run(id);
}

// ─── Fights ──────────────────────────────────────────────────────────────────

export function getFightsByEventId(eventId: number) {
  return getDb().prepare('SELECT * FROM fights WHERE event_id = ? ORDER BY is_main_event DESC, bout_order ASC').all(eventId);
}

export function createFight(data: {
  event_id: number;
  fighter1_name: string;
  fighter1_record?: string;
  fighter1_photo?: string;
  fighter1_country?: string;
  fighter2_name: string;
  fighter2_record?: string;
  fighter2_photo?: string;
  fighter2_country?: string;
  weight_class?: string;
  is_main_event?: boolean;
  bout_order?: number;
  result?: string;
}) {
  return getDb().prepare(`
    INSERT INTO fights (event_id, fighter1_name, fighter1_record, fighter1_photo, fighter1_country, fighter2_name, fighter2_record, fighter2_photo, fighter2_country, weight_class, is_main_event, bout_order, result)
    VALUES (@event_id, @fighter1_name, @fighter1_record, @fighter1_photo, @fighter1_country, @fighter2_name, @fighter2_record, @fighter2_photo, @fighter2_country, @weight_class, @is_main_event, @bout_order, @result)
  `).run({ is_main_event: 0, bout_order: 0, ...data });
}

export function updateFight(id: number, data: Partial<{
  fighter1_name: string;
  fighter1_record: string;
  fighter1_photo: string;
  fighter1_country: string;
  fighter2_name: string;
  fighter2_record: string;
  fighter2_photo: string;
  fighter2_country: string;
  weight_class: string;
  is_main_event: boolean;
  bout_order: number;
  result: string;
}>) {
  const keys = Object.keys(data);
  const setClause = keys.map(k => `${k} = @${k}`).join(', ');
  return getDb().prepare(`UPDATE fights SET ${setClause} WHERE id = @id`).run({ ...data, id });
}

export function deleteFight(id: number) {
  return getDb().prepare('DELETE FROM fights WHERE id = ?').run(id);
}

export default getDb;
