'use client';

import { useRef, useLayoutEffect, use } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import { Button } from '../shared/components/ui/button';
import { AboutCard } from '../shared/components/ui/about-card';
import { useInertialScroll } from './useInertialScroll';
import { Brands } from '../shared/components/home/Brands';
import { Albums } from '../shared/components/home/Albums';
import { Expertise } from '../shared/components/home/Expertise';
import { Clients } from '../shared/components/home/Clients';

export default function Home() {
	gsap.registerPlugin(ScrollTrigger);

	const videoRef = useRef<HTMLVideoElement | null>(null);
	const aboutBlockRef = useRef<HTMLDivElement | null>(null);
	const lineScrollRef = useRef<HTMLDivElement | null>(null);

	useInertialScroll();

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

			gsap.to(lineScrollRef.current, {
				opacity: 0,
				scrollTrigger: {
					trigger: 'body', // или любой другой блок
					start: 'top top',
					end: () => window.innerHeight * 0.5,
					scrub: true,
				},
			});
		});
		return () => {
			ctx.revert();
		};
	}, []);

	return (
		<>
			<div className='relative'>
				{/* Overlay с текстом и кнопками */}
				<div className='absolute mix-blend-exclusion pt-32.5 pb-12.5 px-10 h-screen w-full flex justify-between z-10 flex-col'>
					<div className='max-w-[400px] ml-auto flex flex-col items-end gap-5'>
						<p className='text-right font-satoshi p-s'>
							HI, FINNEGAN MONROE HERE. I’M A FREELANCE PHOTOGRAPHER IN NY AND THE SHUTTERBUG
							CAPTURING LIFE'S MAGICAL MOMENTS ONE CLICK AT A TIME.
						</p>
						<Button variant={'outline'} label={'get template'} />
					</div>
					<div className='flex flex-col gap-8'>
						<div>
							<h1 className='h1'>
								Capturing Life's Best <br /> Moments
							</h1>
						</div>
						<div
							ref={lineScrollRef}
							className='uppercase flex justify-between items-center pb-2.5 w-full border-b border-white/50'>
							<p className='body1'>FINNEGAN MONROE PHOTOGRAPHY</p>
							<p className='flex gap-1 body1 items-center'>
								<ArrowDown size={12} className='animate-bounce' />
								Scroll to Explore
							</p>
							<a className='body1 link' href='#'>
								WORK WITH ME
							</a>
						</div>
					</div>
				</div>

				{/* Видео */}
				<video
					ref={videoRef}
					autoPlay
					muted
					loop
					poster='/assets/poster-home-video.png'
					style={{
						filter: 'contrast(1.16) grayscale(1)  ',
						willChange: 'opacity, filter, transform',
					}}
					className='sticky  top-0 left-0 w-full h-screen object-cover'>
					<source src='/assets/home-video.mp4' type='video/mp4' />
				</video>

				{/* Блок About */}
				<div
					ref={aboutBlockRef}
					className='h-min flex flex-col items-center gap-7.5 relative pt-[500px] pb-[150px] px-10'>
					<div className='p-2.5 wrapper flex flex-col gap-2.5 border border-solid border-white/10'>
						<div className='flex row-1 flex-nowrap gap-2.5'>
							<AboutCard title='Hours Behind the Lens' value={9000} position='left' />
							<AboutCard title='Years of Experience' value={15} position='right' />
						</div>
						<div className='flex row-2 flex-nowrap gap-2.5'>
							<AboutCard title='Awards and Recognitions' value={13} position='right' />
							<AboutCard title='Happy Clients Served' value={200} position='left' />
						</div>
					</div>
					<div className='wrapper h-min flex flex-col gap-1 pt-25'>
						<div>
							<h2 className='h2-l text-deep-orange'>I am ...</h2>
						</div>
						<div className='ml-auto flex flex-col gap-11'>
							<p className='p-l font-satoshi font-light text-left w-[700px] text-creamy-white whitespace-pre-wrap leading-normal'>
								a passionate photographer dedicated to&nbsp;capturing life's most precious moments.
								With&nbsp;a keen eye for detail and a{' '}
								<span className='text-deep-orange font-satoshi'>love for storytelling</span>, I
								strive to create images that are not just beautiful, but that also evoke emotion and
								tell a compelling story.
							</p>
							<Button variant={'outline'} label={'More About Me'} />
						</div>
					</div>
				</div>
			</div>
			{/* <Brands />
			<Albums /> */}
			{/* <Expertise /> */}
			<Clients />

			{/* <div className='h-[1000px] bg-amber-600'></div> */}
		</>
	);
}
