import { useQuery } from '@tanstack/react-query';
import { ExpertiseAPI } from '@/src/app/api/endpoints/expertise.api';
import { QueryKeys } from '@/src/utils/queryKeys';
import { Expertise } from '@/src/shared/types';

export const useExpertise = () => {
	return useQuery<Expertise>({
		queryKey: QueryKeys.expertise(),
		queryFn: ExpertiseAPI.getAll,
		staleTime: 1000 * 60,
	});
};
