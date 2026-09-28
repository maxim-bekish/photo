'use client';

import Image from 'next/image';
import { texts } from '@/src/shared/config/texts';
import { Skeleton } from '@/src/shared/components/ui/skeleton';
import { formatDate } from '@/src/shared/lib/utils';
import { ArticlesItem } from '@/src/shared/types';

export const HeaderBlogSkeleton = () => (
	<section className='max-w-[800px] w-full mx-auto flex flex-col gap-7.5 items-center'>
		<div className='flex flex-col gap-5 w-full items-center'>
			<Skeleton className='h1-b w-full'>
				<br />
				<br />
				<br />
			</Skeleton>
			<Skeleton className='body1 w-2/5'>
				<br />
			</Skeleton>
		</div>
		<Skeleton className='aspect-2/1 w-full' />
	</section>
);

export const HeaderBlog = ({ article }: { article: ArticlesItem }) => {
	return (
		<section className='max-w-[800px] w-full mx-auto flex flex-col gap-7.5 items-center'>
			<div className='flex flex-col gap-5 items-center'>
				<h1 className='h1-b text-center'>{article.message}</h1>
				<div className='flex gap-6 p-5'>
					{article.category && (
						<p className='body1 uppercase'>
							{texts.blogs.category} <span className='text-light-orange'>{article.category}</span>
						</p>
					)}
					{article.date && (
						<time className='body1 uppercase' dateTime={article.date}>
							{formatDate(article.date)}
						</time>
					)}
				</div>
			</div>

			<div className='aspect-2/1 w-full relative'>
				<Image
					className='object-cover object-center'
					src={article.src}
					alt={article.message}
					fill
					sizes='800px'
					preload
				/>
			</div>
		</section>
	);
};
