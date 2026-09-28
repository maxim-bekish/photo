'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const COUNT_DURATION = 1; // секунды

interface AboutCardProps {
	title: string;
	value: number;
	position: 'left' | 'right';
	className?: string;
}

export const AboutCard = ({ title, value, className, position }: AboutCardProps) => {
	const isThousand = value >= 1000;
	const shortValue = isThousand ? Math.floor(value / 1000) : value;
	const numberRef = useRef<HTMLParagraphElement>(null);

	// Счёт от 0 до значения, когда карточка появляется на экране.
	// В HTML с сервера остаётся итоговое число (для поисковиков), в 0 сбрасываем уже в браузере.
	useEffect(() => {
		const el = numberRef.current;
		if (!el) return;

		const counter = { value: 0 };
		el.textContent = '0';

		const ctx = gsap.context(() => {
			gsap.to(counter, {
				value: shortValue,
				duration: COUNT_DURATION,
				ease: 'power1.out',
				scrollTrigger: { trigger: el, start: 'top 90%', once: true },
				onUpdate: () => {
					el.textContent = String(Math.round(counter.value));
				},
			});
		});

		return () => {
			ctx.revert();
			el.textContent = String(shortValue);
		};
	}, [shortValue]);

	return (
		<div className='contents '>
			<div
				className={`p-10 bg-white/10  ${
					position === 'left' ? 'flex-[1.5_0_0px]' : 'flex-[1_0_0px]'
				} ${className ?? ''}`}>
				<p className='font-satoshi p-s pb-2.5 border-b border-solid border-white/10'>{title}</p>
				<div className='flex items-center'>
					<p ref={numberRef} className=' text-[90px] xl:text-[133px] font-display leading-none tabular-nums'>
						{shortValue}
					</p>
					<p className=' text-[90px] xl:text-[100px] font-medium font-display leading-none text-deep-orange'>
						{isThousand ? 'K+' : '+'}
					</p>
				</div>
			</div>
		</div>
	);
};
