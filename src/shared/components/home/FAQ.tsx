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
					<div className='flex items-center relative justify-between'>
						<p className='body3 group-hover:text-deep-orange transition-colors w-11/12 text-creamy-white'>
							{item.question}
						</p>
						<div  className='absolute top-1/2 -translate-y-1/2 right-0 transition-colors'>
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
		question: 'How do I book a photography session with you?',
		answer:
			"You can book a session by filling out the contact form on my website or by emailing me directly at [your email address]. I'll get back to you within 24 hours to discuss the details and schedule your shoot.",
	},
	{
		id: '2',
		question: 'What are your rates for photography sessions?',
		answer: [
			'Portrait sessions start at $200.',
			'Event photography starts at $500.',
			'Commercial and product photography pricing is customized based on the project scope.',
		],
	},
	{
		id: '3',
		question: 'What does your pricing include?',
		answer: [
			'Pre-shoot consultation.',
			'The photography session.',
			'Professional editing of selected images.',
			'A set number of high-resolution digital images.',
			'Online gallery for viewing and downloading photos.',
		],
	},
	{
		id: '4',
		question: 'What types of photography do you specialize in?',
		answer:
			'I specialize in a variety of photography services including portrait, travel, commercial, product, event, and landscape photography. Check out my portfolio to see examples of my work.',
	},
	{
		id: '5',
		question: 'What is included in your photography packages?',
		answer:
			'My packages typically include a pre-shoot consultation, the photography session, professional editing, and a set number of high-resolution digital images. I also offer prints and albums as add-ons.',
	},
	{
		id: '6',
		question: 'How long does a typical photo session last?',
		answer:
			'Most sessions last between 1-2 hours, depending on the type of shoot and the number of locations. Larger events will naturally take longer.',
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
		<div className='py-[150px] px-10 flex flex-col items-center'>
			<div className='wrapper relative flex  gap-24'>
				<div className='sticky top-[66px] h-min '>
					<div className='flex flex-col '>
						<h2 className='h2-l text-deep-orange'>
							FAQ <br />
							Frenzy:
						</h2>
						<h2 className='h2-s'>All your answers here</h2>
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
