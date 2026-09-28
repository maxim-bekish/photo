import { Title } from './Title';
import { Characteristics } from './Characteristics';
import { Gallery } from './Gallery';
import { MoreAlbums } from './MoreAlbums';

import { getAlbumById } from '@/src/lib/vercel-loader';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import type { Metadata } from 'next';

const getAlbum = cache(getAlbumById);

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	const album = await getAlbum(id);
	if (!album) return {};
	return {
		title: album.title,
		description: album.description,
		openGraph: { images: [album.src] },
	};
}

export default async function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const album = await getAlbum(id);
	if (!album) notFound();

	return (
		<main>
			<Title title={album.title} src={album.src} />
			<Characteristics
				characteristics={album.characteristics}
				description={album.description}
			/>

			<Gallery gallery={album.gallery} videos={album.videos} />

			<MoreAlbums />
		</main>
	);
}
