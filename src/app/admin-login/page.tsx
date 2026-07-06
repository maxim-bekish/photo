'use client';

import { Input } from '@/src/shared/components/ui/input';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState('max@max.ru');
	const [password, setPassword] = useState('max123');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			const response = await fetch('/api/admin/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || 'Ошибка установки сессии');
				setLoading(false);
				return;
			}

			router.push('/admin');
			router.refresh();
		} catch {
			setError('Ошибка соединения с сервером');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-900 px-4'>
			<div className='bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg w-full max-w-md border border-white/20'>
				<h2 className='text-2xl font-bold mb-6 text-creamy-white text-center'>Вход в админку</h2>
				{error && <p className='text-red-400 mb-4 text-center'>{error}</p>}
				<form onSubmit={handleLogin} className='space-y-4'>
					<div>
						<label className='block mb-2 text-creamy-white'>Email</label>
						<Input
							type='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
							className='bg-white/10 border-white/20 text-creamy-white'
							placeholder='admin@example.com'
						/>
					</div>
					<div>
						<label className='block mb-2 text-creamy-white'>Пароль</label>
						<Input
							type='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
							className='bg-white/10 border-white/20 text-creamy-white'
							placeholder='Введите пароль'
						/>
					</div>
					<button
						type='submit'
						disabled={loading}
						className='w-full bg-deep-orange text-white py-2 px-4 rounded hover:bg-deep-orange/80 transition-colors disabled:opacity-50'>
						{loading ? 'Вход...' : 'Войти'}
					</button>
				</form>
			</div>
		</div>
	);
}
