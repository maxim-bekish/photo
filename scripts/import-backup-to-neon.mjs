import { readFile } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';
import { resolve } from 'node:path';
import { createPool } from '@vercel/postgres';

const PROJECT_ROOT = process.cwd();
const BACKUP_FILE = resolve(PROJECT_ROOT, 'db_cluster-22-12-2025@11-52-08.backup.gz');
const ENV_FILE = resolve(PROJECT_ROOT, '.env.local');

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

function decodeCopyField(value) {
	if (value === '\\N') return null;

	return value.replace(/\\([\\btnrfv])/g, (_m, escaped) => {
		switch (escaped) {
			case 'b':
				return '\b';
			case 't':
				return '\t';
			case 'n':
				return '\n';
			case 'r':
				return '\r';
			case 'f':
				return '\f';
			case 'v':
				return '\v';
			case '\\':
				return '\\';
			default:
				return escaped;
		}
	});
}

function parseCopyLine(line, columns) {
	const values = line.split('\t').map(decodeCopyField);
	const row = {};
	columns.forEach((column, idx) => {
		row[column] = values[idx] ?? null;
	});
	return row;
}

function extractCopyTable(dump, tableName) {
	const pattern = new RegExp(
		`COPY public\\.${tableName} \\(([^)]+)\\) FROM stdin;\\r?\\n([\\s\\S]*?)\\r?\\n\\\\\\.`,
		'm',
	);

	const match = dump.match(pattern);
	if (!match) return [];

	const columns = match[1]
		.split(',')
		.map((column) => column.trim().replaceAll('"', ''));

	const rows = match[2]
		.split(/\r?\n/)
		.filter((line) => line.length > 0)
		.map((line) => parseCopyLine(line, columns));

	return rows;
}

function toInt(value) {
	if (value == null || value === '') return null;
	const parsed = Number.parseInt(String(value), 10);
	return Number.isNaN(parsed) ? null : parsed;
}

async function ensureSchema(pool) {
	await pool.query(`
		CREATE TABLE IF NOT EXISTS albums (
			id TEXT PRIMARY KEY,
			src TEXT,
			alt TEXT,
			title TEXT,
			"videoSrc" TEXT,
			"videoPreview" TEXT,
			description TEXT,
			href TEXT
		);
	`);
	await pool.query(`
		ALTER TABLE albums
			ADD COLUMN IF NOT EXISTS src TEXT,
			ADD COLUMN IF NOT EXISTS alt TEXT,
			ADD COLUMN IF NOT EXISTS title TEXT,
			ADD COLUMN IF NOT EXISTS "videoSrc" TEXT,
			ADD COLUMN IF NOT EXISTS "videoPreview" TEXT,
			ADD COLUMN IF NOT EXISTS description TEXT,
			ADD COLUMN IF NOT EXISTS href TEXT;
	`);

	await pool.query(`
		CREATE TABLE IF NOT EXISTS blogs (
			id TEXT PRIMARY KEY,
			src TEXT NOT NULL,
			href TEXT NOT NULL,
			message TEXT NOT NULL,
			category TEXT,
			date TEXT,
			"subTitle" TEXT
		);
	`);
	await pool.query(`
		ALTER TABLE blogs
			ADD COLUMN IF NOT EXISTS src TEXT,
			ADD COLUMN IF NOT EXISTS href TEXT,
			ADD COLUMN IF NOT EXISTS message TEXT,
			ADD COLUMN IF NOT EXISTS category TEXT,
			ADD COLUMN IF NOT EXISTS date TEXT,
			ADD COLUMN IF NOT EXISTS "subTitle" TEXT;
	`);

	await pool.query(`
		CREATE TABLE IF NOT EXISTS brands (
			id TEXT PRIMARY KEY,
			href TEXT,
			alt TEXT
		);
	`);
	await pool.query(`
		ALTER TABLE brands
			ADD COLUMN IF NOT EXISTS href TEXT,
			ADD COLUMN IF NOT EXISTS alt TEXT;
	`);

	await pool.query(`
		CREATE TABLE IF NOT EXISTS characteristics (
			characteristic_id BIGINT PRIMARY KEY,
			album_id TEXT,
			icon TEXT,
			code TEXT,
			value TEXT
		);
	`);
	await pool.query(`
		ALTER TABLE characteristics
			ADD COLUMN IF NOT EXISTS characteristic_id BIGINT,
			ADD COLUMN IF NOT EXISTS album_id TEXT,
			ADD COLUMN IF NOT EXISTS icon TEXT,
			ADD COLUMN IF NOT EXISTS code TEXT,
			ADD COLUMN IF NOT EXISTS value TEXT;
	`);
	await pool.query(`
		ALTER TABLE characteristics
			ALTER COLUMN value TYPE TEXT USING value::text;
	`);

	await pool.query(`
		CREATE TABLE IF NOT EXISTS expertise (
			id TEXT PRIMARY KEY,
			title TEXT,
			src TEXT,
			description TEXT
		);
	`);
	await pool.query(`
		ALTER TABLE expertise
			ADD COLUMN IF NOT EXISTS title TEXT,
			ADD COLUMN IF NOT EXISTS src TEXT,
			ADD COLUMN IF NOT EXISTS description TEXT;
	`);

	await pool.query(`
		CREATE TABLE IF NOT EXISTS gallery (
			gallery_id BIGINT PRIMARY KEY,
			album_id TEXT,
			src TEXT
		);
	`);
	await pool.query(`
		ALTER TABLE gallery
			ADD COLUMN IF NOT EXISTS gallery_id BIGINT,
			ADD COLUMN IF NOT EXISTS album_id TEXT,
			ADD COLUMN IF NOT EXISTS src TEXT;
	`);

	await pool.query(`
		CREATE TABLE IF NOT EXISTS reviews (
			id TEXT PRIMARY KEY,
			src TEXT,
			message TEXT,
			name TEXT,
			role TEXT,
			rating INTEGER
		);
	`);
	await pool.query(`
		ALTER TABLE reviews
			ADD COLUMN IF NOT EXISTS src TEXT,
			ADD COLUMN IF NOT EXISTS message TEXT,
			ADD COLUMN IF NOT EXISTS name TEXT,
			ADD COLUMN IF NOT EXISTS role TEXT;
	`);
	await pool.query(`
		ALTER TABLE reviews
			ALTER COLUMN rating TYPE INTEGER USING NULLIF(rating::text, '')::INTEGER;
	`);

	await pool.query(`
		CREATE TABLE IF NOT EXISTS videos (
			id TEXT PRIMARY KEY,
			album_id TEXT,
			src TEXT NOT NULL,
			alt TEXT,
			preview TEXT
		);
	`);
	await pool.query(`
		ALTER TABLE videos
			ADD COLUMN IF NOT EXISTS album_id TEXT,
			ADD COLUMN IF NOT EXISTS src TEXT,
			ADD COLUMN IF NOT EXISTS alt TEXT,
			ADD COLUMN IF NOT EXISTS preview TEXT;
	`);

	await pool.query(`
		CREATE TABLE IF NOT EXISTS socials (
			id TEXT PRIMARY KEY,
			href TEXT NOT NULL,
			icon TEXT NOT NULL,
			text TEXT NOT NULL,
			mob TEXT NOT NULL,
			nav BOOLEAN NOT NULL DEFAULT FALSE,
			footer BOOLEAN NOT NULL DEFAULT FALSE,
			contact BOOLEAN NOT NULL DEFAULT FALSE
		);
	`);
	await pool.query(`
		ALTER TABLE socials
			ADD COLUMN IF NOT EXISTS href TEXT,
			ADD COLUMN IF NOT EXISTS icon TEXT,
			ADD COLUMN IF NOT EXISTS text TEXT,
			ADD COLUMN IF NOT EXISTS mob TEXT,
			ADD COLUMN IF NOT EXISTS nav BOOLEAN DEFAULT FALSE,
			ADD COLUMN IF NOT EXISTS footer BOOLEAN DEFAULT FALSE,
			ADD COLUMN IF NOT EXISTS contact BOOLEAN DEFAULT FALSE;
	`);
}

async function truncateTables(pool) {
	await pool.query(`
		TRUNCATE TABLE
			characteristics,
			gallery,
			reviews,
			expertise,
			brands,
			blogs,
			videos,
			albums
		RESTART IDENTITY;
	`);
}

async function insertRows(pool, table, rows) {
	if (rows.length === 0) return;

	for (const row of rows) {
		const columns = Object.keys(row);
		const values = Object.values(row);
		const placeholders = columns.map((_, idx) => `$${idx + 1}`).join(', ');
		const quotedColumns = columns.map((column) => `"${column}"`).join(', ');
		await pool.query(
			`INSERT INTO "${table}" (${quotedColumns}) VALUES (${placeholders})`,
			values,
		);
	}
}

async function main() {
	const localEnv = parseEnv(await readFile(ENV_FILE, 'utf8'));
	const connectionString = process.env.POSTGRES_URL ?? localEnv.POSTGRES_URL;

	if (!connectionString) {
		throw new Error('POSTGRES_URL не найден в окружении или .env.local');
	}

	const dumpBuffer = await readFile(BACKUP_FILE);
	const dumpSql = gunzipSync(dumpBuffer).toString('utf8');

	const albums = extractCopyTable(dumpSql, 'albums');
	const blogs = extractCopyTable(dumpSql, 'blogs');
	const brands = extractCopyTable(dumpSql, 'brands');
	const characteristics = extractCopyTable(dumpSql, 'characteristics');
	const expertise = extractCopyTable(dumpSql, 'expertise');
	const gallery = extractCopyTable(dumpSql, 'gallery');
	const reviews = extractCopyTable(dumpSql, 'reviews');

	const normalizedAlbums = albums.map((row) => ({
		id: row.id,
		src: row.src,
		alt: row.alt,
		title: row.title,
		videoSrc: row.videoSrc,
		videoPreview: row.videoPreview,
		description: row.description,
		href: row.href,
	}));

	const normalizedBlogs = blogs.map((row) => ({
		id: row.id,
		src: row.src,
		href: row.href,
		message: row.message,
		category: row.category,
		date: row.date,
		subTitle: row.subTitle,
	}));

	const normalizedBrands = brands.map((row) => ({
		id: row.id,
		href: row.href,
		alt: row.alt,
	}));

	const normalizedCharacteristics = characteristics.map((row) => ({
		characteristic_id: toInt(row.characteristic_id),
		album_id: row.album_id,
		icon: row.icon,
		code: row.code,
		value: row.value,
	}));

	const normalizedExpertise = expertise.map((row) => ({
		id: row.id,
		title: row.title,
		src: row.src,
		description: row.description,
	}));

	const normalizedGallery = gallery.map((row) => ({
		gallery_id: toInt(row.gallery_id),
		album_id: row.album_id,
		src: row.src,
	}));

	const normalizedReviews = reviews.map((row) => ({
		id: row.id,
		src: row.src,
		message: row.message,
		name: row.name,
		role: row.role,
		rating: toInt(row.rating),
	}));

	const normalizedVideos = normalizedAlbums
		.filter((row) => row.videoSrc)
		.map((row) => ({
			id: `video-${row.id}`,
			album_id: row.id,
			src: row.videoSrc,
			alt: row.alt ?? row.title ?? 'video',
			preview: row.videoPreview,
		}));

	const pool = createPool({ connectionString });

	try {
		await ensureSchema(pool);
		await truncateTables(pool);

		await insertRows(pool, 'albums', normalizedAlbums);
		await insertRows(pool, 'blogs', normalizedBlogs);
		await insertRows(pool, 'brands', normalizedBrands);
		await insertRows(pool, 'characteristics', normalizedCharacteristics);
		await insertRows(pool, 'expertise', normalizedExpertise);
		await insertRows(pool, 'gallery', normalizedGallery);
		await insertRows(pool, 'reviews', normalizedReviews);
		await insertRows(pool, 'videos', normalizedVideos);

		const counts = await pool.query(`
			SELECT 'albums' AS table_name, COUNT(*)::int AS count FROM albums
			UNION ALL
			SELECT 'blogs' AS table_name, COUNT(*)::int AS count FROM blogs
			UNION ALL
			SELECT 'brands' AS table_name, COUNT(*)::int AS count FROM brands
			UNION ALL
			SELECT 'characteristics' AS table_name, COUNT(*)::int AS count FROM characteristics
			UNION ALL
			SELECT 'expertise' AS table_name, COUNT(*)::int AS count FROM expertise
			UNION ALL
			SELECT 'gallery' AS table_name, COUNT(*)::int AS count FROM gallery
			UNION ALL
			SELECT 'reviews' AS table_name, COUNT(*)::int AS count FROM reviews
			UNION ALL
			SELECT 'videos' AS table_name, COUNT(*)::int AS count FROM videos
			ORDER BY table_name;
		`);

		console.table(counts.rows);
		console.log('Импорт завершён успешно.');
	} finally {
		await pool.end();
	}
}

main().catch((error) => {
	console.error('Ошибка импорта:', error);
	process.exitCode = 1;
});
