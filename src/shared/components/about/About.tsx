'use client';
import Image from 'next/image';
import { texts } from '@/src/shared/config/texts';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { useSettings } from '@/src/hooks/queries/useSiteContent';
import { highlight } from '../../lib/highlight';

export default function About() {
	gsap.registerPlugin(ScrollTrigger);
	const textRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const [currentImage, setCurrentImage] = useState(0);
	const { data: settings } = useSettings();
	const images = settings?.about_images ?? [];
	const imagesCount = images.length;

	useEffect(() => {
		if (imagesCount < 2) return;
		const interval = setInterval(() => {
			setCurrentImage((prev: number) => (prev + 1) % imagesCount);
		}, 8000);

		return () => {
			clearInterval(interval);
		};
	}, [imagesCount]);

	useLayoutEffect(() => {
		if (!textRef.current || !wrapperRef.current) return;

		const ctx = gsap.context(() => {
			// Принудительно устанавливаем начальное состояние
			gsap.set(textRef.current, { opacity: 1, scale: 1 });

			let scrollTrigger: ScrollTrigger | null = null;

			scrollTrigger = ScrollTrigger.create({
				trigger: wrapperRef.current,
				start: 'top top',
				end: 'bottom bottom+=400px',
				scrub: true,
				onUpdate: (self) => {
					if (textRef.current) {
						const progress = self.progress;
						gsap.set(textRef.current, {
							opacity: 1 - progress,
							scale: 1 - progress * 0.3,
						});
					}
				},
				onRefresh: () => {
					// При обновлении проверяем прогресс и сбрасываем к начальному состоянию, если нужно
					if (scrollTrigger && scrollTrigger.progress === 0 && textRef.current) {
						gsap.set(textRef.current, { opacity: 1, scale: 1 });
					}
				},
			});

			// Проверяем начальное состояние после создания и обновления
			const checkAndReset = () => {
				if (scrollTrigger && textRef.current) {
					scrollTrigger.refresh();
					if (scrollTrigger.progress === 0) {
						gsap.set(textRef.current, { opacity: 1, scale: 1 });
					}
				}
			};

			// Проверяем сразу и после небольшой задержки для надежности
			checkAndReset();
			setTimeout(checkAndReset, 0);
		});

		return () => {
			ctx.revert();
		};
	}, []);

	// Тексты подгружаются после монтирования — пересчитываем позиции ScrollTrigger
	useEffect(() => {
		ScrollTrigger.refresh();
	}, [settings]);

	const imgClass =
		'h-full w-full absolute top-0 border-0 left-0 right-0 transition-opacity duration-[3s]';

	return (
		<section ref={wrapperRef} className='flex wrapper flex-col gap-10 px-(--px) pb-[30px] md:pb-[100px]'>
			<div ref={textRef} className=' sticky top-0 h-screen flex items-center justify-center'>
				<p className='p-l  text-white/50 [&>span]:text-creamy-white t-wrap text-center max-w-[700px]'>
					{highlight(settings?.about_intro ?? '')}
				</p>
			</div>
			<div className='flex px-3 md:px-0 gap-10 flex-col md:flex-row   items-center'>
				<div className='flex-1 relative min-h-[60vh] w-full md:h-full '>
					{images.map((src, i) => (
						<div key={src + i} className={imgClass} style={{ opacity: currentImage === i ? 1 : 0 }}>
							<Image className='object-cover' src={src} alt='' fill sizes='(min-width: 768px) 50vw, 100vw' />
						</div>
					))}
				</div>
				<div className='flex flex-1 flex-col gap-22'>
					<p className='p-s text-creamy-white whitespace-pre-line'>{settings?.about_story}</p>

					<p className='p-l text-white/50 [&>span]:text-creamy-white'>
						{highlight(settings?.about_highlight ?? '')}
					</p>
					<p className='p-s text-creamy-white whitespace-pre-line'>{settings?.about_cta}</p>

					<Button variant={'outline'} className='mx-auto' href='/contacts' label={texts.common.contactMe} />
				</div>
			</div>
		</section>
	);
}
