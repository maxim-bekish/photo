import gsap from 'gsap';
import { RefObject, useEffect } from 'react';

interface UseCustomCursorOptions {
	/**
	 * Массив элементов (refs или DOM элементов) или функция, возвращающая массив элементов,
	 * на которых нужно показывать курсор при ховере
	 */
	elements:
		| (HTMLElement | RefObject<HTMLElement> | null)[]
		| (() => (HTMLElement | RefObject<HTMLElement> | null)[]);
	/**
	 * ID элемента курсора в DOM (по умолчанию 'cursor-custom')
	 */
	cursorId?: string;
	/**
	 * Текст, отображаемый в курсоре при наведении (по умолчанию 'view')
	 */
	text?: string;
}

/**
 * Хук для управления кастомным курсором, который следует за мышью
 * и показывается при наведении на указанные элементы
 */
export const useCustomCursor = ({
	elements,
	cursorId = 'cursor-custom',
	text = 'view',
}: UseCustomCursorOptions) => {
	useEffect(() => {
		const cursor = document.getElementById(cursorId);
		if (!cursor) return;

		const customText = cursor.querySelector('.custom-text');

		let posX = 0;
		let posY = 0;
		let animationFrameId: number;

		const moveCursor = (e: MouseEvent) => {
			posX = e.clientX - cursor.offsetWidth / 2;
			posY = e.clientY - cursor.offsetHeight / 2;
		};

		// Слушаем глобально движение мыши
		window.addEventListener('mousemove', moveCursor);

		const animate = () => {
			gsap.to(cursor, {
				x: posX,
				y: posY,
				duration: 2,
				ease: 'power3.out',
			});
			animationFrameId = requestAnimationFrame(animate);
		};
		animate();

		// Обновляем текст при наведении на элемент
		const showCursor = () => {
			if (customText) {
				customText.textContent = text;
			}
			gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.2 });
		};
		const hideCursor = () => gsap.to(cursor, { opacity: 0, scale: 0.6, duration: 0.2 });

		// Получаем реальные DOM элементы из refs
		const elementsArray = typeof elements === 'function' ? elements() : elements;
		const domElements = elementsArray
			.map(el => {
				if (!el) return null;
				return el instanceof HTMLElement ? el : el.current;
			})
			.filter((el): el is HTMLElement => el !== null);

		// Добавляем обработчики на каждый элемент
		domElements.forEach(item => {
			item.addEventListener('mouseenter', showCursor);
			item.addEventListener('mouseleave', hideCursor);
		});

		return () => {
			window.removeEventListener('mousemove', moveCursor);
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
			}

			domElements.forEach(item => {
				item.removeEventListener('mouseenter', showCursor);
				item.removeEventListener('mouseleave', hideCursor);
			});
		};
	}, [elements, cursorId, text]);
};
