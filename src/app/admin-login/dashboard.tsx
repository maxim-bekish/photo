'use client';

import { useRouter } from 'next/navigation';

export default function DashboardPage() {
	const router = useRouter();

	return (
		<div className='flex flex-col items-start gap-4'>
			<h1>Добро пожаловать в админку</h1>
			<button
				type='button'
				className='px-4 py-2 rounded bg-deep-orange text-creamy-white'
				onClick={() => router.push('/admin')}>
				Перейти в панель
			</button>
		</div>
	);
}
