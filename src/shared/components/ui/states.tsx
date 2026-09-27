import { cn } from '../../lib/utils';
import { Skeleton } from './skeleton';

/** Заглушка на время загрузки секции главной — держит примерную высоту, чтобы страница не прыгала */
export const SectionSkeleton = ({ className }: { className?: string }) => (
	<div className='px-(--px) py-[60px] md:py-[100px]'>
		<Skeleton className={cn('wrapper mx-auto h-[400px]', className)} />
	</div>
);

/** Сообщение вместо списка: пусто или ошибка загрузки */
export const EmptyState = ({ text, className }: { text: string; className?: string }) => (
	<div className={cn('col-span-full text-creamy-white/60 text-center py-20 p-s', className)}>{text}</div>
);
