'use client';

import Hero from '@/src/shared/components/about/Hero';
import { useInertialScroll } from '../useInertialScroll';

export default function About() {
	useInertialScroll();

	return (
		<>
			<Hero />
		</>
	);
}
