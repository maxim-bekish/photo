import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';

const buttonVariants = cva(
	' inline-flex mix-blend-exclusion w-fit items-center h-[50px] group  duration-300 border-white cursor-pointer',
	{
		variants: {
			variant: {
				ghost: '[&>p]:group-hover:text-deep-orange gap-2 [&>div]:hidden [&>div]:md:block',
				outline:
					'border-solid [&>p]:px-5 [&>p]:border [&_.wrap-icon]:border [&_.wrap-icon]:border-l-0 [&>div]:group-hover:bg-white [&_.icon]:group-hover:text-black [&>div]:aspect-square',
			},
		},
		defaultVariants: {
			variant: 'ghost',
		},
	},
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
	className?: string;
	href?: string;
	label?: string;
	/** Открыть ссылку в новой вкладке */
	external?: boolean;

	children?: React.ReactNode;
}

function Button({ className = '', variant, children, href, label, external }: ButtonProps) {
	const classes = clsx(buttonVariants({ variant }), className);
	const content = (
		<>
			<p className='h-full duration-300 flex items-center uppercase border-inherit  text-btn'>
				{children ? children : label}
			</p>

			<div className='border-inherit wrap-icon h-full flex items-center justify-center duration-300'>
				<ArrowRight
					strokeWidth={1}
					className='h-full icon transition-transform duration-300  group-hover:-rotate-45'
				/>
			</div>
		</>
	);

	// Внешняя ссылка — обычный <a> в новой вкладке
	if (href && external) {
		return (
			<a href={href} target='_blank' rel='noopener noreferrer' className={classes}>
				{content}
			</a>
		);
	}

	// Внутренняя — Link: переход без перезагрузки страницы и с предзагрузкой
	if (href) {
		return (
			<Link href={href} className={classes}>
				{content}
			</Link>
		);
	}

	return <button className={classes}>{content}</button>;
}

export { Button, buttonVariants };
