'use client';

import { useBlogs } from '@/src/hooks/queries/useBlogs';
import { ArticlesCard } from '@/src/shared/components/ui/Articles-card';
import { Skeleton } from '@/src/shared/components/ui/skeleton';
import { useCustomCursor } from '@/src/shared/hooks/useCustomCursor';
import { useMemo, useRef } from 'react';
import LayoutPage from '../layoutPage';

export default function BlogsPage() {
	const itemRefs = useRef<HTMLDivElement[]>([]);

	const { data: articlesList, isLoading } = useBlogs();

	const setItemRef = (el: HTMLDivElement | null) => {
		if (el && !itemRefs.current.includes(el)) {
			itemRefs.current.push(el);
		}
	};

	const getElements = useMemo(() => () => itemRefs.current, []);
	useCustomCursor({ elements: getElements, text: 'read' });

	if (!isLoading && articlesList?.length === 0) {
		return (
			<LayoutPage title='Blogs'>
				<div className='flex items-center justify-center py-20'>
					<div className='text-creamy-white'>Блоги не найдены</div>
				</div>
			</LayoutPage>
		);
	}

	return (
		<LayoutPage title='Blogs'>
			<div className='flex flex-col gap-2.5 wrapper'>
				{isLoading ? (
					<Skeleton className='w-full h-[250px] md:h-[400px]' />
				) : (
					articlesList?.[0] && <ArticlesCard el={articlesList[0]} row big setItemRef={setItemRef} />
				)}
				<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5'>
					{isLoading
						? Array.from({ length: 6 }).map((_, index) => (
								<Skeleton key={index} className='h-[250px]' />
						  ))
						: articlesList
								?.slice(1)
								.map((el, index) => (
									<ArticlesCard key={el.id + index} el={el} setItemRef={setItemRef} />
								))}
				</div>
			</div>
		</LayoutPage>
	);
}
