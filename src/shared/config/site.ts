/** Полный адрес сайта: для sitemap, robots и ссылок на картинки в превью */
export const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL ??
	(process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: 'http://localhost:3000');
