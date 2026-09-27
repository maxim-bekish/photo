'use client';

import { Button } from '@/src/shared/components/ui/button';
import { Skeleton } from '@/src/shared/components/ui/skeleton';
import { texts } from '@/src/shared/config/texts';
import { Title } from './Title';
import { Characteristics } from './Characteristics';
import { Gallery } from './Gallery';
import { MoreAlbums } from './MoreAlbums';
import { useParams } from 'next/navigation';
import { apiResources } from '@/src/lib/api-resources';

export default function AlbumPage() {
	const params = useParams();
	const id = params.id as string;

	const { data: album, isLoading } = apiResources.albums.useQueryById(id)();

	if (isLoading) {
		return (
			<main className='pt-[130px] px-(--px) flex flex-col gap-10 items-center'>
				<Skeleton className='h1 w-2/3 max-w-[800px]'>
					<br />
				</Skeleton>
				<Skeleton className='w-full h-[70vh]' />
			</main>
		);
	}

	// Не найден или ошибка загрузки
	if (!album) {
		return (
			<main className='pt-[130px] px-(--px) pb-[100px] flex flex-col items-center gap-7.5 py-20 text-center'>
				<h1 className='h1-b'>{texts.works.albumNotFound}</h1>
				<p className='p-s opacity-60'>{texts.blogs.notFoundHint}</p>
				<Button variant={'outline'} href='/albums' label={texts.common.allAlbums} />
			</main>
		);
	}

	return (
		<main>
			<Title title={album.title} src={album.src} />
			<Characteristics
				characteristics={album.characteristics}
				description={album.description}
			/>

			<Gallery gallery={album.gallery} videos={album.videos} />

			<MoreAlbums />
		</main>
	);
}
