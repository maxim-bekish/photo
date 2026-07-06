// src/hooks/queries/createQueryHook.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface QueryConfig<T> {
  queryKey: string[];
  queryFn: () => Promise<T>;
  staleTime?: number;
}

export function createQueryHook<T>(config: QueryConfig<T>) {
  return (options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>) => {
    return useQuery<T>({
      queryKey: config.queryKey,
      queryFn: config.queryFn,
      staleTime: config.staleTime ?? 1000 * 60,
      ...options,
    });
  };
}

// Использование:
// export const useAlbums = createQueryHook<AlbumItem[]>({
//   queryKey: QueryKeys.albums(),
//   queryFn: AlbumsAPI.getAll,
// });