'use client';

import { useState } from 'react';

import VideoCard from '@/src/shared/components/video/VideoCard';
import LayoutWorks from '../layoutWorks';

const videosList = [
	{
		id: 'video-colorful-india',
		// preview: '/assets/albums/img-1.avif',
		src: 'https://www.youtube.com/embed/fd5FD-ra53M?si=Zq14LahnomjXm-Tt',
		alt: 'video',
	},
	{
		id: 'video-echoes-of-dreams',
		// preview: '/assets/albums/img-1.avif',
		src: 'https://www.youtube.com/embed/fd5FD-ra53M?si=Zq14LahnomjXm-Tt',
		alt: 'video',
	},
	{
		id: 'video-wings-of-freedom',
		preview: '/assets/albums/img-2.avif',
		src: 'https://www.youtube.com/embed/fd5FD-ra53M?si=Zq14LahnomjXm-Tt',
		alt: 'video',
	},
	{
		id: 'video-crafted-perfection',
		preview: '/assets/albums/img-3.avif',
		src: 'https://www.youtube.com/embed/fd5FD-ra53M?si=Zq14LahnomjXm-Tt',
		alt: 'video',
	},
	{
		id: 'video-wild-wonders',
		preview: '/assets/albums/img-4.avif',
		src: 'https://www.youtube.com/embed/fd5FD-ra53M?si=Zq14LahnomjXm-Tt',
		alt: 'video',
	},
];

export default function () {
	const [playedVideos, setPlayedVideos] = useState<Set<string>>(new Set());

	const handleVideoClick = (videoId: string) => {
		setPlayedVideos(prev => new Set(prev).add(videoId));
	};

	return (
		<LayoutWorks title={'Videos'} className='gap-2'>
			{videosList.map(el => {
				return (
					<VideoCard
						key={el.id}
						{...el}
						isPlayed={playedVideos.has(el.id)}
						onPlay={handleVideoClick}
					/>
				);
			})}
		</LayoutWorks>
	);
}
