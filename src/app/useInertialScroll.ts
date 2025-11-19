'use client';
import { useLayoutEffect } from 'react';

export const useInertialScroll = () => {
	useLayoutEffect(() => {
		let current = window.scrollY;
		let target = window.scrollY;

		let momentumVelocity = 0;

		let animFrame: number;
		let wheelTimeout: any;

		// параметры "физики"
		const ease = 0.1; // плавность основного скролла
		const momentumBoost = 1; // сила начального толчка
		const momentumFriction = 0.3; // замедление инерции

		const handleWheel = (e: WheelEvent) => {
			e.preventDefault();

			// обычная прокрутка
			target += e.deltaY;

			// скорость инерции — зависит от силы прокрутки
			momentumVelocity = momentumBoost;

			// границы
			const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

			if (target < 0) target = 0;
			if (target > maxScroll) target = maxScroll;

			// сброс таймера
			clearTimeout(wheelTimeout);

			// запускаем инерцию после паузы
			wheelTimeout = setTimeout(() => {
				startMomentum();
			}, 35);
		};

		const startMomentum = () => {
			if (Math.abs(momentumVelocity) < 0.2) return;

			target += momentumVelocity;

			// замедление
			momentumVelocity *= momentumFriction;

			const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

			if (target < 0) target = 0;
			if (target > maxScroll) target = maxScroll;

			requestAnimationFrame(startMomentum);
		};

		const smoothScroll = () => {
			current += (target - current) * ease;
			window.scrollTo(0, current);
			animFrame = requestAnimationFrame(smoothScroll);
		};

		window.addEventListener('wheel', handleWheel, { passive: false });
		animFrame = requestAnimationFrame(smoothScroll);

		return () => {
			window.removeEventListener('wheel', handleWheel);
			cancelAnimationFrame(animFrame);
			clearTimeout(wheelTimeout);
		};
	}, []);
};
