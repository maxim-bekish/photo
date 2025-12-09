import gsap from 'gsap';
import { RefObject, useEffect, useRef } from 'react';

export interface UseInfiniteSliderOptions {
	/**
	 * Ref контейнера, который будет анимироваться
	 */
	containerRef: RefObject<HTMLElement | null>;
	/**
	 * Количество элементов в оригинальном списке (без дублирования)
	 */
	itemCount: number;
	/**
	 * Ширина одного элемента в пикселях
	 * Если не указана, будет вычисляться автоматически на основе размера экрана
	 */
	itemWidth?: number;
	/**
	 * Отступ между элементами в пикселях (по умолчанию 10)
	 */
	gap?: number;
	/**
	 * Длительность анимации в секундах (по умолчанию 20)
	 */
	duration?: number;
	/**
	 * Направление анимации (по умолчанию 'left' - влево)
	 */
	direction?: 'left' | 'right';
	/**
	 * Включить замедление при наведении (по умолчанию true)
	 */
	enableHoverPause?: boolean;
	/**
	 * Скорость замедления при наведении (0-1, по умолчанию 0.3)
	 */
	hoverSpeed?: number;
	/**
	 * Длительность перехода при изменении скорости (по умолчанию 0.5)
	 */
	speedTransitionDuration?: number;
	/**
	 * Функция для вычисления ширины элемента на основе размера экрана
	 */
	getItemWidth?: () => number;
}

/**
 * Хук для создания бесконечной горизонтальной анимации слайдера
 * 
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 * useInfiniteSlider({
 *   containerRef,
 *   itemCount: 4,
 *   itemWidth: 350,
 *   gap: 10,
 *   duration: 20
 * });
 * ```
 */
export const useInfiniteSlider = ({
	containerRef,
	itemCount,
	itemWidth,
	gap = 10,
	duration = 20,
	direction = 'left',
	enableHoverPause = true,
	hoverSpeed = 0.3,
	speedTransitionDuration = 0.5,
	getItemWidth,
}: UseInfiniteSliderOptions) => {
	const animationRef = useRef<gsap.core.Tween | null>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		// Функция для вычисления ширины карточки
		const calculateItemWidth = (): number => {
			if (getItemWidth) {
				return getItemWidth();
			}
			if (itemWidth) {
				return itemWidth;
			}
			// Дефолтная логика: адаптивная ширина на мобильных
			if (window.innerWidth > 768) {
				return Math.min(350, window.innerWidth - 40);
			}
			return 350;
		};

		// Функция для инициализации анимации
		const initAnimation = () => {
			// Останавливаем предыдущую анимацию, если она есть
			if (animationRef.current) {
				animationRef.current.kill();
			}

			const cardWidth = calculateItemWidth();
			const cardTotalWidth = cardWidth + gap;
			const totalWidth = itemCount * cardTotalWidth;
			const targetX = direction === 'left' ? -totalWidth : totalWidth;

			// Устанавливаем начальную позицию
			gsap.set(container, { x: 0, y: 0 });

			// Создаем бесконечную горизонтальную анимацию
			animationRef.current = gsap.to(container, {
				x: targetX,
				duration,
				ease: 'none',
				repeat: -1, // Бесконечное повторение
				onUpdate: function () {
					const currentX = gsap.getProperty(container, 'x') as number;
					// Сбрасываем позицию, когда достигли нужного значения
					// Это создаст бесшовный переход
					if (direction === 'left' && currentX <= -totalWidth) {
						gsap.set(container, { x: 0 });
					} else if (direction === 'right' && currentX >= totalWidth) {
						gsap.set(container, { x: 0 });
					}
				},
			});
		};

		// Инициализируем анимацию
		initAnimation();

		// Обработчики для замедления при наведении
		const handleMouseEnter = () => {
			if (enableHoverPause && animationRef.current) {
				// Плавно изменяем timeScale для замедления
				gsap.to(animationRef.current, {
					timeScale: hoverSpeed,
					duration: speedTransitionDuration,
					ease: 'power2.out',
				});
			}
		};

		const handleMouseLeave = () => {
			if (enableHoverPause && animationRef.current) {
				// Плавно возвращаем нормальную скорость
				gsap.to(animationRef.current, {
					timeScale: 1,
					duration: speedTransitionDuration,
					ease: 'power2.out',
				});
			}
		};

		// Добавляем обработчики событий
		if (enableHoverPause) {
			container.addEventListener('mouseenter', handleMouseEnter);
			container.addEventListener('mouseleave', handleMouseLeave);
		}

		// Обработчик изменения размера окна для пересчета анимации
		const handleResize = () => {
			initAnimation();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			if (animationRef.current) {
				animationRef.current.kill();
			}
			if (enableHoverPause) {
				container.removeEventListener('mouseenter', handleMouseEnter);
				container.removeEventListener('mouseleave', handleMouseLeave);
			}
			window.removeEventListener('resize', handleResize);
		};
	}, [
		containerRef,
		itemCount,
		itemWidth,
		gap,
		duration,
		direction,
		enableHoverPause,
		hoverSpeed,
		speedTransitionDuration,
		getItemWidth,
	]);
};

