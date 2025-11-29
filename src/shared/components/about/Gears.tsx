import { Aperture, Asterisk, Camera, Laptop } from 'lucide-react';

const GearsList = [
	{
		title: 'Cameras',
		icon: Camera,
		list: [
			{ value: 'Canon EOS R5', link: '#' },
			{ value: 'Sony Alpha a7 III', link: '#' },
			{ value: 'Fujifilm X-T4', link: '#' },
		],
	},
	{
		title: 'Lenses',
		icon: Aperture,
		list: [
			{ value: 'Canon RF 24-70mm f/2.8L IS USM', link: '#' },
			{ value: 'Fujinon XF 16-55mm f/2.8 R LM WR', link: '#' },
			{ value: 'Sigma 35mm f/1.4 DG HSM Art', link: '#' },
			{ value: 'Sony FE 85mm f/1.4 GM', link: '#' },
		],
	},
	{
		title: 'Other Accessories',
		icon: Asterisk,
		list: [
			{ value: 'Godox AD200 Pro', link: '#' },
			{ value: 'Profoto B10', link: '#' },
			{ value: 'Neewer Ring Light Kit', link: '#' },
			{ value: 'Manfrotto Befree Advanced Tripod', link: '#' },
			{ value: 'DJI Ronin-S Gimbal', link: '#' },
			{ value: 'Peak Design Everyday Backpack', link: '#' },
			{ value: 'SanDisk Extreme Pro SD Cards', link: '#' },
		],
	},
	{
		title: 'Editing Tools',
		icon: Laptop,
		list: [
			{ value: 'Adobe Creative Cloud', link: '#' },
			{ value: 'Wacom Intuos Pro Tablet', link: '#' },
			{ value: 'Calibrite ColorChecker Display Pro', link: '#' },
		],
	},
];

export default function Gears() {
	return (
		<section className='px-(--px)  py-[150px]'>
			<div className='wrapper-small flex flex-col gap-[60px]'>
				<h2 className='h2-l text-deep-orange text-center'>Gears I own</h2>
				<div className='flex flex-col gap-[100px] py-[30px] px-(--px) border border-solid border-white/10 bg-white/5'>
					{GearsList.map((gear, index) => {
						const IconComponent = gear.icon;
						return (
							<div key={index} className='flex flex-col gap-[18px] '>
								<h3 className='h3 text-creamy-white'>{gear.title}</h3>

								<ul className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[15px]  '>
									{gear.list.map((item: { value: string; link: string }, itemIndex: number) => (
										<li key={itemIndex} className='flex gap-[10px] items-center '>
											<IconComponent className='w-[22px] h-[22px] text-deep-orange' />
											<a
												href={item.link}
												className='p-s   text-creamy-white/60 hover:text-light-orange/70 transition-all duration-200'>
												{item.value}
											</a>
										</li>
									))}
								</ul>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
