import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getReviews } from '@/src/lib/vercel-loader';
import { QueryKeys } from '@/src/utils/queryKeys';
import { texts } from '@/src/shared/config/texts';
import ReviewsList from './ReviewsList';

export const metadata: Metadata = {
	title: texts.reviews.title,
	description: texts.reviews.description,
};

export const revalidate = 60;

export default async function ReviewsPage() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({ queryKey: QueryKeys.reviews(), queryFn: getReviews });

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ReviewsList />
		</HydrationBoundary>
	);
}
