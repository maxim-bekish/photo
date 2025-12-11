import { NextRequest, NextResponse } from 'next/server';
import { getBlogById } from '@/src/lib/supabase-data-loader';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	const blog = await getBlogById(id);

	if (!blog) {
		return NextResponse.json({ error: 'Блог не найден' }, { status: 404 });
	}

	return NextResponse.json(blog);
}

