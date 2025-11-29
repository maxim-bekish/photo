import { CardReviews } from '@/src/shared/components/ui/CardReviews';

import LayoutPage from '../layoutPage';

const clientsList = [
	{
		id: '1',
		src: '/assets/expertise/img-1.avif',
		message:
			'He provided exceptional product photography services for our latest collection. Their attention to detail and creative approach resulted in images that perfectly showcased our products.  Highly recommended!',
		name: 'Michael T.',
		role: 'MD, Stellar Designs',
		rating: 0,
	},
	{
		id: '2',
		src: '/assets/expertise/img-2.avif',
		message:
			'Documentary photography serves to inform, educate, and inspire by providing a truthful and insightful representation of the world.',
		name: 'Aurora Jensen',
		role: 'Marketing Manager, Stellar Designs',
		rating: 2,
	},
	{
		id: '3',
		src: '/assets/expertise/img-3.avif',
		message:
			'Documentary photography serves to inform, educate, and inspire by providing a truthful and insightful representation of the world.',
		name: 'G. Monroe',
		role: 'Marketing Director',
		rating: 3,
	},
	{
		id: '4',
		src: '/assets/expertise/img-4.avif',
		message:
			'Documentary photography serves to inform, educate, and inspire by providing a truthful and insightful representation of the world.',
		name: 'Michael',
		role: 'Marketing Manager, Stellar Designs',
		rating: 4,
	},
	{
		id: '5',
		src: '/assets/expertise/img-4.avif',
		message:
			'Documentary photography serves to inform, educate, and inspire by providing a truthful and insightful representation of the world.',
		name: 'Michael',
		role: 'Marketing Manager, Stellar Designs',
		rating: 5,
	},
	{
		id: '6',
		src: '/assets/expertise/img-4.avif',
		message:
			'Documentary photography serves to inform, educate, and inspire by providing a truthful and insightful representation of the world.',
		name: 'Michael',
		role: 'Marketing Manager, Stellar Designs',
		rating: 6,
	},

	{
		id: '7',
		src: '/assets/expertise/img-4.avif',
		message:
			'!!!!!!!!! Documentary photography serves to inform, educate, and inspire by providing a truthful and insightful representation of the world.',
		name: 'Michael',
		role: 'Marketing Manager, Stellar Designs',
		rating: 7,
	},
	{
		id: '8',
		src: '/assets/expertise/img-4.avif',
		message:
			'!!!!!!!!! Documentary photography serves to inform, educate, and inspire by providing a truthful and insightful representation of the world.',
		name: 'Michael',
		role: 'Marketing Manager, Stellar Designs',
		rating: 8,
	},
];
const col = 3;

const baseItemsPerCol = Math.floor(clientsList.length / col);
const remainder = clientsList.length % col;

const groupedClients: (typeof clientsList)[] = Array.from({ length: col }, () => []);

const baseItemsCount = baseItemsPerCol * col;

clientsList.forEach((item, index) => {
	let targetCol: number;

	if (index < baseItemsCount) {
		// Базовые элементы распределяем равномерно
		targetCol = index % col;
	} else {
		// Остаточные элементы
		if (remainder === 1) {
			// Остаток 1: последний элемент в центральный массив (индекс 1)
			targetCol = 1;
		} else if (remainder === 2) {
			// Остаток 2: последние 2 элемента в крайние массивы (индексы 0 и 2)
			const remainderIndex = index - baseItemsCount;
			targetCol = remainderIndex === 0 ? 0 : 2;
		} else {
			targetCol = index % col;
		}
	}

	groupedClients[targetCol].push(item);
});

export default function () {
	return (
		<LayoutPage title={'Reviews'}>
			<div className='wrapper flex flex-col xl:flex-row gap-2.5 relative items-center xl:items-start '>
				{groupedClients.map((group, index) => (
					<div
						key={index}
						className='flex flex-col w-full md:max-w-[600px] gap-2.5 h-full flex-1 xl:sticky xl:top-0'>
						{group.map((el, index) => (
							<CardReviews className='bg-white/5 w-full' key={index + el.id} el={el} />
						))}
					</div>
				))}
			</div>
		</LayoutPage>
	);
}
