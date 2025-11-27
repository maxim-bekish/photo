'use client';

import About from '@/src/shared/components/about/About';
import Hero from '@/src/shared/components/about/Hero';
import Quality from '@/src/shared/components/about/Quality';

import { useInertialScroll } from '@/src/shared/hooks/useInertialScroll';

export default function () {
	useInertialScroll();

	return (
		<>
			<Hero />
			<About />
			<Quality />
		</>
	);
}
