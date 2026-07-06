'use client';

import { useReviews } from '@/src/hooks/queries/useReviews';
import { useRef } from 'react';
import { useInfiniteSlider } from '../../hooks/useInfiniteSlider';
import { Button } from '../ui/button';
import { CardReviews } from '../ui/CardReviews';

export const Clients = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	// Дублируем список для бесшовного перехода
	const { data: clientsList, isLoading } = useReviews();

	// Используем переиспользуемый хук для анимации слайдера
	// Вызываем хук ДО условных возвратов, чтобы соблюдать правила хуков
	useInfiniteSlider({
		containerRef,
		itemCount: clientsList?.length ?? 0,
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

	if (isLoading) {
		return <div className='text-creamy-white'>Загрузка...</div>;
	}
	if (!clientsList) {
		return <div className='text-creamy-white'>Отзывы не найдены</div>;
	}

	const duplicatedList = [...clientsList, ...clientsList, ...clientsList];

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
							<CardReviews
								className='w-[350px] h-[477px]'
								key={index + el.id}
								el={el}
							/>
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
