'use client';

import { useInertialScroll } from './useInertialScroll';
import { Brands } from '../shared/components/home/Brands';
import { Albums } from '../shared/components/home/Albums';
import { Expertise } from '../shared/components/home/Expertise';
import { Clients } from '../shared/components/home/Clients';
import { Articles } from '../shared/components/home/Articles';
import { FAQ } from '../shared/components/home/FAQ';
import Hero from '../shared/components/home/Hero';

export default function Home() {
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
