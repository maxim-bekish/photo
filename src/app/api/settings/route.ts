import { getSettings } from '@/src/lib/vercel-loader';
import { NextResponse } from 'next/server';

export async function GET() {
	const data = await getSettings();
	return NextResponse.json(data);
}
