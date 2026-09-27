'use client';

import { EmptyState } from '@/src/shared/components/ui/states';
import { texts } from '@/src/shared/config/texts';
import { useReviews } from '@/src/hooks/queries/useReviews';
import { CardReviews } from '@/src/shared/components/ui/CardReviews';
import { Skeleton } from '@/src/shared/components/ui/skeleton';
import { Reviews } from '@/src/shared/types';

import LayoutPage from '../layoutPage';

const COLUMNS = 3;

/**
 * Раскладывает отзывы по колонкам: основная часть — по кругу,
 * остаток 1 уходит в центральную колонку, остаток 2 — в крайние.
 */
function splitIntoColumns(items: Reviews[]): Reviews[][] {
	const columns: Reviews[][] = Array.from({ length: COLUMNS }, () => []);
	const baseItemsCount = Math.floor(items.length / COLUMNS) * COLUMNS;
	const remainder = items.length % COLUMNS;

	items.forEach((item, index) => {
		let targetCol = index % COLUMNS;

		if (index >= baseItemsCount) {
			if (remainder === 1) {
				targetCol = 1;
			} else if (remainder === 2) {
				targetCol = index - baseItemsCount === 0 ? 0 : 2;
			}
		}

		columns[targetCol].push(item);
	});

	return columns;
}

export default function ReviewsPage() {
	const { data: reviews, isLoading, isError } = useReviews();

	if (isLoading) {
		return (
			<LayoutPage title={texts.reviews.title}>
				<div className='wrapper flex flex-col xl:flex-row gap-2.5 items-center xl:items-start'>
					{Array.from({ length: COLUMNS }).map((_, index) => (
						<div key={index} className='flex flex-col w-full md:max-w-[600px] gap-2.5 flex-1'>
							<Skeleton className='h-[300px]' />
							<Skeleton className='h-[250px]' />
						</div>
					))}
				</div>
			</LayoutPage>
		);
	}

	if (isError || !reviews?.length) {
		return (
			<LayoutPage title={texts.reviews.title}>
				<EmptyState text={isError ? texts.reviews.error : texts.reviews.empty} />
			</LayoutPage>
		);
	}

	return (
		<LayoutPage title={texts.reviews.title}>
			<div className='wrapper flex flex-col xl:flex-row gap-2.5 relative items-center xl:items-start '>
				{splitIntoColumns(reviews).map((group, index) => (
					<div
						key={index}
						className='flex flex-col w-full md:max-w-[600px] gap-2.5 h-full flex-1 xl:sticky xl:top-0'>
						{group.map((el) => (
							<CardReviews className='bg-white/5 w-full' key={el.id} el={el} />
						))}
					</div>
				))}
			</div>
		</LayoutPage>
	);
}
