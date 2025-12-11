import { NextRequest, NextResponse } from 'next/server';
import { getBlogById } from '@/src/lib/data-loader';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	const brand = await getBrandById(id);

	if (!brand) {
		return NextResponse.json({ error: 'Бренд не найден' }, { status: 404 });
	}

	return NextResponse.json(brand);
}

