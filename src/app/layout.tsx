import type { Metadata } from 'next';
import { Providers } from './providers';
import { Inter, Montserrat } from 'next/font/google';
import localFont from 'next/font/local';
import { SiteLayout } from '../shared/components/SiteLayout';
import { getSettings } from '../lib/vercel-loader';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
	try {
		const settings = await getSettings();
		const fullName = [settings.first_name, settings.last_name].filter(Boolean).join(' ');
		return {
			title: settings.meta_title || (fullName ? `${fullName} — фотограф` : 'Фотограф'),
			description: settings.meta_description || undefined,
		};
	} catch {
		// БД недоступна — страница всё равно должна отрендериться
		return { title: 'Фотограф' };
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
			value:
				'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ru' className='dark'>
			<body
				className={`${clashDisplay.variable} ${satoshi.variable} ${inter.variable} ${montserrat.variable} scrollBar  antialiased`}>
				<Providers>
					<SiteLayout>{children}</SiteLayout>
				</Providers>
			</body>
		</html>
	);
}
