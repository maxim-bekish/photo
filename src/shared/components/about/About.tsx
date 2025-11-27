'use client';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';

export default function About() {
	gsap.registerPlugin(ScrollTrigger);
	const textRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const [currentImage, setCurrentImage] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImage((prev: number) => (prev + 1) % 3);
		}, 8000);

		return () => {
			clearInterval(interval);
		};
	}, []);

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
				onUpdate: self => {
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

	const imgClass =
		'h-full w-full absolute top-0 border-0 left-0 right-0 transition-opacity duration-[3s]';

	return (
		<section ref={wrapperRef} className='flex flex-col gap-10 px-10 pb-[100px]'>
			<div ref={textRef} className=' sticky top-0 h-screen flex items-center justify-center'>
				<p className='p-l  text-white/50 [&>span]:text-creamy-white t-wrap text-center max-w-[700px]'>
					Hi there! I’m <span> Finnegan Manroe</span>, a passionate photographer based in the
					vibrant city of <span>Seattle</span>. With over a decade of experience behind the lens, I
					specialize in capturing <span>the unique beauty of life’s fleeting moments</span>, from
					intimate portraits and breathtaking landscapes to dynamic product shots and lively events.
				</p>
			</div>
			<div className='flex gap-10 h-screen items-center'>
				<div className='flex-1 relative h-full '>
					<div className={imgClass} style={{ opacity: currentImage === 0 ? 1 : 0 }}>
						<img className='w-full h-full' src='assets/about/about/img-1.avif' alt='' />
					</div>
					<div className={imgClass} style={{ opacity: currentImage === 1 ? 1 : 0 }}>
						<img className='w-full h-full' src='assets/about/about/img-2.avif' alt='' />
					</div>
					<div className={imgClass} style={{ opacity: currentImage === 2 ? 1 : 0 }}>
						<img className='w-full h-full' src='assets/about/about/img-3.avif' alt='' />
					</div>
				</div>
				<div className='flex flex-1 flex-col gap-22'>
					<p className='p-s text-creamy-white'>
						My journey into photography began as a curious child with a disposable camera,
						fascinated by the world’s colors and light. Over the years, this hobby transformed into
						a full-blown love affair with visual storytelling. Each click of the shutter is my way
						of freezing time, preserving emotions, and narrating stories that words alone can’t
						convey.
					</p>

					<p className='p-l text-white/50 [&>span]:text-creamy-white'>
						I’ve had the privilege of working with <span>amazing clients</span> and have been
						<span>honored with several awards</span> for my work.
					</p>
					<p className='p-s text-creamy-white'>
						Let’s create something extraordinary together. Whether you’re looking to capture a
						special moment, need stunning visuals for your brand, or simply want to explore the
						world through my lens, I’d love to hear from you!
						<br />
						<br />
						Feel free to reach out, and let’s make magic happen.
					</p>

					<Button variant={'outline'} label={'get template'} />
				</div>
			</div>
		</section>
	);
}
