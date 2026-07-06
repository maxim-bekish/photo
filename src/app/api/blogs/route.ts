import { getBlogs } from '@/src/lib/vercel-loader';
import { NextResponse } from 'next/server';

export async function GET() {
	const blogs = await getBlogs();
	return NextResponse.json(blogs);
}
