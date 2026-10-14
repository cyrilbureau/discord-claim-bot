import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const dataDirectory = join(process.cwd(), 'data');

mkdirSync(dataDirectory, { recursive: true });

export const database = new DatabaseSync(
	join(dataDirectory, 'claim.db')
);

database.exec(`
	PRAGMA journal_mode = WAL;
	PRAGMA foreign_keys = ON;
	PRAGMA busy_timeout = 5000;
`);
