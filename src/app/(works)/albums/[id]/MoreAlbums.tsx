'use client';

import { AlbumCard } from '@/src/shared/components/home/AlbumCard';
import { Button } from '@/src/shared/components/ui/button';
import { useInfiniteSlider } from '@/src/shared/hooks/useInfiniteSlider';
import type { AlbumItem } from '@/src/shared/types';
import { useRef } from 'react';

export const MoreAlbums = ({ albums }: { albums: AlbumItem[] }) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const duplicatedAlbums = [...albums, ...albums, ...albums];
	useInfiniteSlider({
		containerRef,
		itemCount: albums.length,
		itemWidth: 370,
		gap: 40,
		duration: 30,
		direction: 'left',
		enableHoverPause: true,
		hoverSpeed: 0.3,
		getItemWidth: () => {
			if (window.innerWidth > 768) {
				return Math.min(370, window.innerWidth - 40);
			}
			return 350;
		},
	});

	return (
		<section className='flex items-center overflow-hidden gap-[35px] flex-col py-[150px]'>
			<h1 className='h1 text-center'>More Albums</h1>
			<div ref={containerRef} className='flex gap-10  py-10'>
				{duplicatedAlbums.map((album, i) => (
					<AlbumCard key={album.id + i} item={album} className='h-[446px] w-[370px] md:w-[370px]' />
				))}
			</div>

			<Button variant={'outline'} label={'all albums'} />
		</section>
	);
};
