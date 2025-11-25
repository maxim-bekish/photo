export const Brands = () => {
	const brands = [
		{ id: '124', href: '/assets/brands/img-1.svg', alt: 'logo' },
		{ id: '12r', href: '/assets/brands/img-2.svg', alt: 'logo' },
		{ id: 'wec', href: '/assets/brands/img-3.svg', alt: 'logo' },
		{ id: 'werv', href: '/assets/brands/img-4.svg', alt: 'logo' },
		{ id: 'awg', href: '/assets/brands/img-5.svg', alt: 'logo' },
		{ id: 'tbk', href: '/assets/brands/img-6.svg', alt: 'logo' },
		{ id: 'a4vwt', href: '/assets/brands/img-7.svg', alt: 'logo' },
		{ id: 'mu', href: '/assets/brands/img-8.svg', alt: 'logo' },
		{ id: 'ef', href: '/assets/brands/img-9.svg', alt: 'logo' },
		{ id: 'uk', href: '/assets/brands/img-10.svg', alt: 'logo' },
	];

	return (
		<div className='flex gap-15 py-7.5 md:py-[150px] px-3 md:px-10 flex-col items-center wrapper mx-auto'>
			<div>
				<h2 className='h2-s'>Brands I have worked with</h2>
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
