'use client';
import Link from 'next/link';
import { useRef } from 'react';
import { navItems } from '../../config/nav';

const title = ' Maxa Max : ';
export function FooterDown() {
	const marqueeRef = useRef<HTMLDivElement>(null);

	return (
		<div className='pt-15 md:pt-[100px] flex flex-col'>
			<nav className='flex gap-5 md:gap-8 justify-center flex-col md:flex-row items-center'>
				{navItems.map(el => (
					<Link
						key={el.text}
						href={el.href}
						className='f-nav hover:text-deep-orange hover:underline transition-colors duration-600'>
						{el.text}
					</Link>
				))}
			</nav>
			<div ref={marqueeRef} className='flex will-change-transform overflow-hidden'>
				<div className='select-none f-XXL animate-marquee-infinite flex -mb-8'>
					{Array.from({ length: 4 }).map((_, index) => (
						<span key={index} className=' whitespace-nowrap shrink-0 pr-8'>
							{title}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
