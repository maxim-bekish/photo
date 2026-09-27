'use client';

import { Button } from '@/src/shared/components/ui/button';
import { texts } from '@/src/shared/config/texts';
import { useEffect } from 'react';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<main className='min-h-screen pt-[130px] pb-[100px] px-(--px) flex flex-col items-center justify-center gap-7.5 text-center'>
			<h1 className='h1-b'>{texts.error.title}</h1>
			<p className='p-s opacity-60 max-w-[500px]'>{texts.error.text}</p>
			<div className='flex flex-wrap gap-5 justify-center'>
				<button type='button' onClick={reset} className='text-btn uppercase link cursor-pointer'>
					{texts.error.retry}
				</button>
				<Button variant={'outline'} href='/' label={texts.notFound.toHome} />
			</div>
		</main>
	);
}
