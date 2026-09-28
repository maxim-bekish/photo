import { FooterBlog } from './FooterBlog';
import { HeaderBlog } from './HeaderBlog';
import { MainBlog } from './MainBlog';
import { getBlogById } from '@/src/lib/vercel-loader';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import type { Metadata } from 'next';
import { excerpt } from '@/src/shared/lib/utils';

const getArticle = cache(getBlogById);

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	const article = await getArticle(id);
	if (!article) return {};
	return {
		title: article.message,
		description: article.content ? excerpt(article.content) : undefined,
		openGraph: {
			type: 'article',
			images: [article.src],
			publishedTime: article.date,
		},
	};
}

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const article = await getArticle(id);
	if (!article) notFound();

	return (
		<div className='pt-[130px] px-(--px) pb-[100px] flex flex-col gap-[100px] items-center'>
			<HeaderBlog article={article} />
			<MainBlog content={article.content} />
			<FooterBlog currentId={id} />
		</div>
	);
}
