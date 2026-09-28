import type { MetadataRoute } from 'next';
import { ALLOW_INDEXING, SITE_URL } from '@/src/shared/config/site';

export default function robots(): MetadataRoute.Robots {
	// Демо: обход разрешён, но sitemap не предлагаем; от выдачи защищает noindex в layout
	if (!ALLOW_INDEXING) {
		return { rules: { userAgent: '*', allow: '/' } };
	}
	return {
		rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/admin-login', '/api'] },
		sitemap: `${SITE_URL}/sitemap.xml`,
	};
}
