import { getReviews } from '@/src/lib/vercel-loader';
import { NextResponse } from 'next/server';

export async function GET() {
	const brands = await getReviews();
	return NextResponse.json(brands);
}
