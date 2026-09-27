import { getAwards } from '@/src/lib/vercel-loader';
import { NextResponse } from 'next/server';

export async function GET() {
	const data = await getAwards();
	return NextResponse.json(data);
}
