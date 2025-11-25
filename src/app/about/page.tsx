'use client';

import About from '@/src/shared/components/about/About';
import Hero from '@/src/shared/components/about/Hero';

import { useInertialScroll } from '../../hooks/useInertialScroll';

export default function () {
	useInertialScroll();

	return (
		<>
			<Hero />
			<About />
		</>
	);
}
