// src/app/api/[resource]/route.ts
import { NextResponse } from 'next/server';

const resourceMap: Record<string, () => Promise<unknown>> = {
	blogs: () => import('@/src/lib/vercel-loader').then((m) => m.getBlogs()),
	albums: () => import('@/src/lib/vercel-loader').then((m) => m.getAlbums()),
	brands: () => import('@/src/lib/vercel-loader').then((m) => m.getBrands()),
	expertise: () => import('@/src/lib/vercel-loader').then((m) => m.getExpertise()),
	reviews: () => import('@/src/lib/vercel-loader').then((m) => m.getReviews()),
	socials: () => import('@/src/lib/vercel-loader').then((m) => m.getSocials()),
	videos: () => import('@/src/lib/vercel-loader').then((m) => m.getVideos()),
};

export async function GET(
	_request: Request,
	{ params }: { params: { resource: string } }
) {
	const { resource } = params;
	const loader = resourceMap[resource];

	if (!loader) {
		return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
	}

	const data = await loader();
	return NextResponse.json(data);
}