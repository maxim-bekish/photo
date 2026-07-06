import { getSocials } from '@/src/lib/vercel-loader';
import { NextResponse } from 'next/server';

export async function GET() {
	const data = await getSocials();
	return NextResponse.json(data);
}
