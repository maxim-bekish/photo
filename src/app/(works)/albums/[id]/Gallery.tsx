'use client';

import VideoCard from '@/src/shared/components/video/VideoCard';
import type { AlbumItem } from '@/src/shared/types';

export const Gallery = ({
	gallery,
	videos,
}: {
	gallery: AlbumItem['gallery'];
	videos: AlbumItem['videos'];
}) => {
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

			{videos.length && <VideoCard className='wrapper max-h-[700px]' {...videos[0]} />}
		</section>
	);
};
