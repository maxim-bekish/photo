'use client';

import { texts } from '@/src/shared/config/texts';
import { cn } from '@/src/shared/lib/utils';

import LayoutPage from '../layoutPage';
import { ContactForm } from './ContactForm';
import { useSocials } from '@/src/hooks/queries/useSocials';
import { useSettings } from '@/src/hooks/queries/useSiteContent';

const gap = 'gap-2.5';
const bg = 'bg-white/10';
const hover = 'hover:scale-90 transition-all';
const duration = 'duration-400';
export default function ContactsPage() {
	const { data: socials } = useSocials();
	const { data: settings } = useSettings();

	return (
		<LayoutPage title={texts.contacts.title}>
			<div className='max-w-[600px] w-full mx-auto'>
				<div className={cn('flex flex-col', gap)}>
					<div
						className={cn(
							'p-5 flex flex-col items-center cursor-pointer',
							bg,
							hover,
							duration,
						)}>
						<p className='body1 opacity-60 uppercase'>{texts.contacts.email}</p>
						<a
							href={`mailto:${settings?.email ?? ''}`}
							className={cn(
								'body3 hover:text-deep-orange transition-colors hover:underline',
								duration,
							)}>
							{settings?.email}
						</a>
					</div>
					<div
						className={cn(
							'p-5 flex flex-col items-center cursor-pointer',
							bg,
							hover,
							duration,
						)}>
						<p className='body1 opacity-60 uppercase'>{texts.contacts.phone}</p>
						<a
							href={`tel:${settings?.phone.replace(/[^d+]/g, '') ?? ''}`}
							className={cn(
								'body3 hover:text-deep-orange transition-colors hover:underline',
								duration,
							)}>
							{settings?.phone}
						</a>
					</div>
					<div className={cn('grid grid-cols-3', gap)}>
						{socials &&
							socials
								.filter((item) => item.contact)
								.map((el) => (
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
											duration,
										)}>
										<span
											aria-hidden='true'
											className='size-6 bg-white group-hover:bg-deep-orange group-hover:scale-110 transition-all duration-200'
											style={{
												WebkitMaskImage: `url(/assets/network/${el.icon}.svg)`,
												maskImage: `url(/assets/network/${el.icon}.svg)`,
												WebkitMaskRepeat: 'no-repeat',
												maskRepeat: 'no-repeat',
												WebkitMaskPosition: 'center',
												maskPosition: 'center',
												WebkitMaskSize: 'contain',
												maskSize: 'contain',
											}}
										/>
										<p className='body1 uppercase'>{el.text}</p>
									</a>
								))}
					</div>
					<div className={cn(bg, 'p-5 flex flex-col gap-4')}>
						<p className='body1 uppercase opacity-60 text-center'>{texts.contacts.formTitle}</p>
						<ContactForm />
					</div>
				</div>
			</div>
		</LayoutPage>
	);
}
