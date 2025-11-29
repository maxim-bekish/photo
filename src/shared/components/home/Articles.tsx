'use client';

import { useBreakpoint } from '@/src/shared/hooks/useBreakpoint';
import { useCustomCursor } from '@/src/shared/hooks/useCustomCursor';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { useMemo, useRef } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface ArticlesItem {
	id: string;
	src: string;
	message: string;
	badge: string[];
}

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
			badge: ['Photography', 'Travel', 'Life', 'Travel', 'Travel', 'Travel'],
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

	const renderCard = (el: ArticlesItem, index: number) => (
		<div
			ref={setItemRef}
			key={`${el.id}-${index}`}
			className='flex cursor-pointer group   flex-col gap-1 shrink-0'>
			<div className='h-[250px] overflow-hidden shrink-0'>
				<img
					className='w-full h-full object-cover group-hover:scale-110 transition-all duration-1000'
					src={el.src}
					alt='img-article'
				/>
			</div>
			<div className='flex flex-col bg-white/10 p-4 gap-2.5 h-full  '>
				<h3
					className='h3-s text-creamy-white overflow-hidden text-ellipsis'
					style={{
						display: '-webkit-box',
						WebkitLineClamp: 3,
						WebkitBoxOrient: 'vertical',
						minHeight: 'calc(1em * 1.3 * 3)', // или minHeight: '78px'
					}}>
					{el.message}
				</h3>
				<div className='flex gap-2.5'>
					{el.badge.map((badge, index) => (
						<Badge variant='secondary' key={index}>
							{badge}
						</Badge>
					))}
				</div>
			</div>
		</div>
	);

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
							.map((el, index) => renderCard(el, index))}
					</div>
				</div>
				<div>
					<Button variant={'outline'} label={'all blogs '} />
				</div>
			</div>
		</div>
	);
};
