import { database } from './connection.js';

export function initializeDatabase() {
	database.exec(`
		CREATE TABLE IF NOT EXISTS guilds (
			guild_id TEXT PRIMARY KEY,
			enabled INTEGER NOT NULL DEFAULT 0 CHECK (enabled IN (0, 1)),
			message_threshold INTEGER NOT NULL DEFAULT 100 CHECK (message_threshold > 0),
			message_count INTEGER NOT NULL DEFAULT 0 CHECK (message_count >= 0)
		);
		CREATE TABLE IF NOT EXISTS monitored_channels (
			guild_id TEXT NOT NULL,
			channel_id TEXT NOT NULL,
			PRIMARY KEY (guild_id, channel_id),
			FOREIGN KEY (guild_id)
				REFERENCES guilds(guild_id)
				ON DELETE CASCADE
		);
		CREATE TABLE IF NOT EXISTS monitored_categories (
			guild_id TEXT NOT NULL,
			category_id TEXT NOT NULL,
			PRIMARY KEY (guild_id, category_id),
			FOREIGN KEY (guild_id)
				REFERENCES guilds(guild_id)
				ON DELETE CASCADE
		);
	`);

	console.log('Database initialized successfully.');
}
