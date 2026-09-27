import { getFaq } from '@/src/lib/vercel-loader';
import { NextResponse } from 'next/server';

export async function GET() {
	const data = await getFaq();
	return NextResponse.json(data);
}
