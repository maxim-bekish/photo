import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import {
	getAlbums,
	getBlogs,
	getBrands,
	getExpertise,
	getFaq,
	getReviews,
	getStats,
} from '@/src/lib/vercel-loader';
import { QueryKeys } from '@/src/utils/queryKeys';
import HomeView from './HomeView';

// title и description не задаём: для главной берётся default из layout.tsx

export const revalidate = 60;

export default async function HomePage() {
	const queryClient = new QueryClient();
	// settings (слоган, тексты Hero и «Обо мне») уже предзагружены в layout.tsx
	await Promise.all([
		queryClient.prefetchQuery({ queryKey: QueryKeys.stats(), queryFn: getStats }),
		queryClient.prefetchQuery({ queryKey: QueryKeys.brands(), queryFn: getBrands }),
		queryClient.prefetchQuery({ queryKey: QueryKeys.albums(), queryFn: getAlbums }),
		queryClient.prefetchQuery({ queryKey: QueryKeys.expertise(), queryFn: getExpertise }),
		queryClient.prefetchQuery({ queryKey: QueryKeys.reviews(), queryFn: getReviews }),
		queryClient.prefetchQuery({ queryKey: QueryKeys.blogs(''), queryFn: getBlogs }),
		queryClient.prefetchQuery({ queryKey: QueryKeys.faq(), queryFn: getFaq }),
	]);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<HomeView />
		</HydrationBoundary>
	);
}
