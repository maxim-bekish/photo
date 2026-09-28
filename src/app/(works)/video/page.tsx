import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getVideos } from '@/src/lib/vercel-loader';
import { QueryKeys } from '@/src/utils/queryKeys';
import { texts } from '@/src/shared/config/texts';
import VideoList from './VideoList';

export const metadata: Metadata = {
	title: texts.works.videosTitle,
	description: texts.works.videosDescription,
};

export const revalidate = 60;

export default async function VideoPage() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({ queryKey: QueryKeys.videos(), queryFn: getVideos });

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<VideoList />
		</HydrationBoundary>
	);
}
