import { api } from '@/src/app/api/http/axiosInstance';
import { Award, FaqItem, GearCategory, Quality, SiteSettings, Stat } from '@/src/shared/types';
import { QueryKeys } from '@/src/utils/queryKeys';
import { createQueryHook } from './createQueryHook';

const get = <T>(url: string) => () => api.get<T>(url).then((res) => res.data);

// Контент сайта редко меняется — держим в кеше дольше обычного
const staleTime = 1000 * 60 * 5;

export const useSettings = createQueryHook<SiteSettings>({
	queryKey: QueryKeys.settings(),
	queryFn: get('/settings'),
	staleTime,
});

export const useStats = createQueryHook<Stat[]>({
	queryKey: QueryKeys.stats(),
	queryFn: get('/stats'),
	staleTime,
});

export const useFaq = createQueryHook<FaqItem[]>({
	queryKey: QueryKeys.faq(),
	queryFn: get('/faq'),
	staleTime,
});

export const useAwards = createQueryHook<Award[]>({
	queryKey: QueryKeys.awards(),
	queryFn: get('/awards'),
	staleTime,
});

export const useGear = createQueryHook<GearCategory[]>({
	queryKey: QueryKeys.gear(),
	queryFn: get('/gear'),
	staleTime,
});

export const useQualities = createQueryHook<Quality[]>({
	queryKey: QueryKeys.qualities(),
	queryFn: get('/qualities'),
	staleTime,
});
