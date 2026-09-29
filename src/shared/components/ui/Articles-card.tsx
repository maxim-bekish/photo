import Link from 'next/link';
import Image from 'next/image';
import { cn } from '../../lib/utils';
import { ArticlesItem } from '../../types';
import { Badge } from './badge';

export const ArticlesCard = ({
	el,
	className,
	setItemRef,
	row,
	big,
}: {
	el: ArticlesItem;
	className?: string;
	setItemRef: (el: HTMLDivElement | null) => void;
	row?: boolean;
	big?: boolean;
}) => {
	return (
		<div ref={setItemRef} >
			<Link
				href={'/blogs/' + el.id}
				className={cn(
					'flex cursor-pointer group gap-1 flex-col ',
					row && 'flex-col md:flex-row  md:gap-2.5',
					className
				)}>
				<div
					className={cn(
						' overflow-hidden relative ',
						// basis только в горизонтальной раскладке: в колонке (мобильный) он задаёт высоту
						// и перебивает h-[250px], а фото с fill не даёт блоку высоты — получался 0
						row && 'md:basis-1/2',
						big ? 'h-[250px] md:h-[400px]' : 'h-[250px]'
					)}>
					{el.subTitle && (
						<Badge className='absolute top-3 left-3 z-10' variant='dark'>
							{el.subTitle}
						</Badge>
					)}
					<Image
						className='object-cover group-hover:scale-110 transition-all duration-1000'
						src={el.src}
						alt={el.message}
						fill
						sizes='(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw'
					/>
				</div>
				<div
					className={cn(
						'flex flex-1 flex-col bg-white/10 p-4 gap-2.5',
						row && 'h-auto justify-between md:basis-1/2'
					)}>
					<h3
						className='h3-s text-creamy-white overflow-hidden text-ellipsis'
						style={{
							display: '-webkit-box',
							WebkitLineClamp: 3,
							WebkitBoxOrient: 'vertical',
							minHeight: 'calc(1em * 1.3 * 3)', // или minHeight: '78px'
						}}>
						{el.message}
					</h3>
					<div className='flex gap-2.5 flex-wrap'>
						<Badge variant='secondary'>{el.category}</Badge>
						<Badge variant='secondary'>{el.date}</Badge>
					</div>
				</div>
			</Link>
		</div>
	);
};
