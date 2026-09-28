import type { Metadata } from 'next';
import { Providers } from './providers';
import { Inter, Montserrat } from 'next/font/google';
import localFont from 'next/font/local';
import { SiteLayout } from '../shared/components/SiteLayout';
import { getSettings, getSocials } from '../lib/vercel-loader';
import './globals.css';
import { SITE_URL } from '../shared/config/site';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { QueryKeys } from '../utils/queryKeys';
import { cache } from 'react';

// Настройки нужны и метаданным, и шапке/футеру — один запрос в БД на рендер
const getSettingsCached = cache(getSettings);

// Шапка и футер берут данные из БД — обновлять все страницы хотя бы раз в минуту
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
	try {
		const settings = await getSettingsCached();
		const fullName = [settings.first_name, settings.last_name].filter(Boolean).join(' ');
		return {
			title: {
				default: settings.meta_title || (fullName ? `${fullName} — фотограф` : 'Фотограф'),
				template: fullName ? `%s — ${fullName}` : '%s',
			},

			description: settings.meta_description || undefined,
			metadataBase: new URL(SITE_URL),
		};
	} catch {
		// БД недоступна — страница всё равно должна отрендериться
		return { title: 'Фотограф', metadataBase: new URL(SITE_URL) };
	}
}
const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-inter',
	weight: ['100', '200', '300', '400', '500', '700'],
	display: 'swap',
});

const montserrat = Montserrat({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-montserrat',
	weight: ['200', '300', '400', '500', '700'],
	display: 'swap',
});

const clashDisplay = localFont({
	src: [
		{
			path: './fonts/ClashDisplay-Variable.woff2',
			style: 'normal',
			weight: '100 900', // диапазон variable-font
		},
	],
	declarations: [
		{
			prop: 'unicode-range',
			value: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
		},
	],
	variable: '--font-clash-display',
});
const satoshi = localFont({
	src: [
		{
			path: './fonts/Satoshi-Variable.woff2',
			style: 'normal',
			weight: '100 900', // диапазон variable-font
		},
	],
	variable: '--font-satoshi',
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const queryClient = new QueryClient();

	await Promise.all([
		queryClient.prefetchQuery({ queryKey: QueryKeys.settings(), queryFn: getSettingsCached }),
		queryClient.prefetchQuery({ queryKey: QueryKeys.socials(), queryFn: getSocials }),
	]);

	return (
		<html lang='ru' className='dark'>
			<body
				className={`${clashDisplay.variable} ${satoshi.variable} ${inter.variable} ${montserrat.variable} scrollBar  antialiased`}>
				<Providers>
					<HydrationBoundary state={dehydrate(queryClient)}>
						<SiteLayout>{children}</SiteLayout>
					</HydrationBoundary>
				</Providers>
			</body>
		</html>
	);
}
