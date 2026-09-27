'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const MainBlog = ({ content }: { content?: string | null }) => {
	if (!content?.trim()) return null;

	return (
		<article className='article-content max-w-[800px] w-full mx-auto'>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={{
					a: ({ href, children }) => {
						const isExternal = href?.startsWith('http');
						return (
							<a
								href={href}
								{...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}>
								{children}
							</a>
						);
					},
				}}>
				{content}
			</ReactMarkdown>
		</article>
	);
};
