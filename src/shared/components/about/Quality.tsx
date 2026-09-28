'use client';

import { texts } from '@/src/shared/config/texts';
import { useQualities } from '@/src/hooks/queries/useSiteContent';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

const rotations = [10, -5, 4, -6]; // углы поворота, повторяются по кругу
const rotationDistance = 200; // расстояние поворота в пикселях

export default function Quality() {
	const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
	const sectionRef = useRef<HTMLElement | null>(null);
	const { data: qualities = [] } = useQualities();

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			itemsRef.current.slice(0, qualities.length).forEach((item, i) => {
				if (!item) return;

				// Для sticky элементов поворот происходит когда элемент
				// проходит через центр экрана на протяжении rotationDistance
				gsap.fromTo(
					item,
					{
						rotation: 0,
					},
					{
						rotation: rotations[i % rotations.length],
						scrollTrigger: {
							trigger: item,
							start: `top+=${rotationDistance} center`,
							end: `top center`,
							scrub: 2, // сглаживание для плавности (1 секунда)
						},
					},
				);
			});
		});

		return () => {
			ctx.revert();
		};
	}, [qualities.length]);

	if (!qualities.length) return null;

	// На мобильном размер зависит от ширины экрана (7.5vw, но не больше 38px), чтобы длинные слова
	// вроде «Профессионализм» помещались; hyphens-auto переносит по слогам совсем длинные (lang='ru')
	const text = 'text-[clamp(24px,7.5vw,38px)] md:text-[67px] xl:text-[80px] hyphens-auto wrap-break-word';
	return (
		<section
			ref={(el) => {
				sectionRef.current = el;
			}}
			className='flex flex-col gap-[100px] items-center text-creamy-white relative px-(--px) pb-[50px] pt-[30px] md:pb-0 md:pt-[150px]'>
			<h2 className='h2-s sticky top-[150px]'>{texts.about.qualitiesTitle}</h2>
			{qualities.map((quality, i) => (
				<div
					key={quality.id}
					ref={(el) => {
						itemsRef.current[i] = el;
					}}
					className='sticky top-[300] bg-background border border-solid border-white/50 w-full p-7 max-w-[900px]'>
					<h4 className={`font-display text-center font-medium leading-none ${text}`}>
						{quality.title}
					</h4>
				</div>
			))}
		</section>
	);
}
