import { getVideos } from '@/src/lib/vercel-loader';
import { NextResponse } from 'next/server';

export async function GET() {
	const data = await getVideos();
	return NextResponse.json(data);
}
