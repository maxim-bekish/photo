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

		// Храним обработчики для очистки
		const handlers = new Map<HTMLElement, { show: () => void; hide: () => void }>();

		const updateHandlers = () => {
			// Получаем реальные DOM элементы из refs
			const elementsArray = typeof elements === 'function' ? elements() : elements;
			const domElements = elementsArray
				.map(el => {
					if (!el) return null;
					return el instanceof HTMLElement ? el : el.current;
				})
				.filter((el): el is HTMLElement => el !== null);

			// Удаляем обработчики со старых элементов, которых больше нет
			handlers.forEach((handler, element) => {
				if (!domElements.includes(element)) {
					element.removeEventListener('mouseenter', handler.show);
					element.removeEventListener('mouseleave', handler.hide);
					handlers.delete(element);
				}
			});

			// Добавляем обработчики на новые элементы
			domElements.forEach(item => {
				if (!handlers.has(item)) {
					handlers.set(item, { show: showCursor, hide: hideCursor });
					item.addEventListener('mouseenter', showCursor);
					item.addEventListener('mouseleave', hideCursor);
				}
			});
		};

		// Обновляем обработчики сразу
		updateHandlers();

		// Периодически проверяем новые элементы (элементы добавляются через refs асинхронно)
		const intervalId = setInterval(updateHandlers, 150);

		return () => {
			window.removeEventListener('mousemove', moveCursor);
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
			}
			clearInterval(intervalId);

			// Удаляем все обработчики
			handlers.forEach((handler, element) => {
				element.removeEventListener('mouseenter', handler.show);
				element.removeEventListener('mouseleave', handler.hide);
			});
			handlers.clear();
		};
	}, [elements, cursorId, text]);
};


