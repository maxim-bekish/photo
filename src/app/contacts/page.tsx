'use client';

import { cn } from '@/src/shared/lib/utils';
import { Facebook, Instagram, Send, Twitch, Twitter, Youtube } from 'lucide-react';
import LayoutPage from '../layoutPage';

const articlesList = [
	{
		id: '1',
		icon: Instagram,
		text: 'Instagram',
		href: '#',
	},
	{
		id: '2',
		icon: Facebook,
		text: 'Facebook',
		href: '#',
	},
	{
		id: '3',
		icon: Twitch,
		text: 'Twitch',
		href: '#',
	},
	{
		id: '4',
		icon: Twitter,
		text: 'Twitter',
		href: '#',
	},
	{
		id: '5',
		icon: Send,
		text: 'Telegram',
		href: '#',
	},
	{
		id: '6',
		icon: Youtube,
		text: 'Youtube',
		href: '#',
	},
];
const gap = 'gap-2.5';
const bg = 'bg-white/10';
const hover = 'hover:scale-90 transition-all';
const duration = 'duration-400';
export default function () {
	return (
		<LayoutPage title={'Contacts'}>
			<div className='max-w-[600px] w-full mx-auto'>
				<div className={cn('flex flex-col', gap)}>
					<div className={cn('p-5 flex flex-col items-center cursor-pointer', bg, hover, duration)}>
						<p className='body1 opacity-60 uppercase'>email</p>
						<a
							href='mailto:photo@gmail.com'
							className={cn(
								'body3 hover:text-deep-orange transition-colors hover:underline',
								duration
							)}>
							photo@gmail.com
						</a>
					</div>
					<div className={cn('p-5 flex flex-col items-center cursor-pointer', bg, hover, duration)}>
						<p className='body1 opacity-60 uppercase'>Phone</p>
						<a
							href='tel:+1234567890'
							className={cn(
								'body3 hover:text-deep-orange transition-colors hover:underline',
								duration
							)}>
							+123 456 7890
						</a>
					</div>
					<div className={cn('grid grid-cols-3', gap)}>
						{articlesList.map(el => (
							<a
								href={el.href}
								target='_blank'
								rel='noopener noreferrer'
								key={el.id}
								className={cn(
									'p-2.5 flex flex-col border hover:border-deep-orange  border-deep-orange/0 items-center group justify-center h-[120px]',
									bg,
									gap,
									hover,
									duration
								)}>
								{
									<el.icon
										className={cn('group-hover:text-deep-orange transition-all', duration)}
									/>
								}
								<p className='body1 uppercase'>{el.text}</p>
							</a>
						))}
					</div>
					<div className={cn(bg, 'p-5 flex flex-col gap-4')}>
						<p className='body1 uppercase opacity-60 text-center'>Send Me a Message</p>
						<form className='flex flex-col gap-4'>
							<input
								type='text'
								placeholder='Name'
								className={cn(
									'outline-none h-[50px] focus-within:border-deep-orange text-[14px] font-inter w-full border border-solid border-white/10 bg-white/5 p-3'
								)}
							/>
							<div className={cn('flex flex-col md:flex-row gap-4')}>
								<input
									type='text'
									placeholder='Email'
									className={cn(
										'outline-none h-[50px] focus-within:border-deep-orange text-[14px] font-inter w-full border border-solid border-white/10 bg-white/5 p-3'
									)}
								/>
								<input
									type='text'
									placeholder='Phone'
									className={cn(
										'outline-none h-[50px] focus-within:border-deep-orange text-[14px] font-inter w-full border border-solid border-white/10 bg-white/5 p-3'
									)}
								/>
							</div>
							<div className='relative'>
								<textarea
									placeholder='Enter your Messsage'
									className={cn(
										'outline-none focus-within:border-deep-orange h-[120px] resize-y overflow-y-auto whitespace-break-spaces text-[14px] font-inter w-full border border-solid border-white/10 bg-white/5 p-3'
									)}
								/>
							</div>

							<button
								type='submit'
								className={cn(
									'cursor-pointer h-[50px] w-full  text-[14px] font-inter font-medium transition-all bg-deep-orange hover:bg-white/10 active:bg-white/20',
									duration
								)}>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</LayoutPage>
	);
}
