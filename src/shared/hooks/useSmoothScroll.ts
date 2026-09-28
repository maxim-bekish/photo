'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Плавный скролл колесом мыши (Lenis), синхронизированный с GSAP ScrollTrigger.
 * Из коробки: тач — нативная прокрутка, Ctrl + колесо (зум) не перехватывается,
 * при «уменьшить движение» в системе сглаживание отключается.
 */
export const useSmoothScroll = () => {
	useEffect(() => {
		const lenis = new Lenis({ lerp: 0.1 });

		// ScrollTrigger пересчитывает анимации на каждом шаге Lenis, а Lenis крутится в тикере GSAP —
		// так анимации на скролле и сам скролл идут в одном кадре
		lenis.on('scroll', ScrollTrigger.update);
		const raf = (time: number) => lenis.raf(time * 1000);
		gsap.ticker.add(raf);
		gsap.ticker.lagSmoothing(0);

		// Пока открыто меню (Header ставит data-menu-open на body), страница не скроллится
		const syncWithMenu = () => {
			if (document.body.getAttribute('data-menu-open') === 'true') lenis.stop();
			else lenis.start();
		};
		const observer = new MutationObserver(syncWithMenu);
		observer.observe(document.body, { attributes: true, attributeFilter: ['data-menu-open'] });
		syncWithMenu();

		return () => {
			observer.disconnect();
			gsap.ticker.remove(raf);
			gsap.ticker.lagSmoothing(500, 33); // значения GSAP по умолчанию
			lenis.destroy();
		};
	}, []);
};
