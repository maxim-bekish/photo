'use client';

import { Button } from '@/src/shared/components/ui/button';
import type { Characteristics as CharacteristicsType } from '@/src/shared/types';
import { DynamicIcon } from 'lucide-react/dynamic';

export const Characteristics = ({
	description,
	characteristics,
}: {
	description?: string;
	characteristics: CharacteristicsType[];
}) => {
	return (
		<section className='px-(--px) py-[50px] xl:py-[120px] gap-15 flex-col flex items-center '>
			<div className='max-w-[800px] w-full'>
				<p className='p-l text-creamy-white text-center'>{description}</p>
			</div>
			<div className='p-5 bg-white/10 flex flex-col gap-6 max-w-[600px] w-full'>
				<ul className='flex flex-col gap-2.5'>
					{characteristics.map((characteristic, i) => {
						return (
							<li key={characteristic.code} className='flex py-2.5  justify-between'>
								<div className='flex-1 flex gap-2 items-center'>
									<DynamicIcon name={characteristic.icon} size={16} strokeWidth={1} />
									<p className='body3 text-creamy-white'>{characteristic.code}</p>
								</div>
								<div className='flex-1'>
									<p className='p-s text-creamy-white text-right'>
										{characteristic.value.join(', ')}
									</p>
								</div>
							</li>
						);
					})}
				</ul>
				<div className='flex justify-center'>
					<Button variant={'outline'} label={'Buy Prints'} />
				</div>
			</div>
		</section>
	);
};
