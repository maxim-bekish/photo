import { IconName } from 'lucide-react/dynamic';

export interface ArticlesItem {
	id: string;
	src: string;
	subTitle?: string;
	message: string;
	badge: string[];
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
		href: string;
		preview: string;
	};
	description?: string;
	albums: string[];
}
