'use client';

import { AlbumCard } from '@/src/shared/components/home/AlbumCard';
import { useRef } from 'react';
import LayoutWorks from '../layoutWorks';
import { useAlbums } from '@/src/hooks/queries/useAlbums';
import { Skeleton } from '@/src/shared/components/ui/skeleton';

export default function () {
	const itemRefs = useRef<HTMLAnchorElement[]>([]);

	const { data: albums, isLoading } = useAlbums();

	const setItemRef = (el: HTMLAnchorElement | null) => {
		if (el && !itemRefs.current.includes(el)) {
			itemRefs.current.push(el);
		}
	};

	if (isLoading) {
		return (
			<LayoutWorks title={'Albums'} className='gap-10'>
				<Skeleton className='h-[446px]' />
				<Skeleton className='h-[446px]' />
				<Skeleton className='h-[446px]' />
				<Skeleton className='h-[446px]' />
			</LayoutWorks>
		);
	}

	return (
		<LayoutWorks title={'Albums'} className='gap-10'>
			{albums ? (
				albums.map(el => <AlbumCard key={el.id} ref={setItemRef} item={el} className='h-[446px]' />)
			) : (
				<div>Альбомы не найдены</div>
			)}
		</LayoutWorks>
	);
}
