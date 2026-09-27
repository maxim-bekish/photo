'use client';

import { useGear } from '@/src/hooks/queries/useSiteContent';
import { DynamicIcon } from 'lucide-react/dynamic';

export default function Gears() {
	const { data: categories = [] } = useGear();

	if (!categories.length) return null;

	return (
		<section className='px-(--px) pt-[30px] pb-[60px] md:py-[150px]'>
			<div className='wrapper-small flex flex-col gap-10 md:gap-[60px]'>
				<h2 className='h2-l text-deep-orange text-center'>Моя техника</h2>
				<div className='flex flex-col gap-[100px] py-[30px] px-(--px) border border-solid border-white/10 bg-white/5'>
					{categories.map((category) => (
						<div key={category.id} className='flex flex-col gap-[18px] '>
							<h3 className='h3 text-creamy-white'>{category.title}</h3>

							<ul className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[15px]  '>
								{category.items.map((item) => (
									<li key={item.id} className='flex gap-[10px] items-center '>
										<DynamicIcon
											name={category.icon}
											className='w-[22px] h-[22px] text-deep-orange'
										/>
										{item.link ? (
											<a
												href={item.link}
												target='_blank'
												rel='noopener noreferrer'
												className='p-s   text-creamy-white/60 hover:text-light-orange/70 transition-all duration-200'>
												{item.value}
											</a>
										) : (
											<span className='p-s text-creamy-white/60'>{item.value}</span>
										)}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
