'use client';

import { SectionSkeleton } from '@/src/shared/components/ui/states';
import { texts } from '@/src/shared/config/texts';
import { useCustomCursor } from '@/src/shared/hooks/useCustomCursor';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useMemo, useRef } from 'react';
import { AlbumCard } from './AlbumCard';
import { cn } from '../../lib/utils';
import { apiResources } from '@/src/lib/api-resources';

gsap.registerPlugin(ScrollTrigger);

export const Albums = () => {
	const titleRef = useRef<HTMLHeadingElement>(null);
	const itemRefs = useRef<HTMLAnchorElement[]>([]);
	const albumsRef = useRef<HTMLDivElement>(null);

	const setItemRef = (el: HTMLAnchorElement | null) => {
		if (el && !itemRefs.current.includes(el)) {
			itemRefs.current.push(el);
		}
	};

	// Используем хук для кастомного курсора
	const getElements = useMemo(() => () => itemRefs.current, []);
	useCustomCursor({ elements: getElements, text: texts.cursor.open });

	const { data: albums, isLoading } = apiResources.albums.useQuery();

	useEffect(() => {
		const title = titleRef.current;
		const albumsBlock = albumsRef.current;

		if (!title || !albumsBlock) return;

		// context + revert: при размонтировании (и двойном запуске эффекта в Strict Mode)
		// анимации и pin удаляются, иначе на заголовке копятся дубли ScrollTrigger
		const ctx = gsap.context(() => {
			gsap.fromTo(
				title,
				{ filter: 'blur(0px)' },
				{
					filter: 'blur(5px)',
					scrollTrigger: {
						trigger: title,
						start: 'top 50%',
						end: '+=600', // блюр закончится через 600px
						scrub: true,
					},
				},
			);
			gsap.fromTo(
				title,
				{ opacity: 1, scale: 1 },
				{
					opacity: 0.9,
					scale: 1.2,
					scrollTrigger: {
						trigger: title,
						start: 'top 50%', // когда верх заголовка доходит до середины экрана
						end: `+=${albumsBlock.offsetHeight - 200}`, // сколько он «держится» фиксированным
						pin: true, // фиксируем элемент
						pinSpacing: false, // страница продолжает скролл поверх
						scrub: true,
					},
				},
			);
		});

		return () => ctx.revert();
	}, [isLoading, albums?.length]);

	if (isLoading) {
		return <SectionSkeleton className='h-[70vh]' />;
	}

	// Нет данных или ошибка загрузки — на лендинге просто не показываем секцию
	if (!albums?.length) {
		return null;
	}

	return (
		<div className='flex flex-col flex-nowrap relative items-center wrapper mx-auto'>
			<div className='flex items-center justify-center h-[50vh]'>
				<h2 ref={titleRef} className='h2-l text-deep-orange'>
					{texts.home.albumsTitle}
				</h2>
			</div>
			<div
				ref={albumsRef}
				className='flex max-w-[1440px] w-full flex-col gap-7.5 md:gap-15 xl:gap-[174px] pb-7.5 pt-7.5 xl:pt-0 xl:pb-[200px] '>
				<section className='flex items-center justify-center px-(--px) xl:px-[100px]'>
					<AlbumCard
						item={albums[0]}
						className='h-[446px] w-full xl:w-[632px]'
						ref={setItemRef}
					/>
				</section>
				<section className='flex items-center justify-left px-(--px) xl:px-[100px]'>
					<AlbumCard
						ref={setItemRef}
						item={albums[1]}
						className='h-[446px] w-full xl:w-[718px]'
					/>
				</section>
				<section className='flex items-center justify-between flex-col md:flex-row px-(--px) gap-7.5 md:gap-15'>
					<AlbumCard
						ref={setItemRef}
						item={albums[2]}
						className='h-[446px] w-full xl:w-[451px]'
					/>
					<AlbumCard
						ref={setItemRef}
						item={albums[3]}
						className='h-[446px] xl:h-[716px] w-full xl:w-[505px]'
					/>
				</section>

				<section className='flex items-center justify-center px-(--px) xl:px-[100px]'>
					<AlbumCard
						ref={setItemRef}
						item={albums[4]}
						className='h-[446px] w-full xl:w-[718px]'
					/>
				</section>

				{albums.slice(5).map((el, i) => {
					return (
						<section
							key={el.id}
							className={cn(
								'flex items-center px-(--px) jus xl:px-[100px]',
								i % 2 === 0 ? 'justify-start' : 'justify-end',
							)}>
							<AlbumCard
								ref={setItemRef}
								item={el}
								className='h-[446px] w-full xl:w-[653px]'
							/>
						</section>
					);
				})}
			</div>
		</div>
	);
};
