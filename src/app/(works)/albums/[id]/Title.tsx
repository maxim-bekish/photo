'use client';

export const Title = ({ title, src }: { title: string; src: string }) => {
	return (
		<section className='px-(--px) xl:py-20  flex-col flex  relative items-center '>
			<div className='aspect-3/1 w-full h-auto overflow-hidden'>
				<img className='w-full h-full object-cover' src={src} alt={title} />
			</div>
			<div className='absolute bottom-0 '>
				<h1 className='h1 text-creamy-white'>{title}</h1>
			</div>
		</section>
	);
};
