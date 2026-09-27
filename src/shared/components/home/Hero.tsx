'use client';

import { texts } from '@/src/shared/config/texts';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { AboutCard } from '../ui/about-card';
import { Button } from '../ui/button';
import { ScrollIndicator } from '../ui/ScrollIndicator';
import { useSettings, useStats } from '@/src/hooks/queries/useSiteContent';
import { highlight } from '../../lib/highlight';

export default function Hero() {
	gsap.registerPlugin(ScrollTrigger);

	const videoRef = useRef<HTMLVideoElement | null>(null);
	const aboutBlockRef = useRef<HTMLDivElement | null>(null);
	const { data: settings } = useSettings();
	const { data: stats = [] } = useStats();

	// Счётчики выводятся парами; в каждой следующей строке широкая карточка меняет сторону
	const statRows = Array.from({ length: Math.ceil(stats.length / 2) }, (_, i) => stats.slice(i * 2, i * 2 + 2));

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.to(videoRef.current, {
				opacity: 0,
				scrollTrigger: {
					trigger: videoRef.current,
					start: 'top top',
					endTrigger: aboutBlockRef.current,
					end: 'bottom bottom',
					scrub: true,
				},
			});
		});
		return () => {
			ctx.revert();
		};
	}, []);

	// После загрузки контента высота блока меняется — пересчитываем позиции ScrollTrigger
	useEffect(() => {
		ScrollTrigger.refresh();
	}, [settings, stats.length]);

	return (
		<div className='relative'>
			{/* Overlay с текстом и кнопками */}
			<div className='absolute mix-blend-exclusion py-[100px]  md:pt-32.5 md:pb-12.5 px-(--px) h-screen w-full flex justify-between z-10 flex-col-reverse md:flex-col'>
				<div className='max-w-[400px] ml-auto flex flex-col items-end gap-5'>
					<p className='text-right font-satoshi p-s whitespace-pre-line'>{settings?.hero_text}</p>
					<Button variant={'outline'} href='/contacts' label={texts.common.contactMe} />
				</div>
				<div className='flex flex-col gap-8'>
					<div>
						<h1 className='h1 wrap-break-word whitespace-pre-line'>{settings?.hero_title}</h1>
					</div>
					<ScrollIndicator />
				</div>
			</div>

			{/* Видео */}
			<video
				ref={videoRef}
				autoPlay
				muted
				playsInline
				loop
				src={settings?.hero_video || undefined}
				poster={settings?.hero_poster || undefined}
				style={{
					filter: 'contrast(1.16) grayscale(1)  ',
					willChange: 'opacity, filter, transform',
				}}
				className='sticky  top-0 left-0 w-full  h-screen object-cover'/>

			{/* Блок About */}
			<div
				ref={aboutBlockRef}
				className='h-min flex flex-col items-center gap-7.5 relative pt-[500px] pb-7.5 md:pb-[150px]  px-(--px)'>
				<div className='md:p-2.5 wrapper flex flex-col gap-2.5 md:border border-solid border-white/10 overflow-hidden'>
					{statRows.map((row, rowIndex) => (
						<div
							key={rowIndex}
							className={`flex row-${rowIndex + 1} md:flex-nowrap gap-2.5 flex-col md:flex-row`}>
							{row.map((stat, i) => (
								<AboutCard
									key={stat.id}
									title={stat.title}
									value={stat.value}
									position={(i + rowIndex) % 2 === 0 ? 'left' : 'right'}
								/>
							))}
						</div>
					))}
				</div>
				<div className='wrapper h-min flex flex-col gap-8 xl:gap-1 md:pt-25 md:pb-0 md:px-0 py-[30px] px-3'>
					<div>
						<h2 className='h2-l text-deep-orange'>{texts.home.aboutTitle}</h2>
					</div>
					<div className='ml-auto flex flex-col gap-11'>
						<p className='p-l font-satoshi font-light text-left w-full md:w-[700px] text-creamy-white whitespace-pre-wrap leading-normal'>
							{highlight(settings?.about_short ?? '', 'text-deep-orange font-satoshi')}
						</p>
						<Button variant={'outline'} href='/about' label={texts.home.moreAboutMe} />
					</div>
				</div>
			</div>
		</div>
	);
}
