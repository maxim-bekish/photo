'use client';

import { useSendContactRequest } from '@/src/hooks/mutations/useSendContactRequest';
import { cn } from '@/src/shared/lib/utils';
import { isAxiosError } from 'axios';
import { FormEvent, useState } from 'react';

const inputClass =
	'outline-none h-[50px] focus-within:border-deep-orange text-[14px] font-inter w-full border border-solid border-white/10 bg-white/5 p-3';

export const ContactForm = () => {
	const { mutate, isPending, isSuccess, error, reset } = useSendContactRequest();
	const [validationError, setValidationError] = useState<string | null>(null);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const data = new FormData(form);
		const payload = {
			name: String(data.get('name') ?? ''),
			email: String(data.get('email') ?? ''),
			phone: String(data.get('phone') ?? ''),
			message: String(data.get('message') ?? ''),
		};

		if (!payload.email.trim() && !payload.phone.trim()) {
			setValidationError('Укажите email или телефон, чтобы я мог с вами связаться');
			return;
		}
		setValidationError(null);

		mutate(payload, { onSuccess: () => form.reset() });
	};

	if (isSuccess) {
		return (
			<div className='flex flex-col items-center gap-4 py-6 text-center'>
				<p className='body3'>Спасибо! Заявка отправлена.</p>
				<p className='p-s opacity-60'>Я свяжусь с вами в ближайшее время.</p>
				<button
					type='button'
					onClick={reset}
					className='body1 uppercase link cursor-pointer'>
					Отправить ещё одну
				</button>
			</div>
		);
	}

	const serverError = error
		? (isAxiosError(error) && error.response?.data?.error) || 'Не удалось отправить заявку, попробуйте ещё раз'
		: null;
	const errorText = validationError ?? serverError;

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
			<input name='name' type='text' placeholder='Имя' required className={inputClass} />
			<div className='flex flex-col md:flex-row gap-4'>
				<input name='email' type='email' placeholder='Email' className={inputClass} />
				<input name='phone' type='tel' placeholder='Телефон' className={inputClass} />
			</div>
			<textarea
				name='message'
				placeholder='Ваше сообщение'
				required
				className={cn(inputClass, 'h-[120px] resize-y overflow-y-auto whitespace-break-spaces')}
			/>

			{errorText && <p className='p-s text-deep-orange text-center'>{errorText}</p>}

			<button
				type='submit'
				disabled={isPending}
				className='cursor-pointer h-[50px] w-full text-[14px] font-inter font-medium transition-all duration-400 bg-deep-orange hover:bg-white/10 active:bg-white/20 disabled:opacity-60 disabled:cursor-wait'>
				{isPending ? 'Отправка…' : 'Отправить'}
			</button>
		</form>
	);
};
