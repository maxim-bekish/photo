'use client';

import { ArrowUpRight } from 'lucide-react';
import { forwardRef } from 'react';
import { Badge } from '../ui/badge';

interface AlbumItem {
	id: string;
	href: string;
	src: string;
	alt: string;
	title: string;
	badges: string[];
}

interface Props {
	item: AlbumItem;
	className?: string;
}

export const AlbumCard = forwardRef<HTMLAnchorElement, Props>(({ item, className }, ref) => {
	return (
		<a
			ref={ref}
			href={item.href}
			className={`album-item relative flex flex-col gap-3 group [--corner-offset:-1.5rem] ${className}`}>
			<div className='flex-[1_0_0px] relative'>
				<img
					className='absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover'
					src={item.src}
					alt={item.alt}
				/>
			</div>

			<div className='flex flex-col gap-1 '>
				<div className='flex gap-2.5'>
					{item.badges.map((badge, i) => (
						<Badge key={i}>{badge}</Badge>
					))}
				</div>

				<div className='flex items-center justify-between'>
					<h3 className='h3'>{item.title}</h3>
					<ArrowUpRight strokeWidth={1.5} size={26} />
				</div>
			</div>

			{/* 4 corner decorations */}
			<div className='absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-(--corner-offset) group-hover:translate-y-(--corner-offset) transition-all duration-300'>
				<div className='relative'>
					<div className='bg-white w-[60px] h-px absolute top-0'></div>
					<div className='bg-white h-[60px] w-px absolute left-0'></div>
				</div>
			</div>

			<div className='absolute bottom-0 left-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-(--corner-offset) group-hover:-translate-y-(--corner-offset) transition-all duration-300'>
				<div className='relative'>
					<div className='bg-white h-[60px] w-px absolute bottom-0'></div>
					<div className='bg-white w-[60px] h-px absolute bottom-0'></div>
				</div>
			</div>

			<div className='absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 group-hover:-translate-x-(--corner-offset) group-hover:-translate-y-(--corner-offset) transition-all duration-300'>
				<div className='relative'>
					<div className='bg-white h-[60px] w-px absolute bottom-0'></div>
					<div className='bg-white w-[60px] h-px absolute right-0'></div>
				</div>
			</div>

			<div className='absolute top-0 right-0 opacity-0 group-hover:opacity-100 group-hover:-translate-x-(--corner-offset) group-hover:translate-y-(--corner-offset) transition-all duration-300'>
				<div className='relative'>
					<div className='bg-white h-[60px] w-px absolute top-0'></div>
					<div className='bg-white w-[60px] h-px absolute right-0'></div>
				</div>
			</div>
		</a>
	);
});

AlbumCard.displayName = 'AlbumCard';
