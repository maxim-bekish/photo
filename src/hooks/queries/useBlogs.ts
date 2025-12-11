import { useQuery } from '@tanstack/react-query';
import { BlogsAPI } from '@/src/app/api/endpoints/blogs.api';
import { QueryKeys } from '@/src/utils/queryKeys';
import { ArticlesItem } from '@/src/shared/types';

export const useBlogs = () => {
	return useQuery<ArticlesItem[]>({
		queryKey: QueryKeys.blogs(''),
		queryFn: BlogsAPI.getAll,
		staleTime: 1000 * 60,
	});
};
