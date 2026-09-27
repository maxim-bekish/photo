'use client';

import { texts } from '@/src/shared/config/texts';
import { ArrowDown } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useSettings } from '@/src/hooks/queries/useSiteContent';

export const ScrollIndicator = () => {
	gsap.registerPlugin(ScrollTrigger);

	const lineScrollRef = useRef<HTMLDivElement | null>(null);
	const { data: settings } = useSettings();
	const fullName = [settings?.first_name, settings?.last_name].filter(Boolean).join(' ');

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.to(lineScrollRef.current, {
				opacity: 0,
				scrollTrigger: {
					trigger: 'body',
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
			className='uppercase hidden md:flex justify-between items-center pb-2.5 w-full border-b border-white/50'>
			<p className='body1'>{fullName && `${fullName} — ${texts.common.photographer}`}</p>
			<p className='flex gap-1 body1 items-center'>
				<ArrowDown size={12} className='animate-bounce' />
				{texts.scrollIndicator.scroll}
			</p>
			<a className='body1 link' href='/contacts'>
				{texts.scrollIndicator.cooperate}
			</a>
		</div>
	);
};
