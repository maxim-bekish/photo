'use client';

import Hero from '@/src/shared/components/about/Hero';
import About from '@/src/shared/components/about/About';

import { useInertialScroll } from '../useInertialScroll';

export default function () {
	useInertialScroll();

	return (
		<>
			<Hero />
			<About />
		</>
	);
}
