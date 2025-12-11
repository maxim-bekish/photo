'use client';
import { useEffect, useState } from 'react';
import { BrandItem } from '../../types';


export const Brands = () => {
	const [brands, setBrands] = useState<BrandItem[]>([]);
	const [loading, setLoading] = useState(true);



	useEffect(() => {
		fetch('/api/brands')
			.then(res => res.json())
			.then(data => {
				setBrands(data);
				setLoading(false);
			})
			.catch(error => {
				console.error('Ошибка загрузки брендов:', error);
			});
	}, []);
	if (loading) {
		return <div className='text-creamy-white'>Загрузка...</div>;
	}
	return (
		<div className='flex gap-15 py-7.5 md:py-[150px] px-(--px) flex-col items-center wrapper mx-auto'>
			<div>
				<h2 className='h2-s'>Бренды, с которыми я работал</h2>
			</div>
			<div className='w-full grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] md:grid-cols-[repeat(3,minmax(200px,1fr))] xl:grid-cols-[repeat(5,minmax(200px,1fr))] auto-rows-min grid-rows-[repeat(2,min-content)] gap-2.5'>
				{brands.map(el => (
					<div
						key={el.id}
						className='flex  p-10 bg-white/10 justify-center items-center h-[132px]  '>
						<div className=' flex w-[130px]  h-full   '>
							<img
								className=' w-full h-full object-contain object-center'
								src={el.href}
								alt={el.alt}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
