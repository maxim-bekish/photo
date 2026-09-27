import { getQualities } from '@/src/lib/vercel-loader';
import { NextResponse } from 'next/server';

export async function GET() {
	const data = await getQualities();
	return NextResponse.json(data);
}
