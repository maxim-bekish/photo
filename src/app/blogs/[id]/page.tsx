'use client';

import { ArticlesItem } from '@/src/shared/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FooterBlog } from './FooterBlog';
import { HeaderBlog } from './HeaderBlog';
import { MainBlog } from './MainBlog';
import { apiResources } from '@/src/lib/api-resources';

export default function () {
	const params = useParams();
	const id = params.id as string;
 

 
	// if (isLoading) {
	// 	return (
	// 		<div className='pt-[130px] pb-[100px] flex flex-col gap-[100px] items-center'>
	// 			<div className='text-creamy-white'>Загрузка...</div>
	// 		</div>
	// 	);
	// }

	// if (!article) {
	// 	return (
	// 		<div className='pt-[130px] pb-[100px] flex flex-col gap-[100px] items-center'>
	// 			<div className='text-creamy-white'>Блог не найден</div>
	// 		</div>
	// 	);
	// }

	return (
		<div className='pt-[130px] px-(--px) pb-[100px] flex flex-col gap-[100px] items-center'>
			<HeaderBlog id={id} />
			{/* <MainBlog article={article} /> */}
			<FooterBlog   />
		</div>
	);
}
