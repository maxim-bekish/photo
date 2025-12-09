'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Input } from '@/src/shared/components/ui/input';
import { AlbumItem, Characteristics } from '@/src/shared/types';
import { IconName } from 'lucide-react/dynamic';

const ICON_OPTIONS: IconName[] = [
	'focus',
	'triangle',
	'camera',
	'aperture',
	'monitor-smartphone',
	'map-pin',
	'calendar',
	'user',
] as IconName[];

export default function EditAlbumPage() {
	const router = useRouter();
	const params = useParams();
	const id = params.id as string;
	const isNew = id === 'new';

	const [album, setAlbum] = useState<AlbumItem>({
		href: '',
		id: '',
		src: '',
		alt: 'photo',
		title: '',
		characteristics: [],
		description: '',
		albums: [],
	});
	const [loading, setLoading] = useState(!isNew);
	const [newCharCode, setNewCharCode] = useState('');
	const [newCharIcon, setNewCharIcon] = useState<IconName>('focus');
	const [newCharValue, setNewCharValue] = useState('');

	useEffect(() => {
		if (!isNew) {
			fetchAlbum();
		}
	}, [id]);

	const fetchAlbum = async () => {
		try {
			const res = await fetch('/api/admin/albums');
			const albums = await res.json();
			const found = albums.find((a: AlbumItem) => a.id === id);
			if (found) {
				setAlbum(found);
			}
		} catch (error) {
			console.error('Ошибка загрузки альбома:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const url = '/api/admin/albums';
			const method = isNew ? 'POST' : 'PUT';

			// Генерируем href из title если не указан
			if (!album.href && album.title) {
				album.href = album.title.toLowerCase().replace(/\s+/g, '-');
			}

			const res = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(album),
			});

			if (res.ok) {
				router.push('/admin/albums');
			}
		} catch (error) {
			console.error('Ошибка сохранения:', error);
		} finally {
			setLoading(false);
		}
	};

	const addCharacteristic = () => {
		if (!newCharCode || !newCharValue) return;

		const newChar: Characteristics = {
			icon: newCharIcon,
			code: newCharCode,
			value: newCharValue.split(',').map((v) => v.trim()),
		};

		setAlbum({
			...album,
			characteristics: [...album.characteristics, newChar],
		});

		setNewCharCode('');
		setNewCharValue('');
	};

	const removeCharacteristic = (index: number) => {
		setAlbum({
			...album,
			characteristics: album.characteristics.filter((_, i) => i !== index),
		});
	};

	const addPhoto = () => {
		const url = prompt('Введите URL фотографии:');
		if (url) {
			setAlbum({
				...album,
				albums: [...album.albums, url],
			});
		}
	};

	const removePhoto = (index: number) => {
		setAlbum({
			...album,
			albums: album.albums.filter((_, i) => i !== index),
		});
	};

	if (loading) {
		return <div className='text-creamy-white'>Загрузка...</div>;
	}

	return (
		<div className='max-w-4xl mx-auto space-y-6'>
			<h1 className='text-3xl font-bold text-creamy-white'>
				{isNew ? 'Создать альбом' : 'Редактировать альбом'}
			</h1>

			<form onSubmit={handleSubmit} className='space-y-6 bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div>
						<label className='block mb-2 text-creamy-white'>ID</label>
						<Input
							value={album.id}
							onChange={(e) => setAlbum({ ...album, id: e.target.value })}
							required
							className='bg-white/10 border-white/20 text-creamy-white'
						/>
					</div>

					<div>
						<label className='block mb-2 text-creamy-white'>Href (URL)</label>
						<Input
							value={album.href}
							onChange={(e) => setAlbum({ ...album, href: e.target.value })}
							required
							className='bg-white/10 border-white/20 text-creamy-white'
						/>
					</div>
				</div>

				<div>
					<label className='block mb-2 text-creamy-white'>Название</label>
					<Input
						value={album.title}
						onChange={(e) => setAlbum({ ...album, title: e.target.value })}
						required
						className='bg-white/10 border-white/20 text-creamy-white'
					/>
				</div>

				<div>
					<label className='block mb-2 text-creamy-white'>Путь к превью изображению</label>
					<Input
						value={album.src}
						onChange={(e) => setAlbum({ ...album, src: e.target.value })}
						required
						className='bg-white/10 border-white/20 text-creamy-white'
						placeholder='/assets/albums/img-1.avif'
					/>
				</div>

				<div>
					<label className='block mb-2 text-creamy-white'>Описание</label>
					<textarea
						value={album.description}
						onChange={(e) => setAlbum({ ...album, description: e.target.value })}
						rows={4}
						className='w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-creamy-white focus:outline-none focus:ring-2 focus:ring-deep-orange'
					/>
				</div>

				{/* Видео */}
				<div className='border-t border-white/20 pt-4'>
					<h3 className='text-xl font-bold text-creamy-white mb-4'>Видео (опционально)</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<label className='block mb-2 text-creamy-white'>URL видео (YouTube embed)</label>
							<Input
								value={album.video?.src || ''}
								onChange={(e) =>
									setAlbum({
										...album,
										video: album.video
											? { ...album.video, src: e.target.value }
											: { src: e.target.value, preview: '', alt: 'video', id: `video-${album.id || 'new'}` },
									})
								}
								className='bg-white/10 border-white/20 text-creamy-white'
								placeholder='https://www.youtube.com/embed/...'
							/>
						</div>
						<div>
							<label className='block mb-2 text-creamy-white'>Превью видео</label>
							<Input
								value={album.video?.preview || ''}
								onChange={(e) =>
									setAlbum({
										...album,
										video: album.video
											? { ...album.video, preview: e.target.value }
											: { src: '', preview: e.target.value, alt: 'video', id: `video-${album.id || 'new'}` },
									})
								}
								className='bg-white/10 border-white/20 text-creamy-white'
							/>
						</div>
					</div>
				</div>

				{/* Характеристики */}
				<div className='border-t border-white/20 pt-4'>
					<h3 className='text-xl font-bold text-creamy-white mb-4'>Характеристики</h3>
					<div className='space-y-2 mb-4'>
						{album.characteristics.map((char, index) => (
							<div key={index} className='flex items-center gap-2 bg-white/5 p-2 rounded'>
								<span className='text-creamy-white flex-1'>
									{char.code}: {char.value.join(', ')}
								</span>
								<button
									type='button'
									onClick={() => removeCharacteristic(index)}
									className='bg-red-500 text-white px-2 py-1 rounded text-sm'>
									Удалить
								</button>
							</div>
						))}
					</div>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
						<Input
							value={newCharCode}
							onChange={(e) => setNewCharCode(e.target.value)}
							placeholder='Код (category, camera...)'
							className='bg-white/10 border-white/20 text-creamy-white'
						/>
						<select
							value={newCharIcon}
							onChange={(e) => setNewCharIcon(e.target.value as IconName)}
							className='bg-white/10 border border-white/20 rounded px-3 py-2 text-creamy-white focus:outline-none focus:ring-2 focus:ring-deep-orange'>
							{ICON_OPTIONS.map((icon) => (
								<option key={icon} value={icon}>
									{icon}
								</option>
							))}
						</select>
						<div className='flex gap-2'>
							<Input
								value={newCharValue}
								onChange={(e) => setNewCharValue(e.target.value)}
								placeholder='Значения (через запятую)'
								className='bg-white/10 border-white/20 text-creamy-white flex-1'
							/>
							<button
								type='button'
								onClick={addCharacteristic}
								className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
								+
							</button>
						</div>
					</div>
				</div>

				{/* Фотографии */}
				<div className='border-t border-white/20 pt-4'>
					<h3 className='text-xl font-bold text-creamy-white mb-4'>Фотографии альбома</h3>
					<div className='grid grid-cols-2 md:grid-cols-3 gap-2 mb-4'>
						{album.albums.map((photo, index) => (
							<div key={index} className='relative group'>
								<img src={photo} alt={`Photo ${index + 1}`} className='w-full h-32 object-cover rounded' />
								<button
									type='button'
									onClick={() => removePhoto(index)}
									className='absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity'>
									×
								</button>
							</div>
						))}
					</div>
					<button
						type='button'
						onClick={addPhoto}
						className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
						+ Добавить фото
					</button>
				</div>

				<div className='flex gap-4 pt-4 border-t border-white/20'>
					<button
						type='submit'
						disabled={loading}
						className='flex-1 bg-deep-orange text-white py-2 px-4 rounded hover:bg-deep-orange/80 transition-colors disabled:opacity-50'>
						{loading ? 'Сохранение...' : 'Сохранить'}
					</button>
					<button
						type='button'
						onClick={() => router.push('/admin/albums')}
						className='flex-1 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors'>
						Отмена
					</button>
				</div>
			</form>
		</div>
	);
}

