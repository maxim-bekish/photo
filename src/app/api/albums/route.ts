import { NextResponse } from 'next/server';
import { getAlbums } from '@/src/lib/data-loader';

export async function GET() {
	const albums = await getAlbums();
	return NextResponse.json(albums);
}

