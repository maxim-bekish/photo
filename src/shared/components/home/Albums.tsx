'use client';

import { useCustomCursor } from '@/src/shared/hooks/useCustomCursor';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AlbumCard } from './AlbumCard';
// import { albumsList } from '../../config/social';
import { cn } from '../../lib/utils';
import { AlbumItem } from '../../types';

gsap.registerPlugin(ScrollTrigger);

export const Albums = () => {
	const titleRef = useRef<HTMLHeadingElement>(null);
	const itemRefs = useRef<HTMLAnchorElement[]>([]);
	const albumsRef = useRef<HTMLDivElement>(null);

	const [albums, setAlbums] = useState<AlbumItem[]>([]);
	const [loading, setLoading] = useState(true);

	const setItemRef = (el: HTMLAnchorElement | null) => {
		if (el && !itemRefs.current.includes(el)) {
			itemRefs.current.push(el);
		}
	};

	// Используем хук для кастомного курсора
	const getElements = useMemo(() => () => itemRefs.current, []);
	useCustomCursor({ elements: getElements, text: 'view' });

	useEffect(() => {
		fetch('/api/albums')
			.then(res => res.json())
			.then(data => {
				setAlbums(data);
				setLoading(false);
			})
			.catch(error => {
				console.error('Ошибка загрузки альбомов:', error);
			});
	}, []);

	useEffect(() => {
		const title = titleRef.current;
		const albums = albumsRef.current;

		if (!title || !albums) return;

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
					end: `+=${albums.offsetHeight - 200}`, // сколько он «держится» фиксированным
					pin: true, // фиксируем элемент
					pinSpacing: false, // страница продолжает скролл поверх
					scrub: true,
				},
			}
		);
	}, [loading]);

	if (loading) {
		return <div className='text-creamy-white'>Загрузка...</div>;
	}

	return (
		<div className='flex flex-col flex-nowrap relative items-center wrapper mx-auto'>
			<div className='flex items-center justify-center h-[50vh]'>
				<h2 ref={titleRef} className='h2-l text-deep-orange'>
					Альбомы
				</h2>
			</div>
			<div
				ref={albumsRef}
				className='flex max-w-[1440px] w-full flex-col gap-7.5 md:gap-15 xl:gap-[174px] pb-7.5 pt-7.5 xl:pt-0 xl:pb-[200px] '>
				<section className='flex items-center justify-center px-(--px) xl:px-[100px]'>
					<AlbumCard item={albums[0]} className='h-[446px] w-full xl:w-[632px]' ref={setItemRef} />
				</section>
				<section className='flex items-center justify-left px-(--px) xl:px-[100px]'>
					<AlbumCard ref={setItemRef} item={albums[1]} className='h-[446px] w-full xl:w-[718px]' />
				</section>
				<section className='flex items-center justify-between flex-col md:flex-row px-(--px) gap-7.5 md:gap-15'>
					<AlbumCard ref={setItemRef} item={albums[2]} className='h-[446px] w-full xl:w-[451px]' />
					<AlbumCard
						ref={setItemRef}
						item={albums[3]}
						className='h-[446px] xl:h-[716px] w-full xl:w-[505px]'
					/>
				</section>

				<section className='flex items-center justify-center px-(--px) xl:px-[100px]'>
					<AlbumCard ref={setItemRef} item={albums[4]} className='h-[446px] w-full xl:w-[718px]' />
				</section>

				{albums.slice(5).map((el, i) => {
					return (
						<section
							key={el.id}
							className={cn(
								'flex items-center px-(--px) jus xl:px-[100px]',
								i % 2 === 0 ? 'justify-start' : 'justify-end'
							)}>
							<AlbumCard ref={setItemRef} item={el} className='h-[446px] w-full xl:w-[653px]' />
						</section>
					);
				})}
			</div>
		</div>
	);
};
