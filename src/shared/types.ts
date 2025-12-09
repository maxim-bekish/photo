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
	video?: {
		src: string;
		preview: string;
		alt: string;
		id: string;
	};
	description?: string;
	albums: string[];
}
