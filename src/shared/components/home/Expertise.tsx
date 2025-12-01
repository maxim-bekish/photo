'use client';

import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(Observer);

interface ExpertiseItem {
	id: string;
	title: string;
	src: string;
	description: string;
}

export const Expertise = () => {
	const cubeRef = useRef<HTMLDivElement | null>(null);
	const mainW = useRef<HTMLDivElement | null>(null);
	const imgsRef = useRef<HTMLDivElement | null>(null);

	const [isActiveSide, setIsActiveSide] = useState<number>(0);
	const [scale, setScale] = useState<number>(0);

	const expertiseList: ExpertiseItem[] = [
		{
			id: '1',
			title: 'Документальная фотография',
			src: '/assets/expertise/img-1.avif',
			description:
				'Документальная фотография предназначена для информирования, обучения и вдохновения, предоставляя правдивое и глубокое отображение мира.',
		},
		{
			id: '2',
			title: 'Пейзажная фотография',
			src: '/assets/expertise/img-2.avif',
			description: 'Исследуйте красоту мира через нашу захватывающую пейзажную фотографию.',
		},
		{
			id: '3',
			title: 'Продуктовая фотография',
			src: '/assets/expertise/img-3.avif',
			description:
				'Продемонстрируйте ваши продукты в наилучшем свете с помощью наших профессиональных услуг продуктовой фотографии.',
		},
		{
			id: '4',
			title: 'Фотография недвижимости',
			src: '/assets/expertise/img-4.avif',
			description:
				'Выделите лучшие особенности вашей недвижимости с помощью наших услуг по фотографии недвижимости.',
		},
	];

	useEffect(() => {
		const cube = cubeRef.current;
		const parent = mainW.current;

		if (!cube || !parent) return;

		const totalHeight = parent.clientHeight;
		const stepHeight = totalHeight / 6;

		const handleScroll = () => {
			const rect = parent.getBoundingClientRect();

			if (rect.bottom < 0 || rect.top > window.innerHeight) return;

			const offset = -rect.top;
			let index = Math.floor(offset / stepHeight);

			if (index < 0) index = 0;
			if (index >= expertiseList.length) index = expertiseList.length - 1;

			const max = totalHeight - stepHeight * 2;

			if (offset <= max) {
				setScale((offset / max) * 100);
			}

			if (rect.top <= 0 && index !== isActiveSide) {
				setIsActiveSide(index);

				// Останавливаем все предыдущие анимации
				gsap.killTweensOf(cube);

				// Для index 3 используем 270deg вместо -90deg, чтобы куб вращался в правильном направлении
				const targetAngle = index === 3 ? 270 : index * 90;

				// Получаем текущее значение rotationX

				gsap.to(cube, {
					rotationX: targetAngle,
					transformPerspective: 2800,
					duration: 1,
				});
			}
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, [isActiveSide, expertiseList.length]);

	const faceClasses = 'absolute flex justify-center items-center';

	return (
		<>
			<div ref={mainW} className='md:h-[600vh]    flex flex-col justify-between'>
				<div className='sticky h-screen top-0 flex-col overflow-hidden left-0 hidden md:flex justify-center items-center cursor-grab select-none'>
					<div className='h2-l text-deep-orange'>Мои направления</div>
					<div className='flex justify-center items-center'>
						<div
							ref={cubeRef}
							className='w-[640px] h-80'
							style={{
								transformStyle: 'preserve-3d',
								transform: 'perspective(2400px) rotateX(0deg)',
							}}>
							{expertiseList.map((el, i) => (
								<div
									key={el.id}
									data-id={el.id}
									className={`${faceClasses} ${
										(i + 1) % 2 ? 'bg-light-orange text-black' : 'bg-black/85'
									} w-full h-full p-10`}
									style={{
										transform: `rotateX(${-i * 90}deg) translateZ(160px) `,
										transformOrigin: 'center center',
									}}>
									<div className='flex w-full h-full flex-col gap-2.5 justify-between'>
										<h2 className='h3'>{el.title}</h2>
										<p className='p-s opacity-80 w-4/5 ml-auto'>{el.description}</p>
									</div>
								</div>
							))}

							{/* Левая грань */}
							<div
								className={`${faceClasses} bg-deep-orange opacity-75 w-1/2 h-full`}
								style={{ transform: 'rotateY(90deg) translateZ(480px)' }}
							/>

							{/* Правая грань */}
							<div
								className={`${faceClasses} bg-deep-orange opacity-75 w-1/2 h-full`}
								style={{ transform: 'rotateY(-90deg) translateZ(160px)' }}
							/>
						</div>

						{/* Индикатор */}

						<div className='flex flex-col gap-2.5  '>
							{expertiseList.map((_, i) => (
								<span
									key={i}
									className={`${
										isActiveSide === i ? 'h-1.5 bg-creamy-white' : 'h-4 bg-deep-orange'
									} w-1.5 block rounded-px`}
								/>
							))}
						</div>
					</div>
					{/* Бэкграунд картинок */}
					<div
						ref={imgsRef}
						data-eee={scale}
						className='w-full h-full absolute -z-10 top-0 left-0 right-0 bottom-0'
						style={{
							transform: `scale(${0.8 + (scale / 100) * (1.1 - 0.8)})`,
							transition: 'transform 0.1s ease',
						}}>
						{expertiseList.map((el, i) => (
							<div
								key={el.id}
								className={`absolute top-0 left-0 right-0 bottom-0 transition-opacity duration-1000 ${
									isActiveSide === i ? 'opacity-100' : 'opacity-0'
								}`}>
								<img
									src={el.src}
									className='w-full h-full object-cover object-center'
									alt={el.title}
								/>
							</div>
						))}
					</div>
				</div>
				<div className='flex md:hidden flex-col gap-7.5 pt-20 pb-[30px] px-3'>
					<h2 className='h2-l text-deep-orange text-center'>My Expertise</h2>
					<div className='flex flex-col gap-2.5'>
						{expertiseList.map((el, i) => (
							<div
								key={el.id}
								className={`${
									(i + 1) % 2 ? 'bg-light-orange text-black' : 'bg-black/85 border border-white/30'
								} w-full h-[300px] p-5`}>
								<div className='flex w-full h-full flex-col gap-2.5 justify-between'>
									<h2 className='h3'>{el.title}</h2>
									<p className='p-s opacity-80  '>{el.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Блок "There's more" */}
				<div className=' md:h-auto items-center bg-light-orange relative z-50 flex flex-col gap-10  pt-15 pb-7.5 px-(--px) md:py-25'>
					<h2 className='wrapper h2-l text-black'>
						Подождите…
						<br />И это ещё не всё!
					</h2>

					<div className='wrapper grid auto-rows-min grid-cols-[repeat(1,minmax(200px,1fr))] xl:grid-cols-[repeat(2,minmax(200px,1fr))] grid-rows-[repeat(2,min-content)] gap-2.5 '>
						{[
							{
								title: 'Событийная\nФотография',
								description: 'Рассказывайте впечатляющие истории через нашу событийную фотографию.',
							},
							{
								title: 'Воздушная\nФотография',
								description:
									'Получите вид с высоты птичьего полёта с помощью потрясающей воздушной фотографии.',
							},
							{
								title: 'Корпоративная\nФотография',
								description:
									'Повышайте имидж вашего бренда с профессиональной корпоративной фотографией.',
							},
							{
								title: 'Редакционная\nФотография',
								description: 'Эффектная редакционная фотография для журналов и публикаций.',
							},
						].map(el => (
							<div
								key={el.title}
								className='flex flex-col md:flex-row gap-2.5 h-[346px] p-7.5 bg-matt-black'>
								<h3 className='text-creamy-white h3 flex flex-1 whitespace-pre-line'>{el.title}</h3>
								<p className='text-creamy-white   p-s opacity-70 flex flex-1 items-end'>
									{el.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};
