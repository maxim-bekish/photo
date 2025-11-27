'use client';
import { useLayoutEffect } from 'react';

export const useInertialScroll = () => {
	useLayoutEffect(() => {
		let current = window.scrollY;
		let target = window.scrollY;

		let momentumVelocity = 0;

		let animFrame: number;
		let wheelTimeout: any;

		// флаг для отслеживания наших собственных скроллов
		let isInternalScroll = false;

		// тач-переменные
		let touchStartY = 0;
		let touchLastY = 0;
		let touchVelocity = 0;
		let touchTime = 0;

		// параметры "физики"
		const ease = 0.1; // плавность основного скролла
		const momentumBoost = 1; // сила начального толчка
		const momentumFriction = 0.3; // замедление инерции
		const keyboardStep = 100; // шаг прокрутки для клавиатуры
		const touchMomentumMultiplier = 2; // множитель для тач-инерции

		// функция для проверки, открыто ли меню
		const isMenuOpen = () => {
			return document.body.getAttribute('data-menu-open') === 'true';
		};

		// общая функция для обновления target
		const updateTarget = (delta: number, velocity?: number) => {
			// если меню открыто, блокируем скролл
			if (isMenuOpen()) return;

			target += delta;

			if (velocity !== undefined) {
				momentumVelocity = velocity;
			} else {
				momentumVelocity = momentumBoost;
			}

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

		const handleWheel = (e: WheelEvent) => {
			if (isMenuOpen()) {
				e.preventDefault();
				return;
			}
			e.preventDefault();
			updateTarget(e.deltaY);
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			// если меню открыто, блокируем скролл
			if (isMenuOpen()) {
				e.preventDefault();
				return;
			}

			// проверяем, что не в поле ввода
			const target = e.target as HTMLElement;
			if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
				return;
			}

			let delta = 0;

			switch (e.key) {
				case 'ArrowDown':
				case 'PageDown':
					delta = keyboardStep;
					break;
				case 'ArrowUp':
				case 'PageUp':
					delta = -keyboardStep;
					break;
				case 'Home':
					delta = -window.scrollY;
					break;
				case 'End':
					const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
					delta = maxScroll - window.scrollY;
					break;
				case ' ': // пробел
					delta = e.shiftKey ? -keyboardStep * 2 : keyboardStep * 2;
					break;
				default:
					return;
			}

			if (delta !== 0) {
				e.preventDefault();
				updateTarget(delta, momentumBoost * 0.5);
			}
		};

		const handleTouchStart = (e: TouchEvent) => {
			if (isMenuOpen()) return;
			if (e.touches.length !== 1) return;
			touchStartY = e.touches[0].clientY;
			touchLastY = touchStartY;
			touchVelocity = 0;
			touchTime = Date.now();
		};

		const handleTouchMove = (e: TouchEvent) => {
			if (isMenuOpen()) {
				e.preventDefault();
				return;
			}
			if (e.touches.length !== 1) return;
			e.preventDefault();

			const touchY = e.touches[0].clientY;
			const deltaY = touchLastY - touchY;
			const now = Date.now();
			const deltaTime = now - touchTime;

			if (deltaTime > 0) {
				touchVelocity = deltaY / deltaTime;
			}

			updateTarget(deltaY, 0); // без инерции во время движения

			touchLastY = touchY;
			touchTime = now;
		};

		const handleTouchEnd = (e: TouchEvent) => {
			if (isMenuOpen()) return;
			if (e.changedTouches.length !== 1) return;

			// применяем инерцию на основе последней скорости
			if (Math.abs(touchVelocity) > 0.1) {
				momentumVelocity = touchVelocity * touchMomentumMultiplier * 100;
				startMomentum();
			}
		};

		// обработка перетаскивания полоски скролла
		const handleScroll = () => {
			// если меню открыто, блокируем скролл
			if (isMenuOpen()) return;

			// если это не наш внутренний скролл, синхронизируем target
			if (!isInternalScroll) {
				const scrollY = window.scrollY;
				// проверяем, что изменение значительное (пользователь перетащил скроллбар)
				// если изменение небольшое, это может быть наш скролл из-за округления
				if (Math.abs(scrollY - current) > 5) {
					target = scrollY;
					current = scrollY;
					momentumVelocity = 0; // останавливаем инерцию
				}
			}
		};

		const startMomentum = () => {
			if (isMenuOpen()) return;
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
			// если меню открыто, не обновляем скролл
			if (isMenuOpen()) {
				animFrame = requestAnimationFrame(smoothScroll);
				return;
			}

			const prevCurrent = current;
			current += (target - current) * ease;

			// проверяем, изменилась ли позиция
			if (Math.abs(current - prevCurrent) > 0.01) {
				isInternalScroll = true;
				window.scrollTo(0, current);
				// сбрасываем флаг в следующем кадре анимации
				requestAnimationFrame(() => {
					isInternalScroll = false;
				});
			}

			animFrame = requestAnimationFrame(smoothScroll);
		};

		// добавляем все обработчики
		window.addEventListener('wheel', handleWheel, { passive: false });
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('touchstart', handleTouchStart, { passive: true });
		window.addEventListener('touchmove', handleTouchMove, { passive: false });
		window.addEventListener('touchend', handleTouchEnd, { passive: true });
		window.addEventListener('scroll', handleScroll, { passive: true });

		animFrame = requestAnimationFrame(smoothScroll);

		return () => {
			window.removeEventListener('wheel', handleWheel);
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('touchstart', handleTouchStart);
			window.removeEventListener('touchmove', handleTouchMove);
			window.removeEventListener('touchend', handleTouchEnd);
			window.removeEventListener('scroll', handleScroll);
			cancelAnimationFrame(animFrame);
			clearTimeout(wheelTimeout);
		};
	}, []);
};
