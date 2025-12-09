'use client';

import { ArticlesItem } from '@/src/shared/types';
import LayoutPage from '../layoutPage';
import { ArticlesCard } from '@/src/shared/components/ui/Articles-card';
import { useRef, useEffect, useState } from 'react';
import { useCustomCursor } from '@/src/shared/hooks/useCustomCursor';
import { useMemo } from 'react';

export default function () {
	const [articlesList, setArticlesList] = useState<ArticlesItem[]>([]);
	const [loading, setLoading] = useState(true);
	const containerRef = useRef<HTMLDivElement>(null);
	const itemRefs = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		fetch('/api/blogs')
			.then((res) => res.json())
			.then((data) => {
				setArticlesList(data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	const setItemRef = (el: HTMLDivElement | null) => {
		if (el && !itemRefs.current.includes(el)) {
			itemRefs.current.push(el);
		}
	};

	// Используем хук для кастомного курсора
	const getElements = useMemo(() => () => itemRefs.current, []);
	useCustomCursor({ elements: getElements, text: 'read' });

	if (loading) {
		return (
			<LayoutPage title={'Blogs'}>
				<div className='flex items-center justify-center py-20'>
					<div className='text-creamy-white'>Загрузка...</div>
				</div>
			</LayoutPage>
		);
	}

	if (articlesList.length === 0) {
		return (
			<LayoutPage title={'Blogs'}>
				<div className='flex items-center justify-center py-20'>
					<div className='text-creamy-white'>Блоги не найдены</div>
				</div>
			</LayoutPage>
		);
	}

	return (
		<LayoutPage title={'Blogs'}>
			<div className='flex flex-col gap-2.5 wrapper'>
				{articlesList[0] && <ArticlesCard el={articlesList[0]} row big setItemRef={setItemRef} />}
				<div ref={containerRef} className='grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5'>
					{articlesList.slice(1).map((el, index) => (
						<ArticlesCard key={el.id + index} el={el} setItemRef={setItemRef} />
					))}
				</div>
			</div>
		</LayoutPage>
	);
}
