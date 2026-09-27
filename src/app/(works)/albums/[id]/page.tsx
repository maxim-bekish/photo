'use client';

import { texts } from '@/src/shared/config/texts';
import { Title } from './Title';
import { Characteristics } from './Characteristics';
import { Gallery } from './Gallery';
import { MoreAlbums } from './MoreAlbums';
import { useParams } from 'next/navigation';
import { apiResources } from '@/src/lib/api-resources';

export default function AlbumPage() {
	const params = useParams();
	const id = params.id as string;

	const { data: album, isLoading } = apiResources.albums.useQueryById(id)();
	console.log(album);
	if (isLoading) {
		return (
			<main>
				<div className='text-creamy-white text-center py-20'>{texts.common.loading}</div>
			</main>
		);
	}

	if (!album) {
		return (
			<main>
				<div className='text-creamy-white text-center py-20'>{texts.works.albumNotFound}</div>
			</main>
		);
	}

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
