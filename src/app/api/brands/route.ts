import { NextResponse } from 'next/server';
import { getBrands } from '@/src/lib/supabase-data-loader';

export async function GET() {
	const brands = await getBrands();
	return NextResponse.json(brands);
}
