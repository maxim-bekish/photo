'use client';

import { useSettings } from '@/src/hooks/queries/useSiteContent';
import { Camera } from 'lucide-react';
import Link from 'next/link';

export const Logo = () => {
	const { data: settings } = useSettings();
	const fullName = [settings?.first_name, settings?.last_name].filter(Boolean).join(' ');

	return (
		<Link href='/' className=' flex items-center gap-2'>
			<Camera className='h-5 w-5   text-white' />

			<span className='text-white  uppercase'>{fullName}</span>
		</Link>
	);
};
