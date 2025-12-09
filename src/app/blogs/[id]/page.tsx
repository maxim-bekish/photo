'use client';

import { ArticlesItem } from '@/src/shared/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FooterBlog } from './FooterBlog';
import { HeaderBlog } from './HeaderBlog';
import { MainBlog } from './MainBlog';

export default function () {
	const params = useParams();
	const id = params.id as string;
	const [article, setArticle] = useState<ArticlesItem | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`/api/blogs/${id}`)
			.then(res => res.json())
			.then(data => {
				setArticle(data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, [id]);

	if (loading) {
		return (
			<div className='pt-[130px] pb-[100px] flex flex-col gap-[100px] items-center'>
				<div className='text-creamy-white'>Загрузка...</div>
			</div>
		);
	}

	if (!article) {
		return (
			<div className='pt-[130px] pb-[100px] flex flex-col gap-[100px] items-center'>
				<div className='text-creamy-white'>Блог не найден</div>
			</div>
		);
	}

	return (
		<div className='pt-[130px] pb-[100px] flex flex-col gap-[100px] items-center'>
			<HeaderBlog article={article} />
			<MainBlog article={article} />
			<FooterBlog article={article} />
		</div>
	);
}
