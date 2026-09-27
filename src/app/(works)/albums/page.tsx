'use client';

import { EmptyState } from '@/src/shared/components/ui/states';
import { texts } from '@/src/shared/config/texts';
import { AlbumCard } from '@/src/shared/components/home/AlbumCard';
import { useRef } from 'react';
import LayoutWorks from '../layoutWorks';
import { useAlbums } from '@/src/hooks/queries/useAlbums';
import { Skeleton } from '@/src/shared/components/ui/skeleton';

export default function AlbumsPage() {
	const itemRefs = useRef<HTMLAnchorElement[]>([]);

	const { data: albums, isLoading, isError } = useAlbums();

	const setItemRef = (el: HTMLAnchorElement | null) => {
		if (el && !itemRefs.current.includes(el)) {
			itemRefs.current.push(el);
		}
	};

	if (isLoading) {
		return (
			<LayoutWorks title={texts.works.albumsTitle} className='gap-10'>
				<Skeleton className='h-[446px]' />
				<Skeleton className='h-[446px]' />
				<Skeleton className='h-[446px]' />
				<Skeleton className='h-[446px]' />
			</LayoutWorks>
		);
	}

	return (
		<LayoutWorks title={texts.works.albumsTitle} className='gap-10'>
			{isError ? (
				<EmptyState text={texts.common.loadError} />
			) : albums?.length ? (
				albums.map((el) => <AlbumCard key={el.id} ref={setItemRef} item={el} className='h-[446px]' />)
			) : (
				<EmptyState text={texts.works.albumsEmpty} />
			)}
		</LayoutWorks>
	);
}
