import { ScrollIndicator } from '../ui/ScrollIndicator';

export default function Hero() {
	return (
		<section className='relative px-(--px) pt-[130px] h-[70vh] md:h-screen w-full pb-[50px] flex items-end'>
			<div className='absolute overflow-hidden md:bottom-[150px] left-1/2 -translate-x-1/2 w-[286px] md:w-[362px] top-[90px] md:top-[150px] bottom-20'>
				<img
					className='w-full h-full object-cover object-center animate-floatY'
					src='assets/about/hero.avif'
					alt=''
				/>
			</div>
			<div className='flex flex-col gap-9 flex-1 items-center'>
				<div className='wrapper-small flex flex-col gap-2.5 w-full'>
					<p className='h1 relative '>Finnegan</p>
					<p className='h1 text-right'>Manroe</p>
				</div>
				<ScrollIndicator />
			</div>
		</section>
	);
}
