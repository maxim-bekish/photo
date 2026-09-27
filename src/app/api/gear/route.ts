import { getGear } from '@/src/lib/vercel-loader';
import { NextResponse } from 'next/server';

export async function GET() {
	const data = await getGear();
	return NextResponse.json(data);
}
