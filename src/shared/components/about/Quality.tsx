'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

export default function Quality() {
	const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
	const sectionRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const rotations = [10, -5, 4, -6]; // углы поворота для каждого элемента
		const rotationDistance = 200; // расстояние поворота в пикселях

		const ctx = gsap.context(() => {
			itemsRef.current.forEach((item, i) => {
				if (!item) return;

				// Для sticky элементов поворот происходит когда элемент
				// проходит через центр экрана на протяжении rotationDistance
				gsap.fromTo(
					item,
					{
						rotation: 0,
					},
					{
						rotation: rotations[i],
						scrollTrigger: {
							trigger: item,
							start: `top+=${rotationDistance} center`,
							end: `top center`,
							scrub: 2, // сглаживание для плавности (1 секунда)
						},
					}
				);
			});
		});

		return () => {
			ctx.revert();
		};
	}, []);

	return (
		<section
			ref={el => {
				sectionRef.current = el;
			}}
			className='flex flex-col gap-[100px] items-center text-creamy-white relative px-10 pt-[150px]'>
			<h2 className='h2-s sticky top-[150px]'>What you will find in me</h2>
			<div
				ref={el => {
					itemsRef.current[0] = el;
				}}
				className='sticky top-[300] bg-background border border-solid border-white/50 w-full p-7 max-w-[700px]'>
				<h4 className='font-display text-center text-[80px] font-medium leading-none'>
					Creative Vision
				</h4>
			</div>
			<div
				ref={el => {
					itemsRef.current[1] = el;
				}}
				className='sticky top-[300] bg-background border border-solid border-white/50 w-full p-7 max-w-[700px]'>
				<h4 className='font-display text-center text-[80px] font-medium leading-none'>
					Professionalism
				</h4>
			</div>
			<div
				ref={el => {
					itemsRef.current[2] = el;
				}}
				className='sticky top-[300] bg-background border border-solid border-white/50 w-full p-7 max-w-[700px]'>
				<h4 className='font-display text-center text-[80px] font-medium leading-none'>Passion</h4>
			</div>
			<div
				ref={el => {
					itemsRef.current[3] = el;
				}}
				className='sticky top-[300] bg-background border border-solid border-white/50 w-full p-7 max-w-[700px]'>
				<h4 className='font-display text-center text-[80px] font-medium leading-none'>
					Adaptability
				</h4>
			</div>
		</section>
	);
}
