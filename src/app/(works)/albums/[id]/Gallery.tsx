'use client';

import VideoCard from '@/src/shared/components/video/VideoCard';
import type { AlbumItem } from '@/src/shared/types';
import { useState } from 'react';

export const Gallery = ({
	album,
	video,
}: {
	album: AlbumItem['albums'];
	video: AlbumItem['video'];
}) => {
	const [playedVideos, setPlayedVideos] = useState<Set<string>>(new Set());

	const handleVideoClick = (videoId: string) => {
		setPlayedVideos(prev => new Set(prev).add(videoId));
	};

	return (
		<section className='px-(--px) flex items-center flex-col gap-2.5'>
			<div className='wrapper flex gap-2.5 flex-col md:flex-row relative'>
				<div className='flex flex-col gap-2.5 md:sticky md:top-0 h-min'>
					{album.map((item, i) => {
						if (i % 2 === 0) {
							return <img key={item} src={item} alt={item} />;
						}
					})}
				</div>
				<div className='flex flex-col gap-2.5 md:sticky md:top-0 h-min'>
					{album.map((item, i) => {
						if (i % 2 !== 0) {
							return <img key={item} src={item} alt={item} />;
						}
					})}
				</div>
			</div>

			{video && (
				<VideoCard
					className='wrapper max-h-[700px]'
					{...video}
					isPlayed={playedVideos.has(video.id)}
					onPlay={handleVideoClick}
				/>
			)}
		</section>
	);
};
