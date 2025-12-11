import { IconName } from 'lucide-react/dynamic';

export interface ArticlesItem {
	id: string;
	href: string;
	src: string;
	subTitle?: string;
	message: string;
	category: string;
	date: string;
}

export interface BrandItem {
	id: string;
	href: string;
	alt: string;
}

export interface Characteristics {
	icon: IconName;
	code: string;
	value: string[];
}
export interface AlbumItem {
	href: string;
	id: string;
	src: string;
	alt: string;
	title: string;
	characteristics: Characteristics[];
	videoSrc: string;
	videoPreview: string;

	description?: string;
	gallery: {
		src: string;
		gallery_id: string;
	}[];
}
