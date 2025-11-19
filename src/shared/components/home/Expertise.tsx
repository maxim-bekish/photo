'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { map } from 'motion/react-client';

gsap.registerPlugin(Observer);

export const Expertise = () => {
	const cubeRef = useRef(null);
	const progress = { value: 0 };
	const scrollAccumulator = useRef(0); // суммарный скролл

	useEffect(() => {
		const cube = cubeRef.current;
		const step = 400;
		const angleStep = 90; // поворот на 90° за шаг
		const duration = 3;

		const rotateCube = (angle) => {
			gsap.to(cube, {
				rotateX: angle,
				duration: duration,
				ease: 'power2.out',
			});
		};

		Observer.create({
			target: window,
			type: 'wheel',
			onChange: (self) => {
				scrollAccumulator.current += self.deltaY;

				if (Math.abs(scrollAccumulator.current) >= step) {
					const stepsToMove = Math.floor(scrollAccumulator.current / step);
					progress.value += stepsToMove * angleStep; // поворот на 90° за шаг
					rotateCube(progress.value);

					scrollAccumulator.current -= stepsToMove * step; // уменьшаем накопление
				}
			},
		});
	}, []);

	const expertiseList = [
		{
			id: '1',
			title: 'Documentary Photography',
			description:
				'Documentary photography serves to inform, educate, and inspire by providing a truthful and insightful representation of the world. It is used to raise awareness about important issues, document significant events, and preserve historical moments.',
		},
		{
			id: '2',
			title: 'Landscape Photography',
			description:
				"Explore the beauty of the world through our captivating landscape photography. From breathtaking vistas to hidden gems, we'll take you on a visual journey that will inspire and awe.",
		},
		{
			id: '3',
			title: 'Product Photography',
			description:
				"Showcase your products in the best possible light with our professional product photography services. Whether you're selling online or in print, we'll create images that highlight the unique features of your products and attract customers.",
		},
		{
			id: '4',
			title: 'Real Estate Photography',
			description:
				"Highlight the best features of your property with our real estate photography services. We'll use professional lighting and composition techniques to create images that make your property stand out and attract potential buyers.",
		},
	];

	const faceClasses = 'absolute  flex justify-center items-center';

	return (
		<div className='w-full h-[300vh] '>
			<div className='sticky h-screen top-0  left-0 flex justify-center items-center perspective-midrange cursor-grab select-none' >
				<div
					ref={cubeRef}
					className=' w-[640px] h-80'
					style={{ transformStyle: 'preserve-3d' }}>
					{expertiseList.map((el, i) => (
						<div
							key={el.id}
							data-id={el.id}
							className={`${faceClasses} ${
								(i + 1) % 2 ? 'bg-deep-orange text-black' : 'bg-black/85'
							} w-full h-full p-10`}
							style={{
								transform: `rotateX(${i * 90}deg) rotateY(0deg) translateZ(${
									160 * 0.8
								}px) scale(0.8)`,
								transformOrigin: 'center center',
							}}>
							<div className='flex w-full h-full flex-col gap-2.5 justify-between'>
								<h2 className='h3'>
									{el.id} {el.title}
								</h2>
								<p className='p-s opacity-80 w-4/5 ml-auto'>{el.description}</p>
							</div>
						</div>
					))}

					<div
						className={`${faceClasses} bg-deep-orange opacity-75 w-1/2 h-full`}
						style={{ transform: 'rotateY(90deg) translateZ(415px) scale(0.8)' }}
					/>
					<div
						className={`${faceClasses} bg-deep-orange opacity-75 w-1/2 h-full`}
						style={{ transform: 'rotateY(-90deg) translateZ(96px) scale(0.8)' }}
					/>
				</div>
				<div className='flex flex-col gap-2.5'>
					{expertiseList.map((_, i) => (
						<span
						key={i}
							className={`${
								i ? 'h-1.5 bg-creamy-white' : 'h-4 bg-deep-orange'
							} w-1.5  block rounded-px`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
