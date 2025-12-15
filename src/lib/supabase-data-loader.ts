import { AlbumItem, ArticlesItem, Brand, Expertise } from '@/src/shared/types';
import { getSupabaseServer } from './supabase-server';

export async function getBlogs(): Promise<ArticlesItem[]> {
	try {
		const supabase = getSupabaseServer();
		const { data, error } = await supabase
			.from('blogs')
			.select('*')
			.order('date', { ascending: false });

		if (error) {
			console.error('Ошибка при получении блогов из Supabase:', error);
			return [];
		}

		return (data as ArticlesItem[]) || [];
	} catch (error) {
		console.error('Ошибка при получении блогов:', error);
		return [];
	}
}

export async function getBlogById(id: string): Promise<ArticlesItem | null> {
	try {
		const supabase = getSupabaseServer();
		const { data, error } = await supabase
			.from('blogs')
			.select('*')
			.or(`id.eq.${id},href.eq.${id}`)
			.maybeSingle();

		if (error) {
			console.error('Ошибка при получении блога из Supabase:', error);
			return null;
		}

		return (data as ArticlesItem) || null;
	} catch (error) {
		console.error('Ошибка при получении блога:', error);
		return null;
	}
}

export async function getAlbums(): Promise<AlbumItem[]> {
	try {
		const supabase = getSupabaseServer();
		const { data, error } = await supabase.from('albums').select(`
        *,
        gallery(src,gallery_id),
        characteristics(code, icon, value)
      `);

		if (error) {
			console.error('Ошибка при получении альбомов из Supabase:', error);

			return [];
		}

		return (data as AlbumItem[]) || [];
	} catch (error) {
		console.error('Ошибка при получении альбомов:', error);
		return [];
	}
}

export async function getAlbumById(id: string): Promise<AlbumItem | null> {
	try {
		const supabase = getSupabaseServer();
		const { data, error } = await supabase
			.from('albums')
			.select(
				`
        *,
        gallery(src,gallery_id),
        characteristics(code, icon, value)
      `,
			)
			.or(`id.eq.${id},href.eq.${id}`)
			.maybeSingle();

		if (error) {
			console.error('Ошибка при получении альбома из Supabase:', error);
			return null;
		}

		return (data as AlbumItem) || null;
	} catch (error) {
		console.error('Ошибка при получении альбома:', error);
		return null;
	}
}

export async function getExpertise(): Promise<{ main: Expertise[]; sub: Expertise[] }> {
	try {
		const supabase = getSupabaseServer();
		const { data, error } = await supabase.from('expertise').select(`*`);
		if (error) {
			console.error('Ошибка при получении Expertise из Supabase:', error);

			return { main: [], sub: [] };
		}

		const main: Expertise[] = [];
		const sub: Expertise[] = [];
		data?.forEach((item) => {
			if (item.src !== null && main.length < 4) {
				main.push(item);
			} else {
				sub.push(item);
			}
		});
		const result = { main: main, sub: sub };
		console.log('[------result------]', result);
		return result;
	} catch (error) {
		console.error('Ошибка при получении брендов:', error);
		return { main: [], sub: [] } as { main: Expertise[]; sub: Expertise[] };
	}
}

export async function getBrands(): Promise<Brand[]> {
	try {
		const supabase = getSupabaseServer();
		const { data, error } = await supabase.from('brands').select('*');
		if (error) {
			console.error('Ошибка при получении брендов из Supabase:', error);

			return [];
		}

		return (data as Brand[]) || [];
	} catch (error) {
		console.error('Ошибка при получении брендов:', error);
		return [];
	}
}
