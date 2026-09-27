import { Button } from '@/src/shared/components/ui/button';
import { texts } from '@/src/shared/config/texts';

export default function NotFound() {
	return (
		<main className='min-h-screen pt-[130px] pb-[100px] px-(--px) flex flex-col items-center justify-center gap-7.5 text-center'>
			<p className='h1 text-deep-orange'>404</p>
			<h1 className='h1-b'>{texts.notFound.title}</h1>
			<p className='p-s opacity-60 max-w-[500px]'>{texts.notFound.text}</p>
			<Button variant={'outline'} href='/' label={texts.notFound.toHome} />
		</main>
	);
}
