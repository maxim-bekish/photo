import { IconName } from 'lucide-react/dynamic';

export interface ArticlesItem {
	id: string;
	href?: string;
	src: string;
	subTitle?: string;
	message: string;
	category: string;
	date: string;
	/** Текст статьи в markdown */
	content?: string | null;
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
	id: string;
	src: string;
	alt: string;
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
export interface ContactRequest {
	name: string;
	email?: string;
	phone?: string;
	message: string;
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
export interface SiteSettings {
	first_name: string;
	last_name: string;
	city: string;
	email: string;
	phone: string;
	/** Слоган на главной, переносы строк — \n */
	hero_title: string;
	hero_text: string;
	hero_video: string;
	hero_poster: string;
	/** Абзац «Обо мне» на главной; **текст** — выделение */
	about_short: string;
	about_intro: string;
	about_story: string;
	about_highlight: string;
	about_cta: string;
	about_hero_image: string;
	about_images: string[];
	meta_title: string;
	meta_description: string;
}

export interface Stat {
	id: string;
	title: string;
	value: number;
}

export interface FaqItem {
	id: string;
	question: string;
	/** Несколько строк выводятся списком */
	answer: string;
}

export interface Award {
	id: string;
	title: string;
	year: string;
	img: string;
}

export interface GearItem {
	id: string;
	value: string;
	link: string | null;
}

export interface GearCategory {
	id: string;
	title: string;
	icon: IconName;
	items: GearItem[];
}

export interface Quality {
	id: string;
	title: string;
}
