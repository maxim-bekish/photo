import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createPool } from '@vercel/postgres';

const PROJECT_ROOT = process.cwd();
const ENV_FILE = resolve(PROJECT_ROOT, '.env.local');

// Миграции должны быть идемпотентными: скрипт можно запускать повторно.
const migrations = [
	{
		name: 'blogs.content — текст статьи в markdown',
		sql: 'ALTER TABLE blogs ADD COLUMN IF NOT EXISTS content text',
	},
];

function parseEnv(content) {
	const env = {};
	content
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter((line) => line && !line.startsWith('#'))
		.forEach((line) => {
			const sepIdx = line.indexOf('=');
			if (sepIdx === -1) return;
			const key = line.slice(0, sepIdx).trim();
			let value = line.slice(sepIdx + 1).trim();
			if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
				value = value.slice(1, -1);
			}
			env[key] = value;
		});
	return env;
}

async function main() {
	const localEnv = parseEnv(await readFile(ENV_FILE, 'utf8'));
	const connectionString = process.env.POSTGRES_URL ?? localEnv.POSTGRES_URL;

	if (!connectionString) {
		throw new Error('POSTGRES_URL не найден в окружении или .env.local');
	}

	const pool = createPool({ connectionString });

	try {
		for (const migration of migrations) {
			await pool.query(migration.sql);
			console.log(`✓ ${migration.name}`);
		}
		console.log('Миграции применены.');
	} finally {
		await pool.end();
	}
}

main().catch((error) => {
	console.error('Ошибка миграции:', error);
	process.exitCode = 1;
});
