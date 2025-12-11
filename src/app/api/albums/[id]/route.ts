import { NextRequest, NextResponse } from 'next/server';
import { getAlbumById } from '@/src/lib/supabase-data-loader';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	const album = await getAlbumById(id);

	if (!album) {
		return NextResponse.json({ error: 'Альбом не найден' }, { status: 404 });
	}

	return NextResponse.json(album);
}

