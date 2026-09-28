'use client';

import Image from 'next/image';
import { texts } from '@/src/shared/config/texts';
import { useAwards } from '@/src/hooks/queries/useSiteContent';
import { useState } from 'react';

export default function Awards() {
	const { data: awards = [] } = useAwards();
	// undefined — пользователь ещё ничего не выбирал, по умолчанию раскрыта первая награда
	const [selectedId, setSelectedId] = useState<string | null | undefined>(undefined);
	const activeId = selectedId === undefined ? awards[0]?.id : selectedId;

	const handleClick = (id: string) => {
		setSelectedId(activeId === id ? null : id);
	};

	if (!awards.length) return null;

	return (
		<section className='px-(--px) py-[30px] md:py-[150px]'>
			<div className='wrapper-small flex flex-col gap-[30px]'>
				<div className='flex flex-col items-center md:items-start'>
					<h2 className='h2-s'>{texts.about.awardsTitleSmall}</h2>
					<h2 className='h2-l text-deep-orange'>{texts.about.awardsTitleLarge}</h2>
				</div>
				<div className='flex flex-col items-end gap-2.5'>
					{awards.map((item, i) => {
						const isActive = activeId === item.id;
						return (
							<div
								key={item.id}
								className={`flex max-w-[500px] w-full flex-col items-end relative border-b border-white/50 ${
									!isActive ? 'group' : ''
								}`}>
								<div
									className={`cursor-pointer relative max-w-[500px] w-full  `}
									onClick={() => handleClick(item.id)}>
									<div
										className={`flex w-full gap-2.5 items-center py-2.5 transition-all duration-500 ${
											isActive ? ' ' : 'group-hover:pl-5 group-hover:pr-2.5'
										}`}>
										<span className='body1'>{i < 9 ? `0${i + 1}` : i + 1}</span>
										<p className='flex-1 body3 pr-2.5'>{item.title}</p>
										<span className='body1'>{item.year}</span>
									</div>
								</div>
								<div
									className={`transition-all duration-500 ${
										isActive ? 'h-[500px] md:h-[600px] w-full mb-2 relative' : 'h-0'
									}`}>
									<div
										className={`transition-all duration-500 ease-in-out ${
											isActive
												? 'absolute top-0 right-0 w-full h-full  opacity-100 translate-x-0 translate-y-0   '
												: 'absolute top-1/2 right-[calc(500px+6px)] w-[170px] h-[210px] opacity-0 -translate-y-[calc(50%-30px)] translate-x-0 group-hover:opacity-100 group-hover:-translate-y-1/2'
										}`}>
										<Image src={item.img} alt={item.title} className='object-cover' fill sizes='500px' />
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
