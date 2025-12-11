import { NextResponse } from 'next/server';
import { getBlogs } from '@/src/lib/data-loader';

export async function GET() {
	const blogs = await getBlogs();
	return NextResponse.json(blogs);
}

