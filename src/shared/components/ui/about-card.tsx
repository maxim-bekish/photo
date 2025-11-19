interface AboutCardProps {
	title: string;
	value: number;
	position: 'left' | 'right';
	className?: string;
}

export const AboutCard = ({ title, value, className, position }: AboutCardProps) => {
	const isThousand = value >= 1000;
	const shortValue = isThousand ? Math.floor(value / 1000) : value;

	return (
		<div className='contents '>
			<div
				className={`p-10 bg-white/10 ${
					position === 'left' ? 'flex-[1.5_0_0px]' : 'flex-[1_0_0px]'
				}`}>
				<p className='font-satoshi p-s pb-2.5 border-b border-solid border-white/10'>{title}</p>
				<div className='flex items-center'>
					<p className='text-[133px] font-display leading-none'>{shortValue}</p>
					<p className='text-[100px] font-medium font-display leading-none text-deep-orange'>
						{isThousand ? 'K+' : '+'}
					</p>
				</div>
			</div>
		</div>
	);
};
