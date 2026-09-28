'use client';

import About from '@/src/shared/components/about/About';
import Hero from '@/src/shared/components/about/Hero';
import Quality from '@/src/shared/components/about/Quality';
import Awards from '@/src/shared/components/about/Awards';
import Gears from '@/src/shared/components/about/Gears';

import { useSmoothScroll } from '@/src/shared/hooks/useSmoothScroll';

export default function AboutView() {
	useSmoothScroll();

	return (
		<>
			<Hero />
			<About />
			<Quality />
			<Awards />
			<Gears />
		</>
	);
}
