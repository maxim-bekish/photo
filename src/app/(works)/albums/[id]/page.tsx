'use client';

import { Title } from './Title';
import { Characteristics } from './Characteristics';
import { Gallery } from './Gallery';
import { AlbumItem } from '@/src/shared/types';
import { MoreAlbums } from './MoreAlbums';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function () {
	const params = useParams();
	const id = params.id as string;
	const [album, setAlbum] = useState<AlbumItem | null>(null);
	const [albumsList, setAlbumsList] = useState<AlbumItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		Promise.all([
			fetch(`/api/albums/${id}`).then((res) => res.json()),
			fetch('/api/albums').then((res) => res.json()),
		])
			.then(([albumData, albumsData]) => {
				setAlbum(albumData);
				setAlbumsList(albumsData);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, [id]);

	if (loading) {
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
			<Characteristics characteristics={album.characteristics} description={album.description} />

			<Gallery album={album.albums} video={album.video} />
			<MoreAlbums albums={albumsList} />
		</main>
	);
}
