'use client';

import { Star } from 'lucide-react';

export const CardReviews = ({ el, className }: { el: any; className?: string }) => {
	return (
		<div
			className={`flex  will-change-transform flex-col   gap-5 px-5 py-10 shrink-0 ${className}`}>
			<div className='flex flex-col gap-5'>
				<div className='w-16 h-16 relative'>
					<img className='w-16 h-16 rounded-full select-none' src={el.src} alt={el.name} />
					<div className='absolute top-0 left-0'>
						<div className='absolute bg-white w-2 h-px top-0 left-0'></div>
						<div className='absolute bg-white w-px h-2 top-0 right-0'></div>
					</div>
					<div className='absolute top-0 right-0'>
						<div className='absolute bg-white w-2 h-px top-0 right-0'></div>
						<div className='absolute bg-white w-px h-2 top-0 right-0'></div>
					</div>
					<div className='absolute bottom-0 left-0'>
						<div className='absolute bg-white w-2 h-px bottom-0 left-0'></div>
						<div className='absolute bg-white w-px h-2 bottom-0 right-0'></div>
					</div>
					<div className='absolute bottom-0 right-0'>
						<div className='absolute bg-white w-2 h-px bottom-0 right-0'></div>
						<div className='absolute bg-white w-px h-2 bottom-0 right-0'></div>
					</div>
				</div>
				<p className='p-s text-creamy-white text-satoshi select-none'>{el.message}</p>
			</div>
			<div className='flex flex-col gap-1 pt-5 mt-auto border-t border-white/10'>
				<p className='body3 text-creamy-white font-display select-none'>{el.name}</p>
				<p className='font-satoshi text-creamy-white text-[13px] leading-[150%] tracking-[-0.02em] select-none'>
					{el.role}
				</p>

				<div className='flex gap-1'>
					{Array.from({ length: 5 }).map((_, i) => (
						<Star
							key={i}
							className={`w-4 h-4 ${
								i < el.rating ? 'text-deep-orange fill-deep-orange' : 'text-white/20'
							}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
