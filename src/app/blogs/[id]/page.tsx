'use client';

import { HeaderBlog } from './HeaderBlog';
import { MainBlog } from './MainBlog';
import { FooterBlog } from './FooterBlog';
export default function () {
	const article = {
		id: '6',
		href: '6',
		src: '/assets/expertise/img-3.avif',
		message: 'Elevate your photos with my signature color grading presets',
		category: 'Photography',
		date: 'March 6, 2024',
	};

	return (
		<div className='pt-[130px] pb-[100px] flex flex-col gap-[100px] items-center'>
			<HeaderBlog article={article} />
			<MainBlog article={article} />
			<FooterBlog article={article} />
		</div>
	);
}
