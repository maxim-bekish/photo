'use client';

import VideoCard from '@/src/shared/components/video/VideoCard';
import type { AlbumItem } from '@/src/shared/types';
import { useState } from 'react';

export const Gallery = ({
	gallery,
	videoSrc,
	videoPreview,
}: {
	gallery: AlbumItem['gallery'];
	videoSrc: AlbumItem['videoSrc'];
	videoPreview: AlbumItem['videoPreview'];
}) => {
	const [playedVideos, setPlayedVideos] = useState<Set<string>>(new Set());

	const handleVideoClick = (videoId: string) => {
		setPlayedVideos(prev => new Set(prev).add(videoId));
	};

	return (
		<section className='px-(--px) flex items-center flex-col gap-2.5'>
			<div className='wrapper flex gap-2.5 flex-col md:flex-row relative'>
				<div className='flex flex-col gap-2.5 md:sticky md:top-0 h-min'>
					{gallery.map((item, i) => {
						if (i % 2 === 0) {
							return <img key={item.gallery_id} src={item.src} alt={item.src} />;
						}
					})}
				</div>
				<div className='flex flex-col gap-2.5 md:sticky md:top-0 h-min'>
					{gallery.map((item, i) => {
						if (i % 2 !== 0) {
							return <img key={item.gallery_id} src={item.src} alt={item.src} />;
						}
					})}
				</div>
			</div>

			{/* {video && (
				<VideoCard
					className='wrapper max-h-[700px]'
            src={videoSrc}
            preview={videoPreview}
					isPlayed={playedVideos.has(video.id)}
					onPlay={handleVideoClick}
				/>
			)} */}
		</section>
	);
};
