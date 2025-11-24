'use client';

import { ArrowDown } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';


export const ScrollIndicator = () => {
  gsap.registerPlugin(ScrollTrigger);

	const lineScrollRef = useRef<HTMLDivElement | null>(null);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
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
	);
};
