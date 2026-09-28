import { HeaderBlogSkeleton } from './HeaderBlog';

export default function ArticleLoading() {
	return (
		<div className='pt-[130px] px-(--px) pb-[100px] flex flex-col gap-[100px] items-center'>
			<HeaderBlogSkeleton />
		</div>
	);
}
