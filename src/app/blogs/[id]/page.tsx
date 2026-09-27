'use client';

import { texts } from '@/src/shared/config/texts';
import { apiResources } from '@/src/lib/api-resources';
import { Button } from '@/src/shared/components/ui/button';
import { useParams } from 'next/navigation';
import { FooterBlog } from './FooterBlog';
import { HeaderBlog, HeaderBlogSkeleton } from './HeaderBlog';
import { MainBlog } from './MainBlog';

export default function BlogPage() {
	const params = useParams();
	const id = params.id as string;

	const { data: article, isLoading, isError } = apiResources.blogs.useQueryById(id)();

	return (
		<div className='pt-[130px] px-(--px) pb-[100px] flex flex-col gap-[100px] items-center'>
			{isLoading && <HeaderBlogSkeleton />}

			{!isLoading && (isError || !article) && (
				<section className='flex flex-col items-center gap-7.5 py-20 text-center'>
					<h1 className='h1-b'>{texts.blogs.notFound}</h1>
					<p className='p-s opacity-60'>{texts.blogs.notFoundHint}</p>
					<Button variant={'outline'} href='/blogs' label={texts.common.allArticles} />
				</section>
			)}

			{article && (
				<>
					<HeaderBlog article={article} />
					<MainBlog content={article.content} />
				</>
			)}

			<FooterBlog currentId={id} />
		</div>
	);
}
