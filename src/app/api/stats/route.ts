import { getStats } from '@/src/lib/vercel-loader';
import { NextResponse } from 'next/server';

export async function GET() {
	const data = await getStats();
	return NextResponse.json(data);
}
