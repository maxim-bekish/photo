import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { AlbumItem } from '@/src/shared/types';

const DATA_PATH = join(process.cwd(), 'src', 'data', 'albums.json');

async function getAlbums(): Promise<AlbumItem[]> {
	try {
		const file = await readFile(DATA_PATH, 'utf-8');
		return JSON.parse(file);
	} catch {
		return [];
	}
}

async function saveAlbums(albums: AlbumItem[]) {
	await writeFile(DATA_PATH, JSON.stringify(albums, null, '\t'), 'utf-8');
}

export async function GET() {
	const albums = await getAlbums();
	return NextResponse.json(albums);
}

export async function POST(request: NextRequest) {
	try {
		const album: AlbumItem = await request.json();
		const albums = await getAlbums();

		// Генерируем ID если нет
		if (!album.id) {
			album.id = album.href || Date.now().toString();
		}

		albums.push(album);
		await saveAlbums(albums);

		return NextResponse.json(album);
	} catch (error) {
		return NextResponse.json({ error: 'Ошибка при создании альбома' }, { status: 500 });
	}
}

export async function PUT(request: NextRequest) {
	try {
		const updatedAlbum: AlbumItem = await request.json();
		const albums = await getAlbums();

		const index = albums.findIndex((a) => a.id === updatedAlbum.id);
		if (index === -1) {
			return NextResponse.json({ error: 'Альбом не найден' }, { status: 404 });
		}

		albums[index] = updatedAlbum;
		await saveAlbums(albums);

		return NextResponse.json(updatedAlbum);
	} catch (error) {
		return NextResponse.json({ error: 'Ошибка при обновлении альбома' }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json({ error: 'ID не указан' }, { status: 400 });
		}

		const albums = await getAlbums();
		const filtered = albums.filter((a) => a.id !== id);
		await saveAlbums(filtered);

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error: 'Ошибка при удалении альбома' }, { status: 500 });
	}
}

