'use client';

import { default as NextImage } from 'next/image';
import { cn } from '@/src/shared/lib/utils';

type VideoCardProps = {
	id: string;
	src: string;
	alt: string;
	preview?: string;
	isPlayed?: boolean;
	onPlay?: (id: string) => void;
};

const PlayIcon = ({ className }: { className?: string }) => (
	<svg className={className} height='100%' version='1.1' viewBox='0 0 68 48' width='100%'>
		<path
			d='M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z'
			fillOpacity='0.8'></path>
		<path d='M 45,24 27,14 27,34' fill='white'></path>
	</svg>
);

const getVideoSrcWithAutoplay = (src: string) => {
	const url = new URL(src);
	url.searchParams.set('autoplay', '1');
	url.searchParams.set('mute', '0');
	return url.toString();
};

export default function VideoCard({
	id,
	preview,
	src,
	alt,
	isPlayed,
	onPlay,
	className,
}: VideoCardProps & { className?: string }) {
	const hasPreview = !!preview;
	const handlePlay = () => onPlay?.(id);

	if (!hasPreview) {
		return (
			<div className={cn('relative h-auto aspect-[1.77/1]', className)}>
				<article className='w-full h-full'>
					<iframe
						width='100%'
						height='100%'
						src={src}
						title='YouTube video player'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						referrerPolicy='strict-origin-when-cross-origin'
						allowFullScreen></iframe>
				</article>
			</div>
		);
	}

	return (
		<div className={cn('relative h-auto group aspect-[1.77/1]', className)}>
			{!isPlayed ? (
				<div className='cursor-pointer w-full h-full' onClick={handlePlay}>
					<NextImage
						className='w-full h-full object-cover absolute top-0 left-0'
						src={preview}
						alt={alt}
						width={560}
						height={315}
					/>
					<button
						type='button'
						className='absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 w-[68px] h-[48px]'>
						<PlayIcon className='group-hover:fill-black transition-all fill-black/70' />
					</button>
				</div>
			) : (
				<article className='w-full h-full'>
					<iframe
						width='100%'
						height='100%'
						src={getVideoSrcWithAutoplay(src)}
						title='YouTube video player'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						referrerPolicy='strict-origin-when-cross-origin'
						allowFullScreen></iframe>
				</article>
			)}
		</div>
	);
}
