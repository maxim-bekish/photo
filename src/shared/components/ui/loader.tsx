import { texts } from '@/src/shared/config/texts';

export const Loader = () => {
	return (
		<div className='flex items-center justify-center py-20'>
			<div className='text-creamy-white'>{texts.common.loading}</div>
		</div>
	);
};
