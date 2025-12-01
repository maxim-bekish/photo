import { Send, Instagram, Linkedin, Twitter } from 'lucide-react';
import { AlbumItem } from '../types';

export const socials = [
	{
		id: 'ig',
		mob: 'ig',
		text: 'Instagram',
		href: 'https://www.instagram.com/maxa_max',
		icon: Instagram,
	},
	{
		id: 'tw',
		mob: 'tw',
		text: 'Twitter',
		href: 'http://twitter.com/ECIEWUBCUYAEWVCYVEWBCYHEWBVHC',
		icon: Twitter,
	},
	{
		id: 'li',
		mob: 'li',
		text: 'Linkedin',
		href: 'https://www.linkedin.com/in/maksim-bekish-819b8920a/',
		icon: Linkedin,
	},
	{
		id: 'tg',
		mob: 'tg',
		text: 'Telegram',
		href: 'https://t.me/maxa_max',
		icon: Send,
	},
];

export const albumsList: AlbumItem[] = [
	{
		href: 'colorful-india',
		id: 'colorful-india',
		src: '/assets/albums/img-1.avif',
		alt: 'photo',
		title: 'Яркая Индия',
		characteristics: [
			{ icon: 'focus', code: 'category', value: ['Путешествия'] },
			{ icon: 'triangle', code: 'projectType', value: ['Сотрудничество'] },
			{ icon: 'camera', code: 'camera', value: ['Fujifilm X-T4'] },
			{
				icon: 'aperture',
				code: 'lenses',
				value: ['Fujinon XF 23mm f/1.4 R', 'Fujinon XF 35mm f/2 R WR'],
			},
			{ icon: 'monitor-smartphone', code: 'otherDevices', value: ['Mavic Air'] },
			{ icon: 'map-pin', code: 'location', value: ['Индия'] },
			{ icon: 'calendar', code: 'time', value: ['Март 2024'] },
			{ icon: 'user', code: 'client', value: ['India Tourism'] },
		],
		video: {
			href: 'https://www.youtube.com/embed/fd5FD-ra53M?si=Zq14LahnomjXm-Tt',
			preview: '/assets/albums/img-1.avif',
		},
		description:
			'Запечатлеть яркую жизнь, культуру и разнообразие улиц Индии через совместный проект по тревел-фотографии. Цель состояла в том, чтобы документировать повседневные моменты, уникальные уличные сцены и культурные события, передавая суть жизни на индийских улицах.',

		albums: ['/assets/albums/img-1.avif', '/assets/albums/img-2.avif', '/assets/albums/img-3.avif'],
	},
	{
		href: 'echoes-of-dreams',
		id: 'echoes-of-dreams',
		src: '/assets/albums/img-2.avif',
		alt: 'photo',
		title: 'Эхо снов',

		characteristics: [
			{ icon: 'focus', code: 'category', value: ['Концептуальная'] },
			{ icon: 'triangle', code: 'projectType', value: ['Коммерческий'] },
			{ icon: 'camera', code: 'camera', value: ['Fujifilm X-T4'] },
			{
				icon: 'aperture',
				code: 'lenses',
				value: ['Fujinon XF 23mm f/1.4 R', 'Fujinon XF 35mm f/2 R WR'],
			},
			{ icon: 'monitor-smartphone', code: 'otherDevices', value: ['Mavic Air'] },
			{ icon: 'map-pin', code: 'location', value: ['Liège', 'Belgium'] },
			{ icon: 'calendar', code: 'time', value: ['January - April 2024'] },
			{ icon: 'user', code: 'client', value: ['Lenova'] },
		],
		video: {
			href: 'https://www.youtube.com/embed/fd5FD-ra53M?si=Zq14LahnomjXm-Tt',
			preview: '/assets/albums/img-1.avif',
		},
		description:
			'To create a series of conceptual art photographs that explore the themes of dreams, subconscious, and human emotion. The series aimed to provoke thought and evoke deep emotions, ultimately being showcased in an art gallery and various online platforms.',

		albums: ['/assets/albums/img-1.avif', '/assets/albums/img-2.avif', '/assets/albums/img-3.avif'],
	},
	{
		href: 'wings-of-freedom',
		id: 'wings-of-freedom',
		src: '/assets/albums/img-3.avif',
		alt: 'photo',
		title: 'Крылья свободы',
		characteristics: [
			{ icon: 'focus', code: 'category', value: ['Воздушная и дрон-фотография'] },
			{ icon: 'triangle', code: 'projectType', value: ['Проект по вдохновению'] },
			{ icon: 'camera', code: 'camera', value: ['Mavic Pro 3', 'Mavic Mini'] },
			{ icon: 'map-pin', code: 'location', value: ['Liège', 'Belgium'] },
			{ icon: 'calendar', code: 'time', value: ['January - April 2024'] },
		],
		video: {
			href: 'https://www.youtube.com/embed/fd5FD-ra53M?si=Zq14LahnomjXm-Tt',
			preview: '/assets/albums/img-1.avif',
		},
		description:
			'To capture breathtaking aerial images of Belgium’s diverse landscapes, showcasing the country’s natural beauty and architectural marvels from a bird’s-eye view. This project aimed to push creative boundaries and explore new perspectives in aerial photography.',

		albums: ['/assets/albums/img-1.avif', '/assets/albums/img-2.avif', '/assets/albums/img-3.avif'],
	},
	{
		href: 'crafted-perfection',
		id: 'crafted-perfection',
		src: '/assets/albums/img-4.avif',
		alt: 'photo',
		title: 'Совершенство в деталях',
		characteristics: [
			{ icon: 'focus', code: 'category', value: ['Продуктовая'] },
			{ icon: 'triangle', code: 'projectType', value: ['Коммерческий'] },
			{ icon: 'camera', code: 'camera', value: ['Fujifilm X-T4'] },
			{
				icon: 'aperture',
				code: 'lenses',
				value: ['Fujinon XF 23mm f/1.4 R', 'Fujinon XF 35mm f/2 R WR'],
			},
			{ icon: 'monitor-smartphone', code: 'otherDevices', value: ['Mavic Air'] },
			{ icon: 'map-pin', code: 'location', value: ['Liège', 'Belgium'] },
			{ icon: 'calendar', code: 'time', value: ['March 2024'] },
			{ icon: 'user', code: 'client', value: ['Blissed Co.'] },
		],
		video: {
			href: 'https://www.youtube.com/embed/fd5FD-ra53M?si=Zq14LahnomjXm-Tt',
			preview: '/assets/albums/img-1.avif',
		},
		description:
			"To create a visually stunning collection of product photographs that highlight the craftsmanship and detail of Artisan Crafts & Co.'s handmade products. The images were intended for use in their online store, social media, print catalogs, and marketing campaigns.",

		albums: ['/assets/albums/img-1.avif', '/assets/albums/img-2.avif', '/assets/albums/img-3.avif'],
	},
	{
		href: 'wild-wonders',
		id: 'wild-wonders',
		src: '/assets/albums/img-5.avif',
		alt: 'photo',
		title: 'Дикие чудеса',
		characteristics: [
			{ icon: 'focus', code: 'category', value: ['Животные и природа'] },
			{ icon: 'triangle', code: 'projectType', value: ['Проект по вдохновению'] },
			{ icon: 'camera', code: 'camera', value: ['Fujifilm X-T4'] },
			{
				icon: 'aperture',
				code: 'lenses',
				value: ['Fujinon XF 23mm f/1.4 R', 'Fujinon XF 35mm f/2 R WR'],
			},
			{ icon: 'monitor-smartphone', code: 'otherDevices', value: ['Mavic Air'] },
			{ icon: 'map-pin', code: 'location', value: ['Europe', 'Africa'] },
			{ icon: 'calendar', code: 'time', value: ['2020-2024'] },
		],
		video: {
			href: 'https://www.youtube.com/embed/fd5FD-ra53M?si=Zq14LahnomjXm-Tt',
			preview: '/assets/albums/img-1.avif',
		},
		description:
			"To capture the diverse flora and fauna of Europe and Africa's natural landscapes, with a focus on honing skills in wildlife photography, understanding animal behavior, and improving technical proficiency in various lighting conditions.",

		albums: ['/assets/albums/img-1.avif', '/assets/albums/img-2.avif', '/assets/albums/img-3.avif'],
	},
];
