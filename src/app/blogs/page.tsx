import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getBlogs } from '@/src/lib/vercel-loader';
import { QueryKeys } from '@/src/utils/queryKeys';
import { texts } from '@/src/shared/config/texts';
import BlogsList from './BlogsList';

export const metadata: Metadata = {
	title: texts.blogs.title,
	description: texts.blogs.description,
};

export const revalidate = 60;

export default async function BlogsPage() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({ queryKey: QueryKeys.blogs(''), queryFn: getBlogs });

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<BlogsList />
		</HydrationBoundary>
	);
}
