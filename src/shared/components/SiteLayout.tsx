'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';
import { Header } from './Header';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { DesignTweaks } from './DesignTweaks';

const SHOW_STYLE_PANEL =
	process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_STYLE_PANEL === 'true';

export function SiteLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const isAdminPage = pathname?.startsWith('/admin') || pathname === '/admin-login';

	// Плавный скролл на всех публичных страницах; в админке — обычная прокрутка
	useSmoothScroll(!isAdminPage);

	if (isAdminPage) {
		return <>{children}</>;
	}

	return (
		<>
			<Header />
			{children}
			<Footer />
			{/* Панель подбора стиля: в dev и на демо-сайте (NEXT_PUBLIC_STYLE_PANEL=true), у покупателя скрыта */}
			{SHOW_STYLE_PANEL && <DesignTweaks />}
			<div
				id='cursor-custom'
				className='fixed  top-0 left-0 w-14.5 h-14.5 pointer-events-none  opacity-0 z-9999'>
				<div className='custom-text body1 uppercase whitespace-nowrap absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2' />
				<div className='absolute top-0 left-0'>
					<span className='block w-2 h-px absolute top-0 left-0 bg-white'></span>
					<span className='block w-px h-2 absolute top-0 left-0 bg-white'></span>
				</div>
				<div className='absolute bottom-0 left-0'>
					<span className='block w-px h-2 absolute bottom-0 left-0 bg-white'></span>
					<span className='block w-2 h-px absolute bottom-0 left-0 bg-white'></span>
				</div>
				<div className='absolute bottom-0 right-0'>
					<span className='block w-px h-2 absolute bg-white bottom-0 right-0'></span>
					<span className='block w-2 h-px absolute bg-white bottom-0 right-0'></span>
				</div>
				<div className='absolute top-0 right-0'>
					<span className='block w-px h-2 absolute top-0 right-0 bg-white'></span>
					<span className='block w-2 h-px absolute top-0 right-0 bg-white'></span>
				</div>
			</div>
		</>
	);
}
