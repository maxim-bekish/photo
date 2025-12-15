import { NextResponse } from 'next/server';
import { getExpertise } from '@/src/lib/supabase-data-loader';

export async function GET() {
	const el = await getExpertise();
	return NextResponse.json(el);
}
