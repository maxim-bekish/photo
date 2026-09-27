'use client';

import { EmptyState } from '@/src/shared/components/ui/states';
import { texts } from '@/src/shared/config/texts';
import VideoCard from '@/src/shared/components/video/VideoCard';
import LayoutWorks from '../layoutWorks';
import { useVideos } from '@/src/hooks/queries/useVideos';
import { Skeleton } from '@/src/shared/components/ui/skeleton';

export default function VideoPage() {
	const { data: videos, isLoading, isError } = useVideos();

	if (isLoading) {
		return (
			<LayoutWorks title={texts.works.videosTitle} className='gap-2'>
				<Skeleton className='h-[446px]' />
			</LayoutWorks>
		);
	}

	return (
		<LayoutWorks title={texts.works.videosTitle} className='gap-2'>
			{isError ? (
				<EmptyState text={texts.common.loadError} />
			) : videos?.length ? (
				videos.map((el) => <VideoCard key={el.id} {...el} />)
			) : (
				<EmptyState text={texts.works.videosEmpty} />
			)}
		</LayoutWorks>
	);
}
