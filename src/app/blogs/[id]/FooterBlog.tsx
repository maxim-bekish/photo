'use client';

import { ArticlesCard } from '@/src/shared/components/ui/Articles-card';
import { Button } from '@/src/shared/components/ui/button';
import { ArticlesItem } from '@/src/shared/types';
import { useRef } from 'react';

export const FooterBlog = ({ article }: { article: ArticlesItem }) => {
	const itemRefs = useRef<HTMLDivElement[]>([]);
	const setItemRef = (el: HTMLDivElement | null) => {
		if (el && !itemRefs.current.includes(el)) {
			itemRefs.current.push(el);
		}
	};

	return (
		<section className='flex flex-col gap-10 items-center  wrapper-small'>
			<div className='flex flex-col gap-10 '>
				<h2 className='h2-s text-left w-full'>Read other Blogs</h2>
				<div className='flex gap-2.5'>
					<ArticlesCard el={article} setItemRef={setItemRef} />
					<ArticlesCard className='hidden md:block' el={article} setItemRef={setItemRef} />
					<ArticlesCard el={article} setItemRef={setItemRef} />
				</div>
			</div>
			<Button variant={'outline'} label={'all blogs'} />
		</section>
	);
};
