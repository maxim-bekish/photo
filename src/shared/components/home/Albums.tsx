'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { AlbumCard } from './AlbumCard';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
interface AlbumItem {
	id: string;
	href: string;
	src: string;
	alt: string;
	title: string;
	badges: string[];
}
export const Albums = () => {
	const titleRef = useRef<HTMLHeadingElement>(null);
	const itemRefs = useRef<HTMLAnchorElement[]>([]);
	const albumsRef = useRef<HTMLDivElement>(null);

	const setItemRef = (el: HTMLAnchorElement | null) => {
		if (el && !itemRefs.current.includes(el)) {
			itemRefs.current.push(el);
		}
	};
	useEffect(() => {
		const cursor = document.getElementById('cursor-custom');
		if (!cursor) return;

		let posX = 0;
		let posY = 0;

		const moveCursor = (e: MouseEvent) => {
			posX = e.clientX - cursor.offsetWidth / 2;
			posY = e.clientY - cursor.offsetHeight / 2;
		};

		// слушаем глобально
		window.addEventListener('mousemove', moveCursor);

		const animate = () => {
			gsap.to(cursor, {
				x: posX,
				y: posY,
				duration: 0.4,
				ease: 'power3.out',
			});
			requestAnimationFrame(animate);
		};
		animate();

		const showCursor = () => gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.2 });
		const hideCursor = () => gsap.to(cursor, { opacity: 0, scale: 0.6, duration: 0.2 });

		itemRefs.current.forEach((item) => {
			item.addEventListener('mouseenter', showCursor);
			item.addEventListener('mouseleave', hideCursor);
		});
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
					end: `+=${albumsRef.current?.offsetHeight}`, // сколько он «держится» фиксированным
					pin: true, // фиксируем элемент
					pinSpacing: false, // страница продолжает скролл поверх
					scrub: true,
				},
			},
		);
		return () => {
			window.removeEventListener('mousemove', moveCursor);

			itemRefs.current.forEach((item) => {
				item.removeEventListener('mouseenter', showCursor);
				item.removeEventListener('mouseleave', hideCursor);
			});
		};
	}, []);

	return (
		<div className='flex flex-col flex-nowrap relative items-center wrapper mx-auto'>
			<div className='flex items-center justify-center h-screen'>
				<h2 ref={titleRef} className='h2-l text-deep-orange'>
					Albums
				</h2>
			</div>
			<div ref={albumsRef} className='flex max-w-[1440px] w-full flex-col gap-[174px] pb-[200px] '>
				<section className='flex items-center justify-center px-[100px]'>
					<AlbumCard
						item={{
							id: 'hbvhjw',
							href: '#',
							src: '/assets/albums/img-1.avif',
							alt: 'photo',
							title: 'Colorful India',
							badges: ['Travel', 'Collaboration'],
						}}
						className='h-[446px] w-[632px]'
						ref={setItemRef}
					/>
				</section>
				<section className='flex items-center justify-left px-[100px]'>
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
						className='h-[446px] w-[718px]'
					/>
				</section>
				<section className='flex items-center justify-between px-10'>
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
						className='h-[446px] w-[451px]'
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
						className='h-[716px] w-[505px]'
					/>
				</section>
				<section className='flex items-center justify-center px-[100px]'>
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
						className='h-[446px] w-[653px]'
					/>
				</section>
			</div>
		</div>
	);
};
