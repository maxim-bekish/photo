import Link from 'next/link';

export default function AdminPage() {
	return (
		<div className='space-y-6'>
			<h1 className='text-3xl font-bold text-creamy-white'>Панель управления</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<Link
					href='/admin/blogs'
					className='bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:border-deep-orange transition-colors'>
					<h2 className='text-xl font-bold text-creamy-white mb-2'>Управление блогами</h2>
					<p className='text-gray-400'>Создание, редактирование и удаление статей блога</p>
				</Link>
				<Link
					href='/admin/albums'
					className='bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:border-deep-orange transition-colors'>
					<h2 className='text-xl font-bold text-creamy-white mb-2'>Управление альбомами</h2>
					<p className='text-gray-400'>Создание, редактирование и удаление фото-альбомов</p>
				</Link>
			</div>
		</div>
	);
}

