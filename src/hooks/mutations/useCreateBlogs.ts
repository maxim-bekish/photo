import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BlogsAPI } from '@/src/app/api/endpoints/blogs.api';
import { QueryKeys } from '@/src/utils/queryKeys';
import { ArticlesItem } from '@/src/shared/types';
import { api } from '@/src/app/api/http/axiosInstance';

export const useCreateBlogs = () => {
	const client = useQueryClient();

	return useMutation({
		mutationFn: (blog: ArticlesItem) => api.post('/admin/blogs', blog),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: QueryKeys.blogs('') });
		},
	});
};
