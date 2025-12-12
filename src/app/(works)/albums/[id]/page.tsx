'use client';

import { Title } from './Title';
import { Characteristics } from './Characteristics';
import { Gallery } from './Gallery';
import { MoreAlbums } from './MoreAlbums';
import { useParams } from 'next/navigation';
import { useAlbum } from '@/src/hooks/queries/useAlbums';

export default function () {
	const params = useParams();
	const id = params.id as string;

	const { data: album, isLoading } = useAlbum(id);

	if (isLoading) {
		return (
			<main>
				<div className='text-creamy-white text-center py-20'>Загрузка...</div>
			</main>
		);
	}

	if (!album) {
		return (
			<main>
				<div className='text-creamy-white text-center py-20'>Альбом не найден</div>
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

			<Gallery
				gallery={album.gallery}
				videoSrc={album.videoSrc}
				videoPreview={album.videoPreview}
			/>
			<MoreAlbums />
		</main>
	);
}
