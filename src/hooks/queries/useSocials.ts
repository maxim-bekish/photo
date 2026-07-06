import { useQuery } from '@tanstack/react-query';
import { SocialsAPI } from '@/src/app/api/endpoints/socials.api';
import { QueryKeys } from '@/src/utils/queryKeys';
import { Social,  } from '@/src/shared/types';

export const useSocials = () => {
	return useQuery<Social[]>({
		queryKey: QueryKeys.socials(),
		queryFn: SocialsAPI.getAll,
		staleTime: 1000 * 60,
	});
};
