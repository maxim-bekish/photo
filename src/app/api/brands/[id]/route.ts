import { NextResponse } from 'next/server';
import { getBrands } from '@/src/lib/supabase-data-loader';

export async function GET() {
	const albums = await getBrands();
	return NextResponse.json(albums);
}

