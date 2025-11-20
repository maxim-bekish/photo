'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { div } from 'motion/react-client';

gsap.registerPlugin(Observer);

export const Expertise = () => {
	const cubeRef = useRef(null);
	const [isActiveSide, setIsActiveSide] = useState(0);
	const [scale, setScale] = useState(0);
	const mainW = useRef(null);
	const imgsRef = useRef(null);

	useEffect(() => {
		const cube = cubeRef.current;
		const parent = mainW.current;
		const angleStep = 90; // градусы вращения
		const totalHeight = parent.clientHeight;
		const stepHeight = totalHeight / 6;

		const handleScroll = () => {
			const rect = parent.getBoundingClientRect();
			if (rect.bottom < 0 || rect.top > window.innerHeight) {
				return;
			}
			// вращаем только если верх блока достиг верха экрана
			const offset = -rect.top; // сколько прокручено относительно начала блока
			let index = Math.floor(offset / stepHeight);

			if (index < 0) index = 0;
			if (index >= expertiseList.length) index = expertiseList.length - 1;

			const max = totalHeight - stepHeight * 2; // 1500

			if (offset <= max) {
				console.log((offset / max) * 100);
				setScale((offset / max) * 100); // от 0 до 100
			} else {
				// const k = ((2 * max - offset) / max) * 100;

				// // const mapped = ((k - 70) / 30) * 100;

				// console.log(k);
				// setScale(k);
			}
			if (rect.top <= 0) {
				if (index !== isActiveSide) {
					setIsActiveSide(index);
					gsap.to(cube, {
						rotateX: index * angleStep,
						duration: 1,
						ease: 'power2.out',
					});
				}
			}
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, [isActiveSide]);

	const expertiseList = [
		{
			id: '1',
			title: 'Documentary Photography',
			src: '/assets/expertise/img-1.avif',
			description:
				'Documentary photography serves to inform, educate, and inspire by providing a truthful and insightful representation of the world. It is used to raise awareness about important issues, document significant events, and preserve historical moments.',
		},
		{
			id: '2',
			title: 'Landscape Photography',
			src: '/assets/expertise/img-2.avif',
			description:
				"Explore the beauty of the world through our captivating landscape photography. From breathtaking vistas to hidden gems, we'll take you on a visual journey that will inspire and awe.",
		},
		{
			id: '3',
			title: 'Product Photography',
			src: '/assets/expertise/img-3.avif',
			description:
				"Showcase your products in the best possible light with our professional product photography services. Whether you're selling online or in print, we'll create images that highlight the unique features of your products and attract customers.",
		},
		{
			id: '4',
			title: 'Real Estate Photography',
			src: '/assets/expertise/img-4.avif',
			description:
				"Highlight the best features of your property with our real estate photography services. We'll use professional lighting and composition techniques to create images that make your property stand out and attract potential buyers.",
		},
	];

	const faceClasses = 'absolute  flex justify-center items-center';

	return (
		<>
			<div ref={mainW} className=' h-[600vh]   flex flex-col justify-between'>
				<div className='sticky h-screen top-0 overflow-hidden left-0 flex justify-center items-center perspective-midrange cursor-grab select-none '>
					<div ref={cubeRef} className=' w-[640px] h-80' style={{ transformStyle: 'preserve-3d' }}>
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
									isActiveSide === i ? 'h-1.5 bg-creamy-white' : 'h-4 bg-deep-orange'
								} w-1.5  block rounded-px`}
							/>
						))}
					</div>
					<div
						ref={imgsRef}
						data-eee={scale}
						className='w-full h-full absolute -z-10 top-0 left-0 bottom-0 right-0'
						style={{
							transform: `scale(${0.8 + (scale / 100) * (1.1 - 0.8)})`,
							transition: 'transform 0.1s ease',
						}}>
						{expertiseList.map((el, i) => (
							<div
								className={` duration-1000 absolute top-0 left-0 bottom-0 right-0 opacity-0 transition-opacity   ${
									isActiveSide === i ? 'opacity-100' : 'opacity-0'
								}`}
								key={el.id}>
								<img src={el.src} className='w-full h-full' alt='' />
							</div>
						))}
					</div>
				</div>
				<div className='h-auto items-center bg-light-orange  z-100 flex flex-col px-10 gap-10 py-25'>
					<h2 className='wrapper h2-l text-black'>
						Wait…
						<br />
						There's more!
					</h2>
					<div className='wrapper grid auto-rows-min grid-cols-[repeat(2,minmax(200px,1fr))] grid-rows-[repeat(2,min-content)] gap-2.5'>
						{[
							{
								title: "Event\nPhotography",
								description:
									'Tell powerful stories through our event photography, capturing real-life events and moments.',
							},
							{
								title: "Aerial\nPhotography",
								description:
									'Get a bird’s-eye view with stunning aerial photography captured via drones, perfect for real estate, events, and landscapes.',
							},
							{
								title: "Corporate\nPhotography",
								description:
									'Enhance your brand image with professional corporate photography for headshots, team photos, and company events.',
							},
							{
								title: "Editorial\nPhotography",
								description:
									'Bring your stories to life with compelling editorial photography for magazines, blogs, and publications.',
							},
						].map((el) => (
							<div key={el.title} className='flex gap-2.5 h-[346px] p-7.5 bg-matt-black'>
								<h3 className='text-creamy-white h3-s flex flex-1 whitespace-pre-line'>{el.title}</h3>
								<p className='text-creamy-white p-s opacity-70 flex flex-1 items-end'>{el.description}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};
