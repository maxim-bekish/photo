import { AlbumItem, ArticlesItem, Brand, ExpertiseItem, Reviews, Social, VideoItem } from '../shared/types';
import { assertVercelPostgresEnv, parseJsonField, sql } from './vercel-db';

type AlbumRow = Omit<AlbumItem, 'gallery' | 'characteristics' | 'videos'> & {
	gallery: unknown;
	characteristics: unknown;
	videos?: unknown;
};

type ExpertiseRow = {
	id?: string;
	title?: string;
	description?: string;
	src?: string | null;
	main?: unknown;
	sub?: unknown;
};

function normalizeArrayField<T>(value: unknown): T[] {
	if (value == null) {
		return [];
	}

	if (Array.isArray(value)) {
		return value as T[];
	}

	return parseJsonField<T[]>(value as never);
}

function mapAlbumRow(row: AlbumRow): AlbumItem {
	return {
		...row,
		gallery: normalizeArrayField<AlbumItem['gallery'][number]>(row.gallery),
		characteristics: normalizeArrayField<AlbumItem['characteristics'][number]>(row.characteristics),
		videos: normalizeArrayField<VideoItem>(row.videos),
	};
}

export async function getAlbums(): Promise<AlbumItem[]> {
	assertVercelPostgresEnv();

	const { rows } = await sql<AlbumRow>`
		SELECT
			a.*,
			COALESCE(
				(
					SELECT json_agg(json_build_object('src', g.src, 'gallery_id', g.gallery_id) ORDER BY g.gallery_id)
					FROM gallery g
					WHERE g.album_id = a.id
				),
				'[]'::json
			) AS gallery,
			COALESCE(
				(
					SELECT json_agg(json_build_object('code', c.code, 'icon', c.icon, 'value', c.value) ORDER BY c.code)
					FROM characteristics c
					WHERE c.album_id = a.id
				),
				'[]'::json
			) AS characteristics
		FROM albums a
		ORDER BY a.id DESC;
	`;

	return rows.map(mapAlbumRow);
}

export async function getAlbumById(id: string): Promise<AlbumItem | null> {
	assertVercelPostgresEnv();

	const { rows } = await sql<AlbumRow>`
		SELECT
			a.*,
			COALESCE(
				(
					SELECT json_agg(json_build_object('src', g.src, 'gallery_id', g.gallery_id) ORDER BY g.gallery_id)
					FROM gallery g
					WHERE g.album_id = a.id
				),
				'[]'::json
			) AS gallery,
			COALESCE(
				(
					SELECT json_agg(json_build_object('code', c.code, 'icon', c.icon, 'value', c.value) ORDER BY c.code)
					FROM characteristics c
					WHERE c.album_id = a.id
				),
				'[]'::json
			) AS characteristics,
			COALESCE(
				(
					SELECT json_agg(json_build_object('alt', v.alt, 'src', v.src, 'preview', v.preview, 'id', v.id) ORDER BY v.id)
					FROM videos v
					WHERE v.album_id = a.id
				),
				'[]'::json
			) AS videos
		FROM albums a
		WHERE a.id = ${id}
		LIMIT 1;
	`;

	return rows[0] ? mapAlbumRow(rows[0]) : null;
}

export async function getBlogs(): Promise<ArticlesItem[]> {
	assertVercelPostgresEnv();
	const { rows } = await sql<ArticlesItem>`
		SELECT *
		FROM blogs
		ORDER BY date DESC;
	`;
	return rows;
}

export async function getBlogById(id: string): Promise<ArticlesItem | null> {
	assertVercelPostgresEnv();
	const { rows } = await sql<ArticlesItem>`
		SELECT *
		FROM blogs
		WHERE id = ${id}
		LIMIT 1;
	`;
	return rows[0] ?? null;
}

export async function getBrands(): Promise<Brand[]> {
	assertVercelPostgresEnv();
	const { rows } = await sql<Brand>`
		SELECT *
		FROM brands;
	`;
	return rows;
}

export async function getVideos(): Promise<VideoItem[]> {
	assertVercelPostgresEnv();
	const { rows } = await sql<VideoItem>`
		SELECT *
		FROM videos;
	`;
	return rows;
}

export async function getReviews(): Promise<Reviews[]> {
	assertVercelPostgresEnv();
	const { rows } = await sql<Reviews>`
		SELECT *
		FROM reviews;
	`;
	return rows;
}

export async function getSocials(): Promise<Social[]> {
	assertVercelPostgresEnv();
	const { rows } = await sql<Social>`
		SELECT *
		FROM socials;
	`;
	return rows;
}

export async function getExpertise(): Promise<{ main: ExpertiseItem<string>[]; sub: ExpertiseItem<string | null>[] }> {
	assertVercelPostgresEnv();

	const { rows } = await sql<ExpertiseRow>`
		SELECT *
		FROM expertise;
	`;

	const main: ExpertiseItem<string>[] = [];
	const sub: ExpertiseItem<string | null>[] = [];

	rows.forEach((row, index) => {
		const fallbackId = row.id ?? String(index);
		const fallbackTitle = row.title ?? '';
		const fallbackDescription = row.description ?? '';
		const fallbackSrc = row.src ?? null;

		const mainCandidates = normalizeArrayField<ExpertiseItem<string | null>>(row.main);

		if (mainCandidates.length > 0) {
			mainCandidates.forEach((item) => {
				if (item.src !== null && main.length < 4) {
					main.push({ ...item, src: item.src });
				} else {
					sub.push(item);
				}
			});
			return;
		}

		if (fallbackSrc !== null && main.length < 4) {
			main.push({
				id: fallbackId,
				title: fallbackTitle,
				description: fallbackDescription,
				src: fallbackSrc,
			});
			return;
		}

		sub.push({
			id: fallbackId,
			title: fallbackTitle,
			description: fallbackDescription,
			src: fallbackSrc,
		});
	});

	return { main, sub };
}
