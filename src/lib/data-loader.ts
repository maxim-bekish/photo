import { readFile } from 'fs/promises';
import { join } from 'path';
import { ArticlesItem, AlbumItem } from '@/src/shared/types';

const BLOGS_PATH = join(process.cwd(), 'src', 'data', 'blogs.json');
const ALBUMS_PATH = join(process.cwd(), 'src', 'data', 'albums.json');
const BRANDS_PATH = join(process.cwd(), 'src', 'data', 'brands.json');

export async function getBlogs(): Promise<ArticlesItem[]> {
	try {
		const file = await readFile(BLOGS_PATH, 'utf-8');
		return JSON.parse(file);
	} catch {
		return [];
	}
}

export async function getBlogById(id: string): Promise<ArticlesItem | null> {
	const blogs = await getBlogs();
	return blogs.find(b => b.id === id || b.href === id) || null;
}

export async function getAlbums(): Promise<AlbumItem[]> {
	try {
		const file = await readFile(ALBUMS_PATH, 'utf-8');
		return JSON.parse(file);
	} catch {
		return [];
	}
}

export async function getAlbumById(id: string): Promise<AlbumItem | null> {
	const albums = await getAlbums();
	return albums.find(a => a.id === id || a.href === id) || null;
}
