'use client';

import { useBreakpoint } from '@/src/shared/hooks/useBreakpoint';
import { useCustomCursor } from '@/src/shared/hooks/useCustomCursor';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { useMemo, useRef } from 'react';
import { Button } from '../ui/button';
import { ArticlesCard } from '../ui/Articles-card';
import { ArticlesItem } from '../../types';
import { useBlogs } from '@/src/hooks/queries/useBlogs';

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

	const { data: articlesList, isLoading } = useBlogs();

	if (isLoading) {
		return <div className='text-creamy-white'>Загрузка...</div>;
	}
	if (!articlesList) {
		return <div className='text-creamy-white'>Статьи не найдены</div>;
	}
	return (
		<div className='pt-15 pb-7.5  md:py-[150px] px-(--px) flex flex-col items-center'>
			<div className='wrapper flex flex-col items-center gap-10 md:gap-15'>
				<div className='flex flex-col w-full'>
					<h2 className='h2-s'>Вдохновляйтесь моими </h2>
					<h2 className='h2-l text-deep-orange ml-auto'>Статьями</h2>
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
