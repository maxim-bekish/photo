// src/lib/api-resources.ts
import { AlbumItem, ArticlesItem, Brand, Expertise, Reviews } from '@/src/shared/types';
import { createApiClient } from '@/src/app/api/http/createApiClient';
import { createQueryHook } from '@/src/hooks/queries/createQueryHook';
import { QueryKeys } from '@/src/utils/queryKeys';

export const apiResources = {
	albums: {
		api: createApiClient<AlbumItem>('albums'),
		useQuery: createQueryHook<AlbumItem[]>({
			queryKey: QueryKeys.albums(),
			queryFn: () => createApiClient<AlbumItem>('albums').getAll(),
		}),
		useQueryById: (id: string) =>
			createQueryHook<AlbumItem>({
				queryKey: QueryKeys.album(id),
				queryFn: () => createApiClient<AlbumItem>('albums').getById(id),
			}),
	},
	blogs: {
		api: createApiClient<ArticlesItem>('blogs'),
		useQuery: createQueryHook<ArticlesItem[]>({
			queryKey: QueryKeys.blogs(''),
			queryFn: () => createApiClient<ArticlesItem>('blogs').getAll(),
		}),
		useQueryById: (id: string) =>
			createQueryHook<ArticlesItem>({
				queryKey: QueryKeys.album(id),
				queryFn: () => createApiClient<ArticlesItem>('blogs').getById(id),
			}),
	},
	// ... остальные ресурсы
};

// Использование:
// const { data } = apiResources.albums.useQuery();
