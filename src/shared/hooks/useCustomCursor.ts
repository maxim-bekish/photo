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

// Насколько «лениво» курсор догоняет мышь
const FOLLOW_DURATION = 0.8;

/** Курсор имеет смысл только там, где есть наведение мышью (не телефоны и планшеты) */
const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Слежение за мышью — одно на весь сайт, сколько бы компонентов ни использовали хук
let followers = 0;
let stopFollowing: (() => void) | null = null;

const startFollowing = (cursor: HTMLElement) => {
	followers += 1;
	if (followers > 1) return;

	// quickTo создаёт анимацию один раз и дальше только меняет её цель — без новой анимации на каждый кадр
	const xTo = gsap.quickTo(cursor, 'x', { duration: FOLLOW_DURATION, ease: 'power3.out' });
	const yTo = gsap.quickTo(cursor, 'y', { duration: FOLLOW_DURATION, ease: 'power3.out' });

	const moveCursor = (e: MouseEvent) => {
		xTo(e.clientX - cursor.offsetWidth / 2);
		yTo(e.clientY - cursor.offsetHeight / 2);
	};
	window.addEventListener('mousemove', moveCursor);

	stopFollowing = () => {
		window.removeEventListener('mousemove', moveCursor);
		gsap.killTweensOf(cursor, 'x,y');
	};
};

const releaseFollowing = () => {
	followers -= 1;
	if (followers > 0) return;
	stopFollowing?.();
	stopFollowing = null;
};

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
		// На тач-устройствах тап эмулирует наведение, и рамка курсора зависала бы на экране
		if (!cursor || !canHover()) return;

		const customText = cursor.querySelector('.custom-text');

		startFollowing(cursor);

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
				.map((el) => {
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
			domElements.forEach((item) => {
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
			clearInterval(intervalId);
			releaseFollowing();
			// При переходе по клику карточка исчезает раньше, чем сработает mouseleave, —
			// без этого рамка курсора зависла бы видимой на новой странице
			gsap.killTweensOf(cursor, 'opacity,scale');
			gsap.set(cursor, { opacity: 0, scale: 0.6 });

			// Удаляем все обработчики
			handlers.forEach((handler, element) => {
				element.removeEventListener('mouseenter', handler.show);
				element.removeEventListener('mouseleave', handler.hide);
			});
			handlers.clear();
		};
	}, [elements, cursorId, text]);
};
