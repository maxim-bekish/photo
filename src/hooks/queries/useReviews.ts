import { useQuery } from '@tanstack/react-query';
import { ReviewsAPI } from '@/src/app/api/endpoints/reviews.api';
import { QueryKeys } from '@/src/utils/queryKeys';
import { Reviews } from '@/src/shared/types';

export const useReviews = () => {
	return useQuery<Reviews[]>({
		queryKey: QueryKeys.reviews(),
		queryFn: ReviewsAPI.getAll,
		staleTime: 1000 * 60,
	});
};
