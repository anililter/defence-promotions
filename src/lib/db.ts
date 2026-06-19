import { createClient, type Client } from '@libsql/client';
import bcrypt from 'bcryptjs';

// ─── Client ───────────────────────────────────────────────────────────────────

let _client: Client | null = null;
let _initialized = false;

function getDb(): Client {
  if (!_client) {
    const url = process.env.TURSO_DATABASE_URL;
    if (!url) throw new Error('TURSO_DATABASE_URL eksik. .env.local dosyasına ekle.');
    _client = createClient({
      url,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return _client;
}

// ─── Schema & Seed ────────────────────────────────────────────────────────────

export async function ensureInit(): Promise<void> {
  if (_initialized) return;
  const db = getDb();

  await db.batch([
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'editor' CHECK(role IN ('admin', 'editor')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS events (
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
    )`,
    `CREATE TABLE IF NOT EXISTS fights (
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
    )`,
  ], 'write');

  // Seed admin kullanıcısı
  const countRes = await db.execute('SELECT COUNT(*) as count FROM users');
  const count = Number(countRes.rows[0][0]);

  if (count === 0) {
    const hash = bcrypt.hashSync('DefenceAdmin2025!', 10);
    await db.execute({
      sql: 'INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)',
      args: ['admin', hash, 'admin'],
    });

    // Seed örnek etkinlik
    const eventRes = await db.execute({
      sql: `INSERT INTO events (slug, title, subtitle, description, venue, city, event_date, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        'fight-night-1',
        'DEFENCE FIGHT NIGHT 1',
        'Kafes Kapısı Açılıyor',
        'İstanbul\'un kalbinde, en elit MMA savaşçıları kafeste buluşuyor.',
        'Volkswagen Arena',
        'İstanbul',
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        'upcoming',
      ],
    });

    const eventId = eventRes.lastInsertRowid;

    await db.batch([
      {
        sql: `INSERT INTO fights (event_id, fighter1_name, fighter1_record, fighter1_country, fighter2_name, fighter2_record, fighter2_country, weight_class, is_main_event, bout_order)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [eventId, 'AHMET YILMAZ', '12-2-0', 'TR', 'MEHMET KAYA', '10-3-0', 'TR', 'Welterweight (77 kg)', 1, 1],
      },
      {
        sql: `INSERT INTO fights (event_id, fighter1_name, fighter1_record, fighter1_country, fighter2_name, fighter2_record, fighter2_country, weight_class, is_main_event, bout_order)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [eventId, 'KEREM DEMİR', '8-1-0', 'TR', 'ALİ ÖZTÜRK', '9-2-0', 'TR', 'Lightweight (70 kg)', 0, 2],
      },
      {
        sql: `INSERT INTO fights (event_id, fighter1_name, fighter1_record, fighter1_country, fighter2_name, fighter2_record, fighter2_country, weight_class, is_main_event, bout_order)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [eventId, 'CAN ARSLAN', '6-0-0', 'TR', 'BURAK ŞAHİN', '5-2-0', 'TR', 'Middleweight (84 kg)', 0, 3],
      },
    ], 'write');

    console.log('✅ Veritabanı başlatıldı, admin kullanıcısı oluşturuldu.');
  }

  _initialized = true;
}

// ─── Yardımcı: Row → Object ───────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toObj(row: any): Record<string, unknown> {
  // @libsql/client rows support named access
  return row as Record<string, unknown>;
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function getUserByUsername(username: string) {
  await ensureInit();
  const res = await getDb().execute({
    sql: 'SELECT * FROM users WHERE username = ?',
    args: [username],
  });
  if (res.rows.length === 0) return null;
  return toObj(res.rows[0]);
}

export async function getAllUsers() {
  await ensureInit();
  const res = await getDb().execute(
    'SELECT id, username, role, created_at FROM users ORDER BY created_at DESC'
  );
  return res.rows.map(toObj);
}

export async function createUser(username: string, password: string, role: string) {
  await ensureInit();
  const hash = bcrypt.hashSync(password, 10);
  const res = await getDb().execute({
    sql: 'INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)',
    args: [username, hash, role],
  });
  return { lastInsertRowid: res.lastInsertRowid };
}

export async function deleteUser(id: number) {
  await ensureInit();
  const res = await getDb().execute({ sql: 'DELETE FROM users WHERE id = ?', args: [id] });
  return { changes: res.rowsAffected };
}

export async function updateUserPassword(id: number, newPassword: string) {
  await ensureInit();
  const hash = bcrypt.hashSync(newPassword, 10);
  await getDb().execute({ sql: 'UPDATE users SET password_hash = ? WHERE id = ?', args: [hash, id] });
}

export async function updateUserRole(id: number, role: string) {
  await ensureInit();
  await getDb().execute({ sql: 'UPDATE users SET role = ? WHERE id = ?', args: [role, id] });
}

// ─── Events ───────────────────────────────────────────────────────────────────

export async function getAllEvents(status?: string) {
  await ensureInit();
  const res = status
    ? await getDb().execute({ sql: 'SELECT * FROM events WHERE status = ? ORDER BY event_date ASC', args: [status] })
    : await getDb().execute('SELECT * FROM events ORDER BY event_date DESC');
  return res.rows.map(toObj);
}

export async function getEventById(id: number) {
  await ensureInit();
  const res = await getDb().execute({ sql: 'SELECT * FROM events WHERE id = ?', args: [id] });
  return res.rows.length > 0 ? toObj(res.rows[0]) : null;
}

export async function getEventBySlug(slug: string) {
  await ensureInit();
  const res = await getDb().execute({ sql: 'SELECT * FROM events WHERE slug = ?', args: [slug] });
  return res.rows.length > 0 ? toObj(res.rows[0]) : null;
}

export async function createEvent(data: {
  slug: string; title: string; subtitle?: string; description?: string;
  venue?: string; city?: string; event_date?: string; poster_url?: string;
  ticket_url?: string; status: string;
}) {
  await ensureInit();
  const res = await getDb().execute({
    sql: `INSERT INTO events (slug, title, subtitle, description, venue, city, event_date, poster_url, ticket_url, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      data.slug, data.title, data.subtitle ?? null, data.description ?? null,
      data.venue ?? null, data.city ?? null, data.event_date ?? null,
      data.poster_url ?? null, data.ticket_url ?? null, data.status,
    ],
  });
  return { lastInsertRowid: res.lastInsertRowid };
}

export async function updateEvent(id: number, data: Record<string, unknown>) {
  await ensureInit();
  const keys = Object.keys(data);
  if (keys.length === 0) return { changes: 0 };
  const setClause = keys.map(k => `${k} = ?`).join(', ');
  const args = [...Object.values(data), id];
  const res = await getDb().execute({ sql: `UPDATE events SET ${setClause} WHERE id = ?`, args });
  return { changes: res.rowsAffected };
}

export async function deleteEvent(id: number) {
  await ensureInit();
  const res = await getDb().execute({ sql: 'DELETE FROM events WHERE id = ?', args: [id] });
  return { changes: res.rowsAffected };
}

// ─── Fights ───────────────────────────────────────────────────────────────────

export async function getFightsByEventId(eventId: number) {
  await ensureInit();
  const res = await getDb().execute({
    sql: 'SELECT * FROM fights WHERE event_id = ? ORDER BY is_main_event DESC, bout_order ASC',
    args: [eventId],
  });
  return res.rows.map(r => ({
    ...toObj(r),
    is_main_event: Boolean(r['is_main_event']),
  }));
}

export async function createFight(data: {
  event_id: number; fighter1_name: string; fighter1_record?: string;
  fighter1_photo?: string; fighter1_country?: string; fighter2_name: string;
  fighter2_record?: string; fighter2_photo?: string; fighter2_country?: string;
  weight_class?: string; is_main_event?: boolean; bout_order?: number; result?: string;
}) {
  await ensureInit();
  const res = await getDb().execute({
    sql: `INSERT INTO fights (event_id, fighter1_name, fighter1_record, fighter1_photo, fighter1_country,
          fighter2_name, fighter2_record, fighter2_photo, fighter2_country,
          weight_class, is_main_event, bout_order, result)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      data.event_id, data.fighter1_name, data.fighter1_record ?? null,
      data.fighter1_photo ?? null, data.fighter1_country ?? null,
      data.fighter2_name, data.fighter2_record ?? null,
      data.fighter2_photo ?? null, data.fighter2_country ?? null,
      data.weight_class ?? null, data.is_main_event ? 1 : 0,
      data.bout_order ?? 0, data.result ?? null,
    ],
  });
  return { lastInsertRowid: res.lastInsertRowid };
}

export async function updateFight(id: number, data: Record<string, unknown>) {
  await ensureInit();
  const keys = Object.keys(data);
  if (keys.length === 0) return;
  const processedData = { ...data };
  if ('is_main_event' in processedData) {
    processedData.is_main_event = processedData.is_main_event ? 1 : 0;
  }
  const setClause = keys.map(k => `${k} = ?`).join(', ');
  const args = [...Object.values(processedData), id];
  await getDb().execute({ sql: `UPDATE fights SET ${setClause} WHERE id = ?`, args });
}

export async function deleteFight(id: number) {
  await ensureInit();
  const res = await getDb().execute({ sql: 'DELETE FROM fights WHERE id = ?', args: [id] });
  return { changes: res.rowsAffected };
}
