'use client';

import Image from 'next/image';

export const Title = ({ title, src }: { title: string; src: string }) => {
	return (
		// pt — отступ под фиксированную шапку сайта
		<section className='px-(--px) pt-[100px] xl:py-20 flex-col flex relative items-center'>
			{/* На мобильном 3:1 даёт узкую полоску — делаем картинку выше */}
			<div className='aspect-4/3 md:aspect-2/1 xl:aspect-3/1 w-full h-auto overflow-hidden relative'>
				<Image className='object-cover' src={src} alt={title} fill sizes='100vw' preload />
			</div>
			{/* На мобильном заголовок под картинкой, с md — поверх её нижнего края */}
			<div className='w-full mt-5 md:mt-0 md:w-auto md:absolute md:bottom-0'>
				<h1 className='h1 text-creamy-white wrap-break-word'>{title}</h1>
			</div>
		</section>
	);
};
