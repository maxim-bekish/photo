import { getAlbums } from '@/src/lib/vercel-loader';
import { NextResponse } from 'next/server';

export async function GET() {
	const albums = await getAlbums();
	return NextResponse.json(albums);
}
