import { Fragment, ReactNode } from 'react';

/**
 * Превращает «обычный **выделенный** текст» в текст со <span> вокруг выделенных фрагментов.
 * Так в БД хранится простой текст, а акценты задаются самим фотографом.
 */
export function highlight(text: string, className?: string): ReactNode {
	return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
		i % 2 === 1 ? (
			<span key={i} className={className}>
				{part}
			</span>
		) : (
			<Fragment key={i}>{part}</Fragment>
		),
	);
}
