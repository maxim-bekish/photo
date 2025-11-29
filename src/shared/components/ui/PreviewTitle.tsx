export const PreviewTitle = ({ title }: { title: string }) => {
	return (
		<div className='px-(--px) py-10 h-[40vh] xl:h-[50vh] flex items-center justify-center'>
			<h1 className='h1'>{title}</h1>
		</div>
	);
};
