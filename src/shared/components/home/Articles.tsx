'use client';

import { useBreakpoint } from '@/src/shared/hooks/useBreakpoint';
import { useCustomCursor } from '@/src/shared/hooks/useCustomCursor';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { useMemo, useRef } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ArticlesCard } from '../ui/Articles-card';
import { ArticlesItem } from '../../types';

gsap.registerPlugin(Observer);

export const Articles = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const itemRefs = useRef<HTMLDivElement[]>([]);
	const deviceType = useBreakpoint();

	const setItemRef = (el: HTMLDivElement | null) => {
		if (el && !itemRefs.current.includes(el)) {
			itemRefs.current.push(el);
		}
	};

	// Используем хук для кастомного курсора
	const getElements = useMemo(() => () => itemRefs.current, []);
	useCustomCursor({ elements: getElements, text: 'read' });

	const articlesList: ArticlesItem[] = [
		{
			id: '1',
			src: '/assets/expertise/img-1.avif',
			message: 'Elevate your photos with my signature color grading presets',
			badge: ['Photography', 'Travel', 'Life'],
		},
		{
			id: '2',
			src: '/assets/expertise/img-2.avif',
			message: 'The art of candid photography: capturing moments naturally',
			badge: ['Photography', 'Travel', 'Life', 'Travel', 'Travel'],
		},
		{
			id: '3',
			src: '/assets/expertise/img-3.avif',
			message: "Capturing the magic of golden hour: a photographer's guide",
			badge: ['Photography', 'Travel', 'Life'],
		},
		{
			id: '4',
			src: '/assets/expertise/img-1.avif',
			message: 'Elevate your photos with my signature color grading presets',
			badge: ['Photography', 'Travel', 'Life'],
		},
	];

	return (
		<div className='pt-15 pb-7.5  md:py-[150px] px-(--px) flex flex-col items-center'>
			<div className='wrapper flex flex-col items-center gap-10 md:gap-15'>
				<div className='flex flex-col w-full'>
					<h2 className='h2-s'>Stay inspired with my</h2>
					<h2 className='h2-l text-deep-orange ml-auto'>Insightful Articles</h2>
				</div>
				<div className='w-full overflow-hidden'>
					<div
						ref={containerRef}
						className='grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5'>
						{articlesList
							.slice(0, deviceType === 'mob' ? 2 : deviceType === 'tab' ? 2 : 3)
							.map((el, index) => (
								<ArticlesCard key={el.id + index} el={el} setItemRef={setItemRef} />
							))}
					</div>
				</div>
				<div>
					<Button variant={'outline'} label={'all blogs '} />
				</div>
			</div>
		</div>
	);
};
