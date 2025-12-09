'use client';

import { useRef } from 'react';
import { useInfiniteSlider } from '../../hooks/useInfiniteSlider';
import { Button } from '../ui/button';
import { CardReviews } from '../ui/CardReviews';

export const Clients = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	const clientsList = [
		{
			id: '1',
			src: '/assets/expertise/img-1.avif',
			message:
				'Он предоставил исключительные услуги по продуктовой фотографии для нашей последней коллекции. Внимание к деталям и креативный подход позволили создать изображения, которые идеально демонстрируют наши продукты. Настоятельно рекомендую!',
			name: 'Майкл Т.',
			role: 'Генеральный директор, Stellar Designs',
			rating: 0,
		},
		{
			id: '2',
			src: '/assets/expertise/img-2.avif',
			message:
				'Документальная фотография предназначена для того, чтобы информировать, обучать и вдохновлять, предоставляя правдивое и глубокое отображение мира.',
			name: 'Аврора Дженсен',
			role: 'Маркетинговый менеджер, Stellar Designs',
			rating: 2,
		},
		{
			id: '3',
			src: '/assets/expertise/img-3.avif',
			message:
				'Документальная фотография предназначена для того, чтобы информировать, обучать и вдохновлять, предоставляя правдивое и глубокое отображение мира.',
			name: 'Г. Монро',
			role: 'Директор по маркетингу',
			rating: 3,
		},
		{
			id: '4',
			src: '/assets/expertise/img-4.avif',
			message:
				'Документальная фотография предназначена для того, чтобы информировать, обучать и вдохновлять, предоставляя правдивое и глубокое отображение мира.',
			name: 'Майкл',
			role: 'Маркетинговый менеджер, Stellar Designs',
			rating: 4,
		},
	];

	// Дублируем список для бесшовного перехода
	const duplicatedList = [...clientsList, ...clientsList, ...clientsList];

	// Используем переиспользуемый хук для анимации слайдера
	useInfiniteSlider({
		containerRef,
		itemCount: clientsList.length,
		itemWidth: 350,
		gap: 10,
		duration: 20,
		direction: 'left',
		enableHoverPause: true,
		hoverSpeed: 0.3,
		getItemWidth: () => {
			if (window.innerWidth > 768) {
				return Math.min(350, window.innerWidth - 40);
			}
			return 350;
		},
	});

	return (
		<div className=' flex flex-col items-center md:py-[100px] xl:py-[150px]'>
			<div className='wrapper bg-white/5 border-white/10 border py-14 flex flex-col items-center gap-7'>
				<div className='flex flex-col items-center'>
					<h2 className='h2-s'>Радость и истории от</h2>
					<h2 className='h2-l text-deep-orange'>Моих Клиентов</h2>
				</div>
				<div className='w-full overflow-hidden'>
					<div ref={containerRef} className='flex flex-row gap-2.5'>
						{duplicatedList.map((el, index) => (
							<CardReviews className='w-[350px] h-[477px]' key={index + el.id} el={el} />
						))}
					</div>
				</div>
				<div>
					<Button variant={'outline'} label={'View all reviews'} />
				</div>
			</div>
		</div>
	);
};
