'use client';

import { AlbumCard } from '@/src/shared/components/home/AlbumCard';
import { useRef, useEffect, useState } from 'react';
import LayoutWorks from '../layoutWorks';
import { AlbumItem } from '@/src/shared/types';

export default function () {
	const [albumsList, setAlbumsList] = useState<AlbumItem[]>([]);
	const [loading, setLoading] = useState(true);
	const itemRefs = useRef<HTMLAnchorElement[]>([]);

	useEffect(() => {
		fetch('/api/albums')
			.then((res) => res.json())
			.then((data) => {
				setAlbumsList(data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	const setItemRef = (el: HTMLAnchorElement | null) => {
		if (el && !itemRefs.current.includes(el)) {
			itemRefs.current.push(el);
		}
	};

	if (loading) {
		return (
			<LayoutWorks title={'Albums'} className='gap-10'>
				<div className='text-creamy-white text-center py-20'>Загрузка...</div>
			</LayoutWorks>
		);
	}

	return (
		<LayoutWorks title={'Albums'} className='gap-10'>
			{albumsList.map((el) => (
				<AlbumCard key={el.id} ref={setItemRef} item={el} className='h-[446px]' />
			))}
		</LayoutWorks>
	);
}
