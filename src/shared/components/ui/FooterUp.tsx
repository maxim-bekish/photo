'use client';

import Image from 'next/image';
import { useState } from 'react';
import { socials } from '../../config/social';

const polygonConfigs = [
	{
		leftHover: '-16px',
		rightHover: 'auto',
		topHover: 'auto',
		bottomHover: '-1px',
		rotation: 0,
		left: '-41px',
		right: 'auto',
		top: 'auto',
		bottom: '-3px',
	},
	{
		leftHover: 'auto',
		rightHover: '23px',
		topHover: 'auto',
		bottomHover: '-26px',
		rotation: -60,
		left: 'auto',
		right: '39px',
		top: 'auto',
		bottom: '-45px',
	},
	{
		leftHover: 'auto',
		rightHover: '-30px',
		topHover: 'auto',
		bottomHover: '23px',
		rotation: -120,
		left: 'auto',
		right: '-42px',
		top: 'auto',
		bottom: '4px',
	},
	{
		leftHover: 'auto',
		rightHover: '-17px',
		topHover: '-1px',
		bottomHover: 'auto',
		rotation: -180,
		left: 'auto',
		right: '-40px',
		top: '-2px',
		bottom: 'auto',
	},
	{
		leftHover: '24px',
		rightHover: 'auto',
		topHover: '-25px',
		bottomHover: 'auto',
		rotation: -240,
		left: '40px',
		right: 'auto',
		top: '-45px',
		bottom: 'auto',
	},
	{
		leftHover: '-33px',
		rightHover: 'auto',
		topHover: '24px',
		bottomHover: 'auto',
		rotation: -300,
		left: '-46px',
		right: 'auto',
		top: '4px',
		bottom: 'auto',
	},
];

export function FooterUp() {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div className='p-3 md:py-0 md:px-(--px)'>
			<div className='bg-light-orange pt-[230px] pb-[150px] relative flex flex-col  items-center gap-12'>
				<a
					href='#'
					className='camera group'
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}>
					<div className='p-2 border rounded-full border-white/50'>
						<div className='relative h-[200px] w-[200px] rounded-full border-white border-[3px] overflow-hidden group-hover:bg-white transition-colors duration-700'>
							{polygonConfigs.map((config, index) => (
								<Image
									key={index}
									src='/assets/polygon.svg'
									width={118}
									height={103}
									alt='polygon'
									className='absolute transition-all duration-700 ease-out'
									style={{
										transformOrigin: '50% 50% 0px',
										imageRendering: 'pixelated',
										aspectRatio: '1.145 / 1',
										height: '103px',
										width: '118px',
										zIndex: 10 - index,
										transform: config.rotation !== 0 ? `rotate(${config.rotation}deg)` : undefined,
										top: isHovered ? config.topHover : config.top,
										left: isHovered ? config.leftHover : config.left,
										bottom: isHovered ? config.bottomHover : config.bottom,
										right: isHovered ? config.rightHover : config.right,
									}}
								/>
							))}
							<p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-matt-black font-display text-[18px] leading-[150%] font-medium'>
								Let's Talk
							</p>
						</div>
					</div>
				</a>
				<div className='flex flex-col gap-8 md:gap-2 items-center'>
					<a
						href='mailto:photo@gmail.com'
						className='body2 font-semibold text-matt-black hover:underline'>
						photo@gmail.com
					</a>
					<ul className='flex gap-3 md:gap-8  flex-col md:flex-row'>
						{socials.map(el => (
							<li key={el.id}>
								<a
									className='flex gap-1 items-center text-matt-black hover:text-creamy-white duration-200 f-nav'
									href={el.href}
									target='_blank'
									rel='noopener noreferrer'>
									{<el.icon />}
									{el.text}
								</a>
							</li>
						))}
					</ul>
				</div>
				<div className='h-10 w-10 absolute top-5 md:top-10 left-5 md:left-10'>
					<div className='absolute top-0 left-0 w-0.5 h-10 bg-black'></div>
					<div className='absolute top-0 left-0 w-10 h-0.5 bg-black'></div>
				</div>
				<div className='h-10 w-10 absolute top-5 md:top-10 right-5 md:right-10'>
					<div className='absolute top-0 right-0 w-0.5 h-10 bg-black'></div>
					<div className='absolute top-0 right-0 w-10 h-0.5 bg-black'></div>
				</div>
				<div className='h-10 w-10 absolute bottom-5 md:bottom-10 left-5 md:left-10'>
					<div className='absolute top-0 left-0 w-0.5 h-10 bg-black'></div>
					<div className='absolute bottom-0 left-0 w-10 h-0.5 bg-black'></div>
				</div>
				<div className='h-10 w-10 absolute bottom-5 md:bottom-10 right-5 md:right-10'>
					<div className='absolute top-0 right-0 w-0.5 h-10 bg-black'></div>
					<div className='absolute bottom-0 right-0 w-10 h-0.5 bg-black'></div>
				</div>
			</div>
		</div>
	);
}
