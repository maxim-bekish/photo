'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArticlesItem } from '@/src/shared/types';


export default function BlogsPage() {
	const [blogs, setBlogs] = useState<ArticlesItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchBlogs();
	}, []);

	const fetchBlogs = async () => {
		try {
			const res = await fetch('/api/admin/blogs');
			const data = await res.json();
			setBlogs(data);
		} catch (error) {
			console.error('Ошибка загрузки блогов:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm('Вы уверены, что хотите удалить этот блог?')) return;

		try {
			const res = await fetch(`/api/admin/blogs?id=${id}`, { method: 'DELETE' });
			if (res.ok) {
				fetchBlogs();
			}
		} catch (error) {
			console.error('Ошибка удаления:', error);
		}
	};

	if (loading) {
		return <div className='text-creamy-white'>Загрузка...</div>;
	}

	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl font-bold text-creamy-white'>Управление блогами</h1>
				<Link
					href='/admin/blogs/new'
					className='bg-deep-orange text-white px-4 py-2 rounded hover:bg-deep-orange/80 transition-colors'>
					+ Создать блог
				</Link>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{blogs.map((blog) => (
					<div
						key={blog.id}
						className='bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20'>
						<img src={blog.src} alt={blog.message} className='w-full h-48 object-cover rounded mb-4' />
						<h3 className='text-creamy-white font-bold mb-2 line-clamp-2'>{blog.message}</h3>
						<div className='flex gap-2 text-sm text-gray-400 mb-4'>
							<span>{blog.category}</span>
							<span>•</span>
							<span>{blog.date}</span>
						</div>
						<div className='flex gap-2'>
							<Link
								href={`/admin/blogs/${blog.id}`}
								className='flex-1 bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition-colors'>
								Редактировать
							</Link>
							<button
								onClick={() => handleDelete(blog.id)}
								className='flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors'>
								Удалить
							</button>
						</div>
					</div>
				))}
			</div>

			{blogs.length === 0 && (
				<div className='text-center text-gray-400 py-12'>
					<p>Блоги не найдены. Создайте первый блог!</p>
				</div>
			)}
		</div>
	);
}

