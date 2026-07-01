import { db } from './lib/db';
import { sql } from 'drizzle-orm';

async function run() {
  try {
    console.log('Adding column screenshot_url to events...');
    await db.execute(sql`ALTER TABLE events ADD COLUMN IF NOT EXISTS screenshot_url text;`);
    
    console.log('Creating table snapshots...');
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS snapshots (
        id serial PRIMARY KEY,
        session_id varchar(100) NOT NULL REFERENCES sessions(session_id) ON DELETE CASCADE,
        frame_time double precision NOT NULL,
        frame_index integer NOT NULL,
        screenshot_url text NOT NULL,
        x double precision NOT NULL,
        y double precision NOT NULL,
        z double precision NOT NULL,
        score integer NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL
      );
    `);
    
    console.log('Database updated successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error updating database:', err);
    process.exit(1);
  }
}

run();
