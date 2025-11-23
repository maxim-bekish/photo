'use client';
import Link from 'next/link';
import { useRef } from 'react';

const navItems = [
	{ text: 'Home', href: '/' },
	{ text: 'About', href: '/about' },
	{ text: 'Works', href: '/works' },
	{ text: 'Reviews', href: '/reviews' },
	{ text: 'Blogs', href: '/blogs' },
	{ text: 'Contacts', href: '/contacts' },
];

export function FooterDown() {
	const marqueeRef = useRef<HTMLDivElement>(null);

	return (
		<div className='pt-[100px] flex flex-col'>
			<nav className='flex gap-8 justify-center'>
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
					<span className=' whitespace-nowrap shrink-0 pr-8'>Finnegan Monroe</span>
					<span className=' whitespace-nowrap shrink-0 pr-8'>Finnegan Monroe</span>
					<span className=' whitespace-nowrap shrink-0 pr-8'>Finnegan Monroe</span>
					<span className=' whitespace-nowrap shrink-0 pr-8'>Finnegan Monroe</span>
				</div>
			</div>
		</div>
	);
}
