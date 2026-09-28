import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/** '2024-03-06' → '6 марта 2024'; нераспознанную строку возвращает как есть */
export function formatDate(value: string) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return value;
	return date
		.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
		.replace(' г.', '');
}

/** Markdown → короткий текст для meta description */
export function excerpt(markdown: string, maxLength = 160) {
	const text = markdown
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '') // картинки
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // ссылки → текст ссылки
		.replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, '') // заголовки, цитаты, маркеры списков
		.replace(/[*_`~]/g, '') // жирный, курсив, код
		.replace(/\s+/g, ' ')
		.trim();
	return text.length > maxLength ? text.slice(0, maxLength - 1).trimEnd() + '…' : text;
}
