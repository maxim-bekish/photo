'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlbumItem } from '@/src/shared/types';

export default function AlbumsPage() {
	const [albums, setAlbums] = useState<AlbumItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchAlbums();
	}, []);

	const fetchAlbums = async () => {
		try {
			const res = await fetch('/api/admin/albums');
			const data = await res.json();
			setAlbums(data);
		} catch (error) {
			console.error('Ошибка загрузки альбомов:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm('Вы уверены, что хотите удалить этот альбом?')) return;

		try {
			const res = await fetch(`/api/admin/albums?id=${id}`, { method: 'DELETE' });
			if (res.ok) {
				fetchAlbums();
			}
		} catch (error) {
			console.error('Ошибка удаления:', error);
		}
	};

	if (loading) {
		return <div className='text-creamy-white'>Загрузка...</div>;
	}

	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl font-bold text-creamy-white'>Управление альбомами</h1>
				<Link
					href='/admin/albums/new'
					className='bg-deep-orange text-white px-4 py-2 rounded hover:bg-deep-orange/80 transition-colors'>
					+ Создать альбом
				</Link>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{albums.map((album) => (
					<div
						key={album.id}
						className='bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20'>
						<img src={album.src} alt={album.title} className='w-full h-48 object-cover rounded mb-4' />
						<h3 className='text-creamy-white font-bold mb-2'>{album.title}</h3>
						<p className='text-gray-400 text-sm mb-4 line-clamp-2'>{album.description}</p>
						<div className='flex gap-2'>
							<Link
								href={`/admin/albums/${album.id}`}
								className='flex-1 bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition-colors'>
								Редактировать
							</Link>
							<button
								onClick={() => handleDelete(album.id)}
								className='flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors'>
								Удалить
							</button>
						</div>
					</div>
				))}
			</div>

			{albums.length === 0 && (
				<div className='text-center text-gray-400 py-12'>
					<p>Альбомы не найдены. Создайте первый альбом!</p>
				</div>
			)}
		</div>
	);
}

