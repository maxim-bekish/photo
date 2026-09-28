import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAlbums } from '@/src/lib/vercel-loader';
import { QueryKeys } from '@/src/utils/queryKeys';
import { texts } from '@/src/shared/config/texts';
import AlbumsList from './AlbumsList';

export const metadata: Metadata = {
	title: texts.works.albumsTitle,
	description: texts.works.albumsDescription,
};

// Обновлять страницу раз в минуту, чтобы новые альбомы из админки появлялись без деплоя
export const revalidate = 60;

export default async function AlbumsPage() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({ queryKey: QueryKeys.albums(), queryFn: getAlbums });

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<AlbumsList />
		</HydrationBoundary>
	);
}
