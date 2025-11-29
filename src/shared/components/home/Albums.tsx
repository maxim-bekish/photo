'use client';

import { useCustomCursor } from '@/src/shared/hooks/useCustomCursor';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useMemo, useRef } from 'react';
import { AlbumCard } from './AlbumCard';

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
	useCustomCursor({ elements: getElements, text: 'view' });

	useEffect(() => {
		const title = titleRef.current;
		if (!title && !albumsRef) return;
		gsap.fromTo(
			title,
			{ filter: 'blur(0px)' },
			{
				filter: 'blur(5px)',
				scrollTrigger: {
					trigger: title,
					start: 'top 50%',
					end: '+=600', // блюр закончится через 300px
					scrub: true,
				},
			}
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
					end: `+=${albumsRef.current?.offsetHeight}`, // сколько он «держится» фиксированным
					pin: true, // фиксируем элемент
					pinSpacing: false, // страница продолжает скролл поверх
					scrub: true,
				},
			}
		);
	}, []);

	return (
		<div className='flex flex-col flex-nowrap relative items-center wrapper mx-auto'>
			<div className='flex items-center justify-center h-[50vh]'>
				<h2 ref={titleRef} className='h2-l text-deep-orange'>
					Albums
				</h2>
			</div>
			<div
				ref={albumsRef}
				className='flex max-w-[1440px] w-full flex-col gap-7.5 md:gap-15 xl:gap-[174px] pb-7.5 pt-7.5 xl:pt-0 xl:pb-[200px] '>
				<section className='flex items-center justify-center px-(--px) xl:px-[100px]'>
					<AlbumCard
						item={{
							id: 'hbvhjw',
							href: '#',
							src: '/assets/albums/img-1.avif',
							alt: 'photo',
							title: 'Colorful India',
							badges: ['Travel', 'Collaboration'],
						}}
						className='h-[446px] w-full xl:w-[632px]'
						ref={setItemRef}
					/>
				</section>
				<section className='flex items-center justify-left px-(--px) xl:px-[100px]'>
					<AlbumCard
						ref={setItemRef}
						item={{
							id: 'hbvhewvcejw',
							href: '#',
							src: '/assets/albums/img-2.avif',
							alt: 'photo',
							title: 'Echoes of Dreams',
							badges: ['Conceptual', 'Commercial'],
						}}
						className='h-[446px] w-full xl:w-[718px]'
					/>
				</section>
				<section className='flex items-center justify-between flex-col md:flex-row px-(--px) gap-7.5 md:gap-15'>
					<AlbumCard
						ref={setItemRef}
						item={{
							id: 'hbvhafajw',
							href: '#',
							src: '/assets/albums/img-3.avif',
							alt: 'photo',
							title: 'Wings of Freedom',
							badges: ['Aerial & Drone', 'Passion Project'],
						}}
						className='h-[446px] w-full xl:w-[451px]'
					/>
					<AlbumCard
						ref={setItemRef}
						item={{
							id: 'hbvjhymhjw',
							href: '#',
							src: '/assets/albums/img-4.avif',
							alt: 'photo',
							title: 'Crafted Perfection',
							badges: ['Product', 'Commercial'],
						}}
						className='h-[446px] xl:h-[716px] w-full xl:w-[505px]'
					/>
				</section>
				<section className='flex items-center justify-center px-(--px) xl:px-[100px]'>
					<AlbumCard
						ref={setItemRef}
						item={{
							id: 'hbvacachjw',
							href: '#',
							src: '/assets/albums/img-5.avif',
							alt: 'photo',
							title: 'Wild Wonders',
							badges: ['Wildlife & Nature', 'Passion Project'],
						}}
						className='h-[446px] w-full xl:w-[653px]'
					/>
				</section>
			</div>
		</div>
	);
};
