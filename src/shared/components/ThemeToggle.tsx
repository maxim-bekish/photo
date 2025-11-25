'use client';

import { Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/buttons';

export function ThemeToggle() {
	const [isDark, setIsDark] = useState(false);

	// При загрузке — применяем сохранённую тему
	useEffect(() => {
		const savedTheme = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
			document.documentElement.classList.add('dark');
			setIsDark(true);
		} else {
			document.documentElement.classList.remove('dark');
			setIsDark(false);
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = !isDark;
		setIsDark(newTheme);
		if (newTheme) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	};

	return (
		<Button
			variant={'ghost'}
			onClick={toggleTheme}
			size={'icon'}
			className='relative opacity-0'
			aria-label='Toggle theme'>
			{isDark ? (
				<span></span>
			) : (
				// <Sun className='w-5 h-5 text-yellow-400 transition-transform duration-300 rotate-0' />
				<Moon className='w-5 h-5 text-blue-500 transition-transform duration-300 rotate-0' />
			)}
		</Button>
	);
}
