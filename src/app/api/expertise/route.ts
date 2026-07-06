import { getExpertise } from '@/src/lib/vercel-loader';
import { NextResponse } from 'next/server';

export async function GET() {
	const el = await getExpertise();
	return NextResponse.json(el);
}
