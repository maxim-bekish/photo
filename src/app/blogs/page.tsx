'use client';

import { ArticlesItem } from '@/src/shared/types';
import LayoutPage from '../layoutPage';
import { ArticlesCard } from '@/src/shared/components/ui/Articles-card';
import { useRef } from 'react';
import { useCustomCursor } from '@/src/shared/hooks/useCustomCursor';
import { useMemo } from 'react';

const articlesList: ArticlesItem[] = [
	{
		id: '1',
		src: '/assets/expertise/img-1.avif',
		subTitle: 'Photography',
		message: '1 Elevate your photos with my signature color grading presets',
		badge: ['Photography', 'Travel', 'Life'],
	},
	{
		id: '2',
		src: '/assets/expertise/img-2.avif',
		subTitle: 'Photography',
		message: '2 The art of candid photography: capturing moments naturally',
		badge: ['Photography', 'Travel', 'Life', 'Life', 'Life', 'Life', 'Life', 'Travel', 'Travel'],
	},
	{
		id: '3',
		src: '/assets/expertise/img-3.avif',
		message: "3 Capturing the magic of golden hour: a photographer's guide",
		badge: ['Photography', 'Travel', 'Life'],
	},
	{
		id: '4',
		src: '/assets/expertise/img-1.avif',
		message: '4 Elevate your photos with my signature color grading presets',
		badge: ['Photography', 'Travel', 'Life'],
	},
	{
		id: '5',
		src: '/assets/expertise/img-2.avif',
		message: '5 Elevate your photos with my signature color grading presets',
		badge: ['Photography', 'Travel', 'Life'],
	},
	{
		id: '6',
		src: '/assets/expertise/img-3.avif',
		message: '6 Elevate your photos with my signature color grading presets',
		badge: ['Photography', 'Travel', 'Life'],
	},
	{
		id: '7',
		src: '/assets/expertise/img-1.avif',
		message: '7 Elevate your photos with my signature color grading presets',
		badge: ['Photography', 'Travel', 'Life'],
	},
	{
		id: '8',
		src: '/assets/expertise/img-2.avif',
		message: '8 Elevate your photos wth my signature color grading presets',
		badge: ['Photography', 'Travel', 'Life'],
	},
];

export default function () {
	const containerRef = useRef<HTMLDivElement>(null);
	const itemRefs = useRef<HTMLDivElement[]>([]);

	const setItemRef = (el: HTMLDivElement | null) => {
		if (el && !itemRefs.current.includes(el)) {
			itemRefs.current.push(el);
		}
	};

	// Используем хук для кастомного курсора
	const getElements = useMemo(() => () => itemRefs.current, []);
	useCustomCursor({ elements: getElements, text: 'read' });

	return (
		<LayoutPage title={'Blogs'}>
			<div className='flex flex-col gap-2.5 wrapper'>
				<ArticlesCard el={articlesList[0]} row big setItemRef={setItemRef} />
				<div ref={containerRef} className='grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5'>
					{articlesList.slice(1).map((el, index) => (
						<ArticlesCard key={el.id + index} el={el} setItemRef={setItemRef} />
					))}
				</div>
			</div>
    
		</LayoutPage>
	);
}
