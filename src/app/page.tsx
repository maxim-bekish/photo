'use client';

import { useInertialScroll } from '@/src/shared/hooks/useInertialScroll';
import { Albums } from '../shared/components/home/Albums';
import { Articles } from '../shared/components/home/Articles';
import { Brands } from '../shared/components/home/Brands';
import { Clients } from '../shared/components/home/Clients';
import { Expertise } from '../shared/components/home/Expertise';
import { FAQ } from '../shared/components/home/FAQ';
import Hero from '../shared/components/home/Hero';

export default function () {
	useInertialScroll();

	return (
		<>
			<Hero />
			<Brands />
			<Albums />
			<Expertise />
			<Clients />
			<Articles />
			<FAQ />
		</>
	);
}
