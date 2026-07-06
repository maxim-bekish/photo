import { UUID } from 'crypto';
import { IconName } from 'lucide-react/dynamic';

export interface ArticlesItem {
	id: string;
	src: string;
	subTitle?: string;
	message: string;
	category: string;
	date: string;
}

export interface Brand {
	id: string;
	href: string;
	alt: string;
}

export interface Characteristics {
	icon: IconName;
	code: string;
	value: string[];
}

export interface VideoItem {
	alt?: string;
	src: string;
	id: string;
	preview?: string;
}
export interface AlbumItem {
	href: string;
	id: UUID;
	src: string;
	title: string;
	characteristics: Characteristics[];
	videos: VideoItem[];
	description?: string;
	gallery: {
		src: string;
		gallery_id: string;
	}[];
}

export interface ExpertiseItem<T> {
	id: string;
	title: string;
	src: T;
	description: string;
}

export interface Expertise {
	main: ExpertiseItem<string>[];
	sub: ExpertiseItem<string | null>[];
}

export interface Reviews {
	id: string;
	src: string;
	message: string;
	name: string;
	role: string;
	rating: number;
}
export interface Social {
	id: string;
	href: string;
	icon: string;
	text: string;
	mob: string;
	nav: boolean;
	footer: boolean;
	contact: boolean;
}