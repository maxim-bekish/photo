'use client';

import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { Star } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { CardReviews } from '../ui/CardReviews';

gsap.registerPlugin(Observer);

export const Clients = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<gsap.core.Tween | null>(null);

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

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		// Функция для вычисления ширины карточки в зависимости от размера экрана
		const getCardWidth = () => {
			if (window.innerWidth > 768) {
				// На мобильных (>768px) используем адаптивную ширину
				return Math.min(350, window.innerWidth - 40); // 40px для отступов
			}
			return 350; // На десктопе фиксированная ширина
		};

		// Функция для инициализации анимации
		const initAnimation = () => {
			// Останавливаем предыдущую анимацию, если она есть
			if (animationRef.current) {
				animationRef.current.kill();
			}

			const cardWidth = getCardWidth();
			const gap = 10;
			const cardTotalWidth = cardWidth + gap;
			const totalWidth = clientsList.length * cardTotalWidth;

			// Устанавливаем начальную позицию
			gsap.set(container, { x: 0, y: 0 });

			// Создаем бесконечную горизонтальную анимацию
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
		};

		// Инициализируем анимацию
		initAnimation();

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

		// Обработчик изменения размера окна для пересчета анимации
		const handleResize = () => {
			initAnimation();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			if (animationRef.current) {
				animationRef.current.kill();
			}
			container.removeEventListener('mouseenter', handleMouseEnter);
			container.removeEventListener('mouseleave', handleMouseLeave);
			window.removeEventListener('resize', handleResize);
		};
	}, []);

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
