import { Button } from '@/src/shared/components/ui/button';

import { texts } from '@/src/shared/config/texts';

export default function ArticleNotFound() {
	return (
		<main className='pt-[130px] px-(--px) pb-[100px] flex flex-col items-center gap-7.5 text-center'>
			<h1 className='h1-b'>{texts.blogs.notFound}</h1>
			<p className='p-s opacity-60'>{texts.blogs.notFoundHint}</p>
			<Button variant={'outline'} href='/blogs' label={texts.common.allArticles} />
		</main>
	);
}
