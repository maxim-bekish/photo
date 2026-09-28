import type { MetadataRoute } from 'next';
import { getAlbums, getBlogs } from '@/src/lib/vercel-loader';
import { SITE_URL } from '@/src/shared/config/site';

// Пересобирать sitemap раз в час, чтобы новые альбомы и статьи из админки попадали в него без деплоя
export const revalidate = 3600;

const STATIC_PATHS = ['/', '/about', '/albums', '/video', '/reviews', '/blogs', '/contacts'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// 1. Статические страницы: превращаем каждый путь в объект с полным адресом
	const staticPages = STATIC_PATHS.map((path) => ({ url: `${SITE_URL}${path}` }));

	// 2. Альбомы и статьи из БД. Если БД недоступна, отдаём хотя бы статические страницы
	try {
		const [albums, articles] = await Promise.all([getAlbums(), getBlogs()]);

		const albumPages = albums.map((album) => ({ url: `${SITE_URL}/albums/${album.id}` }));
		const articlePages = articles.map((article) => ({
			url: `${SITE_URL}/blogs/${article.id}`,
			lastModified: article.date,
		}));

		return [...staticPages, ...albumPages, ...articlePages];
	} catch {
		return staticPages;
	}
}
