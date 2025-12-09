'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Input } from '@/src/shared/components/ui/input';
import { ArticlesItem } from '@/src/shared/types';

export default function EditBlogPage() {
	const router = useRouter();
	const params = useParams();
	const id = params.id as string;
	const isNew = id === 'new';

	const [blog, setBlog] = useState<ArticlesItem>({
		id: '',
		href: '',
		src: '',
		message: '',
		category: '',
		date: new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }),
	});
	const [loading, setLoading] = useState(!isNew);

	useEffect(() => {
		if (!isNew) {
			fetchBlog();
		}
	}, [id]);

	const fetchBlog = async () => {
		try {
			const res = await fetch('/api/admin/blogs');
			const blogs = await res.json();
			const found = blogs.find((b: ArticlesItem) => b.id === id);
			if (found) {
				setBlog(found);
			}
		} catch (error) {
			console.error('Ошибка загрузки блога:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const url = '/api/admin/blogs';
			const method = isNew ? 'POST' : 'PUT';

			const res = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(blog),
			});

			if (res.ok) {
				router.push('/admin/blogs');
			}
		} catch (error) {
			console.error('Ошибка сохранения:', error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <div className='text-creamy-white'>Загрузка...</div>;
	}

	return (
		<div className='max-w-2xl mx-auto space-y-6'>
			<h1 className='text-3xl font-bold text-creamy-white'>
				{isNew ? 'Создать блог' : 'Редактировать блог'}
			</h1>

			<form onSubmit={handleSubmit} className='space-y-4 bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20'>
				<div>
					<label className='block mb-2 text-creamy-white'>ID</label>
					<Input
						value={blog.id}
						onChange={(e) => setBlog({ ...blog, id: e.target.value })}
						required
						className='bg-white/10 border-white/20 text-creamy-white'
					/>
				</div>

				<div>
					<label className='block mb-2 text-creamy-white'>Href (URL)</label>
					<Input
						value={blog.href}
						onChange={(e) => setBlog({ ...blog, href: e.target.value })}
						required
						className='bg-white/10 border-white/20 text-creamy-white'
					/>
				</div>

				<div>
					<label className='block mb-2 text-creamy-white'>Путь к изображению</label>
					<Input
						value={blog.src}
						onChange={(e) => setBlog({ ...blog, src: e.target.value })}
						required
						className='bg-white/10 border-white/20 text-creamy-white'
						placeholder='/assets/expertise/img-1.avif'
					/>
				</div>

				<div>
					<label className='block mb-2 text-creamy-white'>Подзаголовок (опционально)</label>
					<Input
						value={blog.subTitle || ''}
						onChange={(e) => setBlog({ ...blog, subTitle: e.target.value })}
						className='bg-white/10 border-white/20 text-creamy-white'
					/>
				</div>

				<div>
					<label className='block mb-2 text-creamy-white'>Сообщение (текст блога)</label>
					<textarea
						value={blog.message}
						onChange={(e) => setBlog({ ...blog, message: e.target.value })}
						required
						rows={4}
						className='w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-creamy-white focus:outline-none focus:ring-2 focus:ring-deep-orange'
					/>
				</div>

				<div>
					<label className='block mb-2 text-creamy-white'>Категория</label>
					<Input
						value={blog.category}
						onChange={(e) => setBlog({ ...blog, category: e.target.value })}
						required
						className='bg-white/10 border-white/20 text-creamy-white'
					/>
				</div>

				<div>
					<label className='block mb-2 text-creamy-white'>Дата</label>
					<Input
						value={blog.date}
						onChange={(e) => setBlog({ ...blog, date: e.target.value })}
						required
						className='bg-white/10 border-white/20 text-creamy-white'
					/>
				</div>

				<div className='flex gap-4'>
					<button
						type='submit'
						disabled={loading}
						className='flex-1 bg-deep-orange text-white py-2 px-4 rounded hover:bg-deep-orange/80 transition-colors disabled:opacity-50'>
						{loading ? 'Сохранение...' : 'Сохранить'}
					</button>
					<button
						type='button'
						onClick={() => router.push('/admin/blogs')}
						className='flex-1 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors'>
						Отмена
					</button>
				</div>
			</form>
		</div>
	);
}

