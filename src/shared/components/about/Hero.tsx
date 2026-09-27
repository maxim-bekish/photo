'use client';

import { useSettings } from '@/src/hooks/queries/useSiteContent';
import { ScrollIndicator } from '../ui/ScrollIndicator';

export default function Hero() {
	const { data: settings } = useSettings();

	return (
		<section className='relative px-(--px) pt-[130px] h-[70vh] md:h-screen w-full pb-[50px] flex items-end'>
			<div className='absolute overflow-hidden md:bottom-[150px] left-1/2 -translate-x-1/2 w-[286px] md:w-[362px] top-[90px] md:top-[150px] bottom-20 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:z-1 before:content-[""] before:bg-linear-to-t before:from-black/80 before:via-black/20 before:to-transparent'>
				{settings?.about_hero_image && (
					<img
						className='w-full h-full object-cover object-center animate-floatY'
						src={settings.about_hero_image}
						alt={`${settings.first_name} ${settings.last_name}`}
					/>
				)}
			</div>
			<div className='flex flex-col gap-9 flex-1 items-center relative z-10'>
				<div className='wrapper-small flex flex-col gap-2.5 w-full'>
					<p className='h1 relative '>{settings?.first_name}</p>
					<p className='h1 text-right'>{settings?.last_name}</p>
				</div>
				<ScrollIndicator />
			</div>
		</section>
	);
}
