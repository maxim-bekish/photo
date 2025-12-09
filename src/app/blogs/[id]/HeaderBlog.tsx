'use client';

import { ArticlesItem } from '@/src/shared/types';

export const HeaderBlog = ({ article }: { article: ArticlesItem }) => {
	return (
		<section className=' max-w-[800px] mx-auto flex flex-col gap-7.5 items-center'>
			<div className='flex flex-col gap-5 items-center'>
				<h1 className='h1-b text-center'>{article.message}</h1>
				<div className='flex gap-6 p-5'>
					<p className='body1 uppercase'>
						Category: <span className='text-light-orange'>{article.category}</span>
					</p>
					<p className='body1 uppercase'>{article.date}</p>
				</div>
			</div>
			<div className='aspect-2/1 w-full max-w-[800px] h-auto  '>
				<img className='w-full h-full object-cover object-center' src={article.src} alt='poster' />
			</div>
		</section>
	);
};
