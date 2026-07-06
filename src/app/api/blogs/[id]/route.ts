import { getBlogById } from '@/src/lib/vercel-loader';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const blog = await getBlogById(id);

	if (!blog) {
		return NextResponse.json({ error: 'Блог не найден' }, { status: 404 });
	}

	return NextResponse.json(blog);
}
