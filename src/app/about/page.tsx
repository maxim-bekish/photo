import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAwards, getGear, getQualities } from '@/src/lib/vercel-loader';
import { QueryKeys } from '@/src/utils/queryKeys';
import { texts } from '@/src/shared/config/texts';
import AboutView from './AboutView';

export const metadata: Metadata = {
	title: texts.nav.about,
	description: texts.about.description,
};

export const revalidate = 60;

export default async function AboutPage() {
	const queryClient = new QueryClient();
	// settings (имя, тексты, картинки) уже предзагружены в layout.tsx
	await Promise.all([
		queryClient.prefetchQuery({ queryKey: QueryKeys.qualities(), queryFn: getQualities }),
		queryClient.prefetchQuery({ queryKey: QueryKeys.awards(), queryFn: getAwards }),
		queryClient.prefetchQuery({ queryKey: QueryKeys.gear(), queryFn: getGear }),
	]);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<AboutView />
		</HydrationBoundary>
	);
}
