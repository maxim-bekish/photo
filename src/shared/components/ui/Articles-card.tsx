import { cn } from '../../lib/utils';
import { Badge } from './badge';

interface ArticlesItem {
	id: string;
	src: string;
	message: string;
	badge: string[];
	subTitle?: string;
}

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
		<div
			ref={setItemRef}
			className={cn(
				'flex cursor-pointer group gap-1 shrink-0 flex-col ',
				row && 'flex-col md:flex-row',
				className
			)}>
			<div
				className={cn(
					' overflow-hidden relative',
					row && 'md:flex-1',
					big ? 'h-[250px] md:h-[400px]' : 'h-[250px]'
				)}>
				{el.subTitle && (
					<Badge className='absolute top-3 left-3 z-10' variant='dark'>
						{el.subTitle}
					</Badge>
				)}
				<img
					className='w-full h-full object-cover group-hover:scale-110 transition-all duration-1000'
					src={el.src}
					alt='img-article'
				/>
			</div>
			<div
				className={cn(
					'flex flex-1 flex-col bg-white/10 p-4 gap-2.5',
					row && 'h-auto justify-between'
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
					{el.badge.map((badge, index) => (
						<Badge variant='secondary' key={index}>
							{badge}
						</Badge>
					))}
				</div>
			</div>
		</div>
	);
};
