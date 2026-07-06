import { useQuery } from '@tanstack/react-query';
import { VideosAPI } from '@/src/app/api/endpoints/videos.api';
import { QueryKeys } from '@/src/utils/queryKeys';
import { VideoItem } from '@/src/shared/types';

export const useVideos = () => {
	return useQuery<VideoItem[]>({
		queryKey: QueryKeys.videos(),
		queryFn: VideosAPI.getAll,
		staleTime: 1000 * 60,
	});
};
