'use client';

import { gsap } from 'gsap';
import { X } from 'lucide-react';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Separator } from '../ui/separator';

interface FAQItem {
	id: string;
	question: string;
	answer: string | string[];
}

interface FAQItemComponentProps {
	item: FAQItem;
	isOpen: boolean;
	onToggle: () => void;
	isLast: boolean;
}

const ANIMATION_DURATION = 0.5;
const ICON_DURATION = 0.3;

const FAQItemComponent = memo(({ item, isOpen, onToggle, isLast }: FAQItemComponentProps) => {
	const contentRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const iconRef = useRef<SVGSVGElement>(null);
	const animationsRef = useRef<{ container?: gsap.core.Tween; icon?: gsap.core.Tween }>({});
	const isArray = useMemo(() => Array.isArray(item.answer), [item.answer]);

	useEffect(() => {
		const container = containerRef.current;
		const content = contentRef.current;
		const icon = iconRef.current;
		if (!container || !content || !icon) return;

		// Остановка предыдущих анимаций
		animationsRef.current.container?.kill();
		animationsRef.current.icon?.kill();

		if (isOpen) {
			const fullHeight = content.scrollHeight;

			animationsRef.current.container = gsap.fromTo(
				container,
				{ height: 0, opacity: 0, y: -10 },
				{ height: fullHeight, opacity: 1, y: 0, duration: ANIMATION_DURATION, ease: 'power3.out' }
			);

			animationsRef.current.icon = gsap.to(icon, {
				rotation: 90,
				duration: ICON_DURATION,
				ease: 'power2.inOut',
			});
		} else {
			animationsRef.current.container = gsap.to(container, {
				height: 0,
				opacity: 0,
				y: 0,
				duration: ANIMATION_DURATION,
				ease: 'power3.in',
			});

			animationsRef.current.icon = gsap.to(icon, {
				rotation: 45,
				duration: ICON_DURATION,
				ease: 'power2.inOut',
			});
		}

		return () => {
			animationsRef.current.container?.kill();
			animationsRef.current.icon?.kill();
		};
	}, [isOpen]);

	// Инициализация при монтировании
	useEffect(() => {
		const container = containerRef.current;
		const icon = iconRef.current;
		if (!container || !icon) return;

		gsap.set(container, { height: 0, opacity: 0, y: -10 });
		gsap.set(icon, { rotation: 0 });
	}, []);

	return (
		<div>
			<div className='flex items-start justify-between gap-4 p-4 pb-0'>
				<button
					onClick={onToggle}
					className='flex-1 flex flex-col cursor-pointer text-left group gap-5'>
					<div className='flex w-full items-center relative justify-between'>
						<p className='body3 group-hover:text-deep-orange transition-colors w-11/12 text-creamy-white'>
							{item.question}
						</p>
						<div className='absolute top-1/2 -translate-y-1/2 right-0 transition-colors'>
							<X
								ref={iconRef}
								strokeWidth={1.5}
								className='w-5 h-5 rotate-45 group-hover:text-deep-orange  text-creamy-white'
							/>
						</div>
					</div>
					<div ref={containerRef} className='overflow-hidden '>
						<div ref={contentRef} className='p-s pb-5 opacity-80 text-creamy-white'>
							{isArray ? (
								<ul className='list-none space-y-1'>
									{(item.answer as string[]).map((point, i) => (
										<li key={i} className='flex items-start gap-2'>
											<span className='p-s '>+</span>
											<span className='p-s '>{point}</span>
										</li>
									))}
								</ul>
							) : (
								<p className='p-s '>{item.answer as string}</p>
							)}
						</div>
					</div>
				</button>
			</div>
			<Separator className='bg-white/30' />
		</div>
	);
});

FAQItemComponent.displayName = 'FAQItemComponent';

const FAQ_LIST: FAQItem[] = [
  {
    id: '1',
    question: 'Как записаться на фотосессию?',
    answer:
      'Вы можете записаться, заполнив форму обратной связи на моём сайте или написав мне на электронную почту [ваш email]. Я свяжусь с вами в течение 24 часов, чтобы обсудить детали и назначить съёмку.',
  },
  {
    id: '2',
    question: 'Какие цены на фотосессии?',
    answer: [
      'Портретные съёмки начинаются от $200.',
      'Съёмка мероприятий — от $500.',
      'Стоимость коммерческой и предметной съёмки рассчитывается индивидуально, исходя из объёма проекта.',
    ],
  },
  {
    id: '3',
    question: 'Что входит в стоимость съёмки?',
    answer: [
      'Предварительная консультация.',
      'Проведение фотосессии.',
      'Профессиональная обработка выбранных фотографий.',
      'Определённое количество изображений в высоком разрешении.',
      'Онлайн-галерея для просмотра и скачивания фотографий.',
    ],
  },
  {
    id: '4',
    question: 'На каких видах фотографии вы специализируетесь?',
    answer:
      'Я занимаюсь различными видами съёмки, включая портретную, тревел, коммерческую, предметную, событийную и пейзажную фотографию. Примеры моих работ вы можете посмотреть в портфолио.',
  },
  {
    id: '5',
    question: 'Что включают ваши пакеты фотосъёмки?',
    answer:
      'Мои пакеты, как правило, включают предварительную консультацию, саму съёмку, профессиональную обработку и определённое количество изображений в высоком разрешении. Также дополнительно доступны печать и создание фотоальбомов.',
  },
  {
    id: '6',
    question: 'Сколько обычно длится фотосессия?',
    answer:
      'Большинство фотосессий длятся от 1 до 2 часов в зависимости от типа съёмки и количества локаций. Съёмки мероприятий, как правило, занимают больше времени.',
  },
  
];

export const FAQ = () => {
	const [openItems, setOpenItems] = useState<Set<string>>(new Set());

	const toggleItem = useCallback((id: string) => {
		setOpenItems(prev => {
			const newSet = new Set(prev);
			newSet.has(id) ? newSet.delete(id) : newSet.add(id);
			return newSet;
		});
	}, []);

	return (
		<div className=' pt-7.5  pb-15 md:py-[150px] px-(--px) flex  md:flex-col items-center'>
			<div className='wrapper relative flex flex-col md:flex-row gap-10 md:gap-24'>
				<div className='md:sticky md:top-[66px] h-min '>
					<div className='flex flex-col items-center md:items-start'>
						<h2 className='h2-l text-deep-orange'>
							FAQ <br className='hidden md:block' />
							Frenzy:
						</h2>
						<h2 className='h2-s'>Все ответы здесь</h2>
					</div>
				</div>
				<div className='w-full overflow-hidden'>
					<div className='flex flex-col'>
						{FAQ_LIST.map((item, index) => (
							<FAQItemComponent
								key={item.id}
								item={item}
								isOpen={openItems.has(item.id)}
								onToggle={() => toggleItem(item.id)}
								isLast={index === FAQ_LIST.length - 1}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
