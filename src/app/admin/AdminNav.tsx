'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function AdminNav() {
	const router = useRouter();

	const handleLogout = async () => {
		await fetch('/api/admin/logout', { method: 'POST' });
		router.push('/admin-login');
		router.refresh();
	};

	return (
		<nav className='bg-white/10 backdrop-blur-sm border-b border-white/20'>
			<div className='max-w-7xl mx-auto px-4'>
				<div className='flex justify-between items-center h-16'>
					<div className='flex items-center gap-6'>
						<Link href='/admin' className='text-xl font-bold text-creamy-white'>
							Админ-панель
						</Link>
						<Link
							href='/admin/blogs'
							className='text-creamy-white hover:text-deep-orange transition-colors'>
							Блоги
						</Link>
						<Link
							href='/admin/albums'
							className='text-creamy-white hover:text-deep-orange transition-colors'>
							Альбомы
						</Link>
					</div>
					<button
						onClick={handleLogout}
						className='text-creamy-white hover:text-deep-orange transition-colors'>
						Выйти
					</button>
				</div>
			</div>
		</nav>
	);
}

