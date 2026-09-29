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
	{
		name: 'contact_requests — заявки с формы контактов',
		sql: `CREATE TABLE IF NOT EXISTS contact_requests (
			id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
			name text NOT NULL,
			email text,
			phone text,
			message text NOT NULL,
			created_at timestamptz NOT NULL DEFAULT now()
		)`,
	},
	{
		name: 'site_settings — данные фотографа (одна строка, id = 1)',
		sql: `CREATE TABLE IF NOT EXISTS site_settings (
			id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
			first_name text NOT NULL DEFAULT '',
			last_name text NOT NULL DEFAULT '',
			city text NOT NULL DEFAULT '',
			email text NOT NULL DEFAULT '',
			phone text NOT NULL DEFAULT '',
			hero_title text NOT NULL DEFAULT '',
			hero_text text NOT NULL DEFAULT '',
			hero_video text NOT NULL DEFAULT '',
			hero_poster text NOT NULL DEFAULT '',
			about_short text NOT NULL DEFAULT '',
			about_intro text NOT NULL DEFAULT '',
			about_story text NOT NULL DEFAULT '',
			about_highlight text NOT NULL DEFAULT '',
			about_cta text NOT NULL DEFAULT '',
			about_hero_image text NOT NULL DEFAULT '',
			about_images jsonb NOT NULL DEFAULT '[]'::jsonb,
			meta_title text NOT NULL DEFAULT '',
			meta_description text NOT NULL DEFAULT ''
		)`,
	},
	{
		name: 'stats — счётчики на главной',
		sql: `CREATE TABLE IF NOT EXISTS stats (
			id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
			title text NOT NULL,
			value int NOT NULL,
			sort_order int NOT NULL DEFAULT 0
		)`,
	},
	{
		name: 'faq',
		sql: `CREATE TABLE IF NOT EXISTS faq (
			id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
			question text NOT NULL,
			answer text NOT NULL,
			sort_order int NOT NULL DEFAULT 0
		)`,
	},
	{
		name: 'awards',
		sql: `CREATE TABLE IF NOT EXISTS awards (
			id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
			title text NOT NULL,
			year text NOT NULL DEFAULT '',
			img text NOT NULL DEFAULT '',
			sort_order int NOT NULL DEFAULT 0
		)`,
	},
	{
		name: 'gear_categories',
		sql: `CREATE TABLE IF NOT EXISTS gear_categories (
			id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
			title text NOT NULL,
			icon text NOT NULL DEFAULT 'camera',
			sort_order int NOT NULL DEFAULT 0
		)`,
	},
	{
		name: 'gear',
		sql: `CREATE TABLE IF NOT EXISTS gear (
			id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
			category_id uuid NOT NULL REFERENCES gear_categories(id) ON DELETE CASCADE,
			value text NOT NULL,
			link text,
			sort_order int NOT NULL DEFAULT 0
		)`,
	},
	{
		name: 'characteristic_types — типы характеристик альбомов (готовые + свои из админки)',
		sql: `CREATE TABLE IF NOT EXISTS characteristic_types (
			code text PRIMARY KEY,
			label text NOT NULL,
			icon text NOT NULL DEFAULT 'circle',
			sort_order int NOT NULL DEFAULT 0,
			is_system boolean NOT NULL DEFAULT false
		)`,
	},
	{
		name: 'characteristic_types — готовый список (свои типы и правки подписей не затираются)',
		sql: `INSERT INTO characteristic_types (code, label, icon, sort_order, is_system) VALUES
			('camera', 'Камера', 'camera', 10, true),
			('lenses', 'Объективы', 'aperture', 20, true),
			('otherDevices', 'Доп. техника', 'monitor-smartphone', 30, true),
			('category', 'Категория', 'focus', 40, true),
			('projectType', 'Тип проекта', 'triangle', 50, true),
			('client', 'Клиент', 'user', 60, true),
			('location', 'Локация', 'map-pin', 70, true),
			('time', 'Сроки', 'calendar', 80, true)
		ON CONFLICT (code) DO NOTHING`,
	},
	{
		name: 'qualities — «Что вы найдёте во мне»',
		sql: `CREATE TABLE IF NOT EXISTS qualities (
			id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
			title text NOT NULL,
			sort_order int NOT NULL DEFAULT 0
		)`,
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
