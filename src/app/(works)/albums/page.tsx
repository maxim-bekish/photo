'use client';

import { AlbumCard } from '@/src/shared/components/home/AlbumCard';

import { useRef } from 'react';

import LayoutWorks from '../layoutWorks';
import { albumsList } from '@/src/shared/config/social';

export default function () {
	const itemRefs = useRef<HTMLAnchorElement[]>([]);

	const setItemRef = (el: HTMLAnchorElement | null) => {
		if (el && !itemRefs.current.includes(el)) {
			itemRefs.current.push(el);
		}
	};

	return (
		<LayoutWorks title={'Albums'} className='gap-10'>
			{albumsList.map(el => (
				<AlbumCard key={el.id} ref={setItemRef} item={el} className='h-[446px]' />
			))}
		</LayoutWorks>
	);
}
