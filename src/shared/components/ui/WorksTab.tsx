'use client';

import Link from 'next/link';
import { texts } from '@/src/shared/config/texts';
import { Clapperboard, Image } from 'lucide-react';
import { cn } from '../../lib/utils';
import { usePathname } from 'next/navigation';

const filters = [
	{
		id: 1,
		label: texts.works.photos,
		href: '/albums',
		icon: Image,
	},
	{
		id: 2,
		label: texts.works.videos,
		href: '/video',
		icon: Clapperboard,
	},
];

const duration = 'duration-300';

export const WorksTab = () => {
	const pathname = usePathname();

	return (
		<div className='p-2 border border-white/30 w-min border-solid flex gap-1'>
			{filters.map((el) => (
				<Link
					key={el.id}
					href={el.href}
					className={cn(
						'flex items-center gap-1 px-4 py-1.5 w-min',
						pathname.includes(el.href)
							? 'bg-deep-orange text-black cursor-default'
							: 'text-creamy-white opacity-60 hover:opacity-75 transition-all',
						duration
					)}>
					<el.icon />
					<p className='p-s'>{el.label}</p>
				</Link>
			))}
		</div>
	);
};
