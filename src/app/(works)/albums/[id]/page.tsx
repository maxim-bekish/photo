'use client';

import { Title } from './Title';
import { Characteristics } from './Characteristics';
import { AlbumItem } from '@/src/shared/types';

const album: AlbumItem = {
	href: 'colorful-india',
	id: 'colorful-india',
	src: '/assets/albums/img-1.avif',
	alt: 'photo',
	title: 'Colorful India',
	characteristics: [
		{ icon:"focus", code: 'Category', value: ['Travel'] },
		{ icon:"triangle", code: 'ProjectType', value: ['Collaboration'] },
		{ icon:"camera", code: 'Camera', value: ['Fujifilm X-T4'] },
		{ icon:"aperture", code: 'Lenses', value: ['Fujinon XF 23mm f/1.4 R', 'Fujinon XF 35mm f/2 R WR'] },
		{ icon:"monitor-smartphone", code: 'OtherDevices', value: ['Mavic Air'] },
		{ icon:"map-pin", code: 'Location', value: ['India'] },
		{ icon:"calendar", code: 'Time', value: ['March 2024'] },
		{ icon:"user", code: 'Client', value: ['India Tourism'] },
	],
	video: {
		href: 'https://www.youtube.com/embed/fd5FD-ra53M?si=Zq14LahnomjXm-Tt',
		preview: '/assets/albums/img-1.avif',
	},
	description:
		"To capture the vibrant life, culture, and diversity of India's streets through a collaborative travel photography project. The aim was to document everyday moments, unique street scenes, and cultural events, showcasing the essence of Indian street life.",

	albums: ['/assets/albums/img-1.avif', '/assets/albums/img-2.avif', '/assets/albums/img-3.avif'],
};

export default function () {
	return (
		<main>
			<Title title={album.title} src={album.src} />
			<Characteristics characteristics={album.characteristics} description={album.description} />
		</main>
	);
}
