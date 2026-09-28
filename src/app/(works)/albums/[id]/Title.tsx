'use client';

import Image from 'next/image';

export const Title = ({ title, src }: { title: string; src: string }) => {
	return (
		<section className='px-(--px) xl:py-20  flex-col flex  relative items-center '>
			<div className='aspect-3/1 w-full h-auto overflow-hidden relative'>
				<Image className='object-cover' src={src} alt={title} fill sizes='100vw' preload />
			</div>
			<div className='absolute bottom-0 '>
				<h1 className='h1 text-creamy-white'>{title}</h1>
			</div>
		</section>
	);
};
