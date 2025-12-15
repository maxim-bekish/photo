import { useQuery } from '@tanstack/react-query';
import { BrandsAPI } from '@/src/app/api/endpoints/brands.api';
import { QueryKeys } from '@/src/utils/queryKeys';
import { Brand } from '@/src/shared/types';

export const useBrands = () => {
	return useQuery<Brand[]>({
		queryKey: QueryKeys.brands(),
		queryFn: BrandsAPI.getAll,
		staleTime: 1000 * 60,
	});
};
