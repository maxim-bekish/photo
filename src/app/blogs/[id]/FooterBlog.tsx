'use client';

import { texts } from '@/src/shared/config/texts';
import { apiResources } from '@/src/lib/api-resources';
import { ArticlesCard } from '@/src/shared/components/ui/Articles-card';
import { Button } from '@/src/shared/components/ui/button';
import { Skeleton } from '@/src/shared/components/ui/skeleton';
import { useRef } from 'react';

export const FooterBlog = ({ currentId }: { currentId: string }) => {
	const { data: articles, isLoading } = apiResources.blogs.useQuery();

	const itemRefs = useRef<HTMLDivElement[]>([]);
	const setItemRef = (el: HTMLDivElement | null) => {
		if (el && !itemRefs.current.includes(el)) {
			itemRefs.current.push(el);
		}
	};

	const otherArticles = articles?.filter((el) => el.id !== currentId).slice(0, 3) ?? [];

	if (!isLoading && otherArticles.length === 0) return null;

	return (
		<section className='flex flex-col gap-10 items-center  wrapper-small'>
			<div className='flex flex-col gap-10 w-full'>
				<h2 className='h2-s text-left w-full'>{texts.blogs.readAlso}</h2>
				<div className='flex gap-2.5 flex-col sm:flex-row'>
					{isLoading && (
						<>
							<Skeleton className=' h-[400px] flex-1' />
							<Skeleton className=' h-[400px] hidden md:flex flex-1' />
							<Skeleton className=' h-[400px] flex-1' />
						</>
					)}

					{otherArticles.map((el, i) => (
						<ArticlesCard
							className={i === 1 ? 'hidden md:flex w-full' : 'w-full'}
							key={el.id}
							el={el}
							setItemRef={setItemRef}
						/>
					))}
				</div>
			</div>
			<Button variant={'outline'} href='/blogs' label={texts.common.allArticles} />
		</section>
	);
};
