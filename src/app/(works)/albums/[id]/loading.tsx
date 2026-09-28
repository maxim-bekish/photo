import { Skeleton } from '@/src/shared/components/ui/skeleton';

export default function AlbumLoading() {
	return (
		<main className='pt-[130px] px-(--px) flex flex-col gap-10 items-center'>
			<Skeleton className='h1 w-2/3 max-w-[800px]'>
				<br />
			</Skeleton>
			<Skeleton className='w-full h-[70vh]' />
		</main>
	);
}
