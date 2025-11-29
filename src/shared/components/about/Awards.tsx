'use client';

import { useState } from 'react';

const awardsList = [
	{
		id: '1',
		img: '/assets/about/awards/img-1.avif',
		title: 'Sony World Photography Awards',
		year: '2025',
	},
	{
		id: '2',
		img: '/assets/about/awards/img-2.avif',
		title: 'World Press Photo Contest',
		year: '2024',
	},
	{
		id: '3',
		img: '/assets/about/awards/img-3.avif',
		title: 'National Geographic Photo Contest',
		year: '2023',
	},
	{
		id: '4',
		img: '/assets/about/awards/img-1.avif',
		title: 'Leica Oskar Barnack Award',
		year: '2022',
	},
	{
		id: '5',
		img: '/assets/about/awards/img-2.avif',
		title: 'Moscow International Foto Awards (MIFA)',
		year: '2021',
	},
	{
		id: '6',
		img: '/assets/about/awards/img-3.avif',
		title: 'Magnum Photography Awards',
		year: '2020',
	},
];

export default function Awards() {
	const [activeId, setActiveId] = useState<string | null>(null);

	const handleClick = (id: string) => {
		setActiveId(activeId === id ? null : id);
	};

	return (
		<section className='px-(--px)  py-[150px]'>
			<div className='wrapper-small flex flex-col   gap-[30px]'>
				<div className='flex flex-col'>
					<h2 className='h2-s'>Shining Moments of Glory</h2>
					<h2 className='h2-l text-deep-orange'>Awards I got</h2>
				</div>
				<div className='flex flex-col items-end gap-2.5'>
					{awardsList.map((item, i) => {
						const isActive = activeId === item.id;
						return (
							<div
								key={item.id}
								className={`flex flex-col items-end relative border-b border-white/50 ${
									!isActive ? 'group' : ''
								}`}>
								<div
									className={`cursor-pointer relative w-[500px]  `}
									onClick={() => handleClick(item.id)}>
									<div
										className={`flex gap-2.5 items-center py-2.5 transition-all duration-500 ${
											isActive ? ' ' : 'group-hover:pl-5 group-hover:pr-2.5'
										}`}>
										<span className='body1'>{i < 9 ? `0${i + 1}` : i + 1}</span>
										<p className='flex-1 body3 pr-[10px]'>{item.title}</p>
										<span className='body1'>{item.year}</span>
									</div>
								</div>
								<div
									className={`transition-all duration-500 ${
										isActive ? 'h-[600px] mb-2 relative' : 'h-0'
									}`}>
									<div
										className={`transition-all duration-500 ease-in-out ${
											isActive
												? 'absolute top-0 right-0 w-[500px] h-[600px]  opacity-100 translate-x-0 translate-y-0   '
												: 'absolute top-1/2 right-[calc(500px+6px)] w-[170px] h-[210px] opacity-0 -translate-y-[calc(50%-30px)] translate-x-0 group-hover:opacity-100 group-hover:-translate-y-1/2'
										}`}>
										<img src={item.img} alt={item.title} className='w-full h-full object-cover' />
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
