import { useQuery } from '@tanstack/react-query';
import { AlbumsAPI } from '@/src/app/api/endpoints/albums.api';
import { QueryKeys } from '@/src/utils/queryKeys';
import { AlbumItem } from '@/src/shared/types';

export const useAlbums = () => {
	return useQuery<AlbumItem[]>({
		queryKey: QueryKeys.albums(),
		queryFn: AlbumsAPI.getAll,
		staleTime: 1000 * 60,
	});
};
export const useAlbum = (id: string) => {
	return useQuery<AlbumItem>({
		queryKey: QueryKeys.album(id),
		queryFn: () => AlbumsAPI.getAlbumById(id),
		staleTime: 1000 * 60,
	});
};
