'use client';

import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { Star } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Button } from '../ui/button';

gsap.registerPlugin(Observer);

export const Clients = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<gsap.core.Tween | null>(null);

	const clientsList = [
		{
			id: '1',
			src: '/assets/expertise/img-1.avif',
			message:
				'He provided exceptional product photography services for our latest collection. Their attention to detail and creative approach resulted in images that perfectly showcased our products.  Highly recommended!',
			name: 'Michael T.',
			role: 'MD, Stellar Designs',
			rating: 0,
		},
		{
			id: '2',
			src: '/assets/expertise/img-2.avif',
			message:
				'Documentary photography serves to inform, educate, and inspire by providing a truthful and insightful representation of the world.',
			name: 'Aurora Jensen',
			role: 'Marketing Manager, Stellar Designs',
			rating: 2,
		},
		{
			id: '3',
			src: '/assets/expertise/img-3.avif',
			message:
				'Documentary photography serves to inform, educate, and inspire by providing a truthful and insightful representation of the world.',
			name: 'G. Monroe',
			role: 'Marketing Director',
			rating: 3,
		},
		{
			id: '4',
			src: '/assets/expertise/img-4.avif',
			message:
				'Documentary photography serves to inform, educate, and inspire by providing a truthful and insightful representation of the world.',
			name: 'Michael',
			role: 'Marketing Manager, Stellar Designs',
			rating: 4,
		},
	];

	// Дублируем список для бесшовного перехода
	const duplicatedList = [...clientsList, ...clientsList, ...clientsList];

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		// Вычисляем ширину одной карточки (350px + gap 10px = 360px)
		const cardWidth = 350;
		const gap = 10;
		const cardTotalWidth = cardWidth + gap;
		const totalWidth = clientsList.length * cardTotalWidth;

		// Устанавливаем начальную позицию
		gsap.set(container, { x: 0 });

		// Создаем бесконечную анимацию
		// Используем onUpdate для проверки позиции и сброса, когда нужно
		animationRef.current = gsap.to(container, {
			x: -totalWidth,
			duration: 20, // Скорость анимации (можно настроить)
			ease: 'none',
			repeat: -1, // Бесконечное повторение
			onUpdate: function () {
				const currentX = gsap.getProperty(container, 'x') as number;
				// Сбрасываем позицию, когда достигли нужного значения
				// Это создаст бесшовный переход
				if (currentX <= -totalWidth) {
					gsap.set(container, { x: 0 });
				}
			},
		});

		// Обработчики для замедления при наведении
		const handleMouseEnter = () => {
			if (animationRef.current) {
				// Плавно изменяем timeScale для замедления
				gsap.to(animationRef.current, {
					timeScale: 0.3, // Замедляем до 30% от нормальной скорости
					duration: 0.5,
					ease: 'power2.out',
				});
			}
		};

		const handleMouseLeave = () => {
			if (animationRef.current) {
				// Плавно возвращаем нормальную скорость
				gsap.to(animationRef.current, {
					timeScale: 1, // Возвращаем нормальную скорость
					duration: 0.5,
					ease: 'power2.out',
				});
			}
		};

		// Добавляем обработчики событий
		container.addEventListener('mouseenter', handleMouseEnter);
		container.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			if (animationRef.current) {
				animationRef.current.kill();
			}
			container.removeEventListener('mouseenter', handleMouseEnter);
			container.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, []);

	const renderCard = (el: (typeof clientsList)[0], index: number) => (
		<div
			key={`${el.id}-${index}`}
			className='flex h-[477px] will-change-transform flex-col w-[350px] gap-5 px-5 py-10 shrink-0'>
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

	return (
		<div className='h-screen flex flex-col items-center'>
			<div className='wrapper bg-white/5 border-white/10 border py-14 flex flex-col items-center gap-7'>
				<div className='flex flex-col items-center'>
					<h2 className='h2-s'>Smiles and Stories from</h2>
					<h2 className='h2-l text-deep-orange'>My Clients</h2>
				</div>
				<div className='w-full overflow-hidden'>
					<div ref={containerRef} className='flex gap-2.5 '>
						{duplicatedList.map((el, index) => renderCard(el, index))}
					</div>
				</div>
				<div>
					<Button variant={'outline'} label={'View all reviews'} />
				</div>
			</div>
		</div>
	);
};
