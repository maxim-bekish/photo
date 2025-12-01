import { Camera } from 'lucide-react';
import Link from 'next/link';

export const Logo = () => {
	return (
		<Link href='/' className=' flex items-center gap-2'>
			<Camera className='h-5 w-5   text-white' />

			<span className='text-white  uppercase'>logo</span>
		</Link>
	);
};
